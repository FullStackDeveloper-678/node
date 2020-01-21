var mongoose = require('mongoose');

var TicketSchema = new mongoose.Schema({
  customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, { collection: 'ticket' });

module.exports = mongoose.model('Ticket', TicketSchema);
