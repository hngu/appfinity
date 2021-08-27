# Notes

### Setup
- download the apache kafka binary in the website and extract it somewhere
- install kafka `brew install kafka`
- make sure you have Java 8 setup
- run `kakfa-topics` to test installation
- Go in to the extracted folder
- Start up zookeeper: `zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties` and keep that terminal window open
- Start up kafka: `kafka-server-start /usr/local/etc/kafka/server.properties`. Note: want a few seconds before starting up kakfa. Sometimes, if you run this too soon, it might not connect to zookeeper.

### Topics
To create a topic, run `kafka-topics --bootstrap-server localhost:9092 --topic first_topic --create --partitions 3 --replication-factor 1`

- Change the params based on your needs. You cannot have more replication factors than brokers (locally, there is 1 broker by default).

To view topics: `kafka-topics --bootstrap-server localhost:9092 --list`

To describe a topic: `kafka-topics --bootstrap-server localhost:9092 --topic first_topic --describe`

To delete a topic: `kafka-topics --bootstrap-server localhost:9092 --topic second_topic --delete`
