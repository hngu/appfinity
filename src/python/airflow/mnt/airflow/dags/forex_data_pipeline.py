from airflow import DAG
from datetime import datetime, timedelta
from airflow.sensors.http_sensor import HttpSensor
from airflow.contrib.sensors.file_sensor import FileSensor
from airflow.operators.python_operator import PythonOperator
from airflow.operators.bash_operator import BashOperator
from airflow.operators.hive_operator import HiveOperator

import csv
import requests
import json

# Download forex rates according to the currencies we want to watch
# described in the file forex_currencies.csv
def download_rates():
    with open('/usr/local/airflow/dags/files/forex_currencies.csv') as forex_currencies:
        reader = csv.DictReader(forex_currencies, delimiter=';')
        for row in reader:
            base = row['base']
            with_pairs = row['with_pairs'].split(' ')
            indata = requests.get('https://api.exchangerate.host/latest?base=' + base).json()
            outdata = {'base': base, 'rates': {}, 'last_update': indata['date']}
            for pair in with_pairs:
                outdata['rates'][pair] = indata['rates'][pair]
            with open('/usr/local/airflow/dags/files/forex_rates.json', 'a') as outfile:
                json.dump(outdata, outfile)
                outfile.write('\n')

default_args = {
  "owner": "airflow",
  "start_date": datetime(2019, 12, 4),
  "depends_on_past": False,
  "email_on_failure": False,
  "email_on_retry": False,
  "email": "email@host.com.invalid",
  "retries": 1,
  "retry_delay": timedelta(minutes=5)
}

with DAG(
  dag_id="forex_data_pipeline",
  schedule_interval="@daily",
  default_args=default_args,
  catchup=False
) as dag:

  """
    Create a http sensor to check if the forex api is up.
    In order to get this to work, create a connection in the airflow UI
    Under Admin -> Connections and name the connection "forex_api".
    - Use the URL "https://api.exchangerate.host/" as the host
  """
  is_forex_rates_available = HttpSensor(
    task_id="is_forex_rates_available",
    method="GET",
    http_conn_id="forex_api",
    endpoint="latest",
    response_check=lambda response: response.status_code == 200,
    poke_interval=5,
    timeout=20,
  )

  """
    Then create a file sensor to make sure a file exists.
    In order to get this to work, setup a connection with the following params:
    - Conn Id: forex_path
    - Conn Type: File (path)
    - Extras: {"path": "/usr/local/airflow/dags/files"}
  """
  is_forex_file_available = FileSensor(
    task_id="is_forex_file_available",
    fs_conn_id="forex_path",
    filepath="forex_currencies.csv",
    poke_interval=5,
    timeout=20,
  )

  """
    Run Python code to fetch the exchange rates and save it to a JSON file
  """
  get_exchange_rates = PythonOperator(
    task_id="get_exchange_rates",
    python_callable=download_rates,
  )

  """
    Save the data to HDFS
    View the data in hue (http://localhost:32762/)
  """
  saving_rates = BashOperator(
    task_id="saving_rates",
    bash_command="""
      hdfs dfs -mkdir -p /forex && \
        hdfs dfs -put -f $AIRFLOW_HOME/dags/files/forex_rates.json /forex
    """
  )

  """
    Create the hive table
    Need to setup a connection with the following fields:
    - Conn ID: hive_conn
    - Conn Type: Hive Server 2 Thrift
    - Host: hive-server (from docker ps)
    - Port: 10000
    - hive/hive
  """
  creating_forex_rates_table = HiveOperator(
    task_id="creating_forex_rates_table",
    hive_cli_conn_id="hive_conn",
    hql="""
        CREATE EXTERNAL TABLE IF NOT EXISTS forex_rates(
            base STRING,
            last_update DATE,
            eur DOUBLE,
            usd DOUBLE,
            nzd DOUBLE,
            gbp DOUBLE,
            jpy DOUBLE,
            cad DOUBLE
            )
        ROW FORMAT DELIMITED
        FIELDS TERMINATED BY ','
        STORED AS TEXTFILE
    """
  )