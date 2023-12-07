const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    eventName: String,
    eventPrice: Number,
    eventPriceCurrency: String,
    eventVenue: String,
    eventDate: Date,
    eventStatus: String
});
module.exports = mongoose.model('events',eventSchema, 'events');