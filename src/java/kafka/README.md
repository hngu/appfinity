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
- `kafka-console-producer --bootstrap-server localhost:9092 --topic first_topic`
- this will allow you enter a message per line
- hit Ctrl-C to quit
- to have producer acknowledge: `kafka-console-producer --bootstrap-server localhost:9092 --topic first_topic --producer-property acks=all`
- if you produce a message to a new topic, it will create that topic automatically with defaults. This is ok. However, always try to create your topic before producing a message.
- default settings are in server.properties file

The base command to consume from a topic: `kafka-console-consumer`
- `kafka-console-consumer --bootstrap-server localhost:9092 --topic first_topic`
- The command above only reads new messages
- This command reads from the beginning: `kafka-console-consumer --bootstrap-server localhost:9092 --topic first_topic --from-beginning`
- the command above will output messages from order you don't expect

Consumer group
- You can have a set of consumers read data from a producer as one. This will allow you to load balance messages across a group of consumers.
- `kafka-console-consumer --bootstrap-server localhost:9092 --topic first_topic --group my-first-group`
- Now you can have 1 or more consumers work together to share message load by a group name.
- You can also have a group of consumers read messages from the beginning:
- `kafka-console-consumer --bootstrap-server localhost:9092 --topic first_topic --group my-first-group --from-beginning`
- This will allow you to read the messages from the beginning, and if the consumers fail and restart, they can read the messages from where they left off.

Kafka Consumer Group
- `kafka-consumer-groups --bootstrap-server localhost:9092 --list`
- `kafka-consumer-groups --bootstrap-server localhost:9092 --describe --group my-first-group`