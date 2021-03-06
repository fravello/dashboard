var config = {};

config.debug = process.env.DEBUG || false;

config.mqtt  = {};
config.mqtt.topics = process.env.MQTT_TOPICS || 'test';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || '127.0.0.1';
config.mqtt.port      = process.env.MQTT_PORT      || 1883;

config.mongodb = {};
config.mongodb.hostname   = process.env.MONGODB_HOSTNAME   || '127.0.0.1';
config.mongodb.port       = process.env.MONGODB_PORT       || 27017;
config.mongodb.database   = process.env.MONGODB_DATABASE   || 'iotdb';
config.mongodb.collection   = process.env.MONGODB_COLLECTION   || 'mqtt_dash';

module.exports = config;