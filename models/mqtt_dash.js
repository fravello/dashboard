const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mqtt_dash_model = Schema({
	topic: String,
	payload : String,
	date : { type: Date, default: Date.now }
});

module.exports = mongoose.model('mqtt_dash', mqtt_dash_model, 'mqtt_dash');