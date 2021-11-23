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
```
Topic: first_topic	TopicId: BOW7IZ5pSYWfMWxDW6CF2w	PartitionCount: 3	ReplicationFactor: 1	Configs: segment.bytes=1073741824
	Topic: first_topic	Partition: 0	Leader: 0	Replicas: 0	Isr: 0
	Topic: first_topic	Partition: 1	Leader: 0	Replicas: 0	Isr: 0
	Topic: first_topic	Partition: 2	Leader: 0	Replicas: 0	Isr: 0
```
It displays:
- Topic name
- number of partitions
- replication factor
- Each topic's partition number, leader (broker id), replica id, Isr (broker id)

To delete a topic: `kafka-topics --bootstrap-server localhost:9092 --topic second_topic --delete`

The base command to produce to a topic: `kafka-console-producer`

The base command to consume from a topic: `kafka-console-consumer`
