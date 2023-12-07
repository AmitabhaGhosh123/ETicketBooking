const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ticketSchema = new Schema({
    Name: String,
    bookedEventName: String,
    noOfTickets: Number,
    mobileNumber: Number
});
module.exports = mongoose.model('orders',ticketSchema, 'orders');