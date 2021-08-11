### Airflow
- Uses version 1.10.10 (TODO upgrade to version 2)

### Setup
- Make sure in Docker you setup file sharing by adding `/Users` to the list
- Run the command `./start.sh` to run docker compose
- When it is done, when a couple of minutes as airflow tries to start up. You can check the progress via `docker ps`
- Then go to `localhost:8080` to open airflow webserver.

### Docker CLI
```
$ docker ps # list all running containers (helps you get their ids)
$ docker stop <container id> # kill it (gracefully)
$ docker exec -it container_id /bin/bash # open a bash shell for docker container
```
- Build docker via command: `docker build -t airflow-basic .` This just builds a docker image from the Dockerfile in current directory and names it `airflow-basic`.
- Run the docker container via: `docker run -p 8080:8080 -d airflow-basic` Runs the container named `airflow-basic` with specified ports in the background.
- Verify it is running via `docker ps`. Should should the `airflow-basic` container running.

### Airflow CLI
```
airflow initdb
* Initialise the metadatabase


airflow resetdb
* Reinitialize the metadatabase (Drop everything)


airflow upgradedb
* Upgrade the metadatabase (Latest schemas, values, ...)


airflow webserver
* Start Airflow’s webserver


airflow scheduler
* Start Airflow’s scheduler


airflow worker
* Start a Celery worker (Useful in distributed mode to spread tasks among nodes - machines)


airflow list_dags
* Give the list of known dags (either those in the examples folder or in dags folder)


ls
* Display the files/folders of the current directory


airflow trigger_dag example_python_operator
* Trigger the dag example_python_operator with the current date as execution date


airflow trigger_dag example_python_operator -e 2015-03-02
* Trigger the dag example_python_operator with a date in the past as execution date (This won’t trigger the tasks of that dag unless you set the option catchup=True in the DAG definition)


airflow trigger_dag example_python_operator -e '2019-07-08 19:04:00+00:00'
* Trigger the dag example_python_operator with a date in the future (change the date here with one having +2 minutes later than the current date displayed in the Airflow UI). The dag will be scheduled at that date.


airflow list_dag_runs example_python_operator
* Display the history of example_python_operator’s dag runs


airflow list_tasks example_python_operator
* List the tasks contained into the example_python_operator dag


airflow test example_python_operator print_the_context 2018-05-07
* Allow to test a task (print_the_context) from a given dag (example_python_operator here) on a specific date (2018-05-07, set a date in the past to execute immediately) without taking care of dependencies and past runs. Useful for debugging.
```