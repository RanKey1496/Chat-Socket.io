const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    participants: [{ type: String, require: true }]
});

module.exports = mongoose.model('Conversation', ConversationSchema);