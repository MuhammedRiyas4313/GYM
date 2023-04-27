const mongoose = require('mongoose')

const ConversationSchema = mongoose.Schema( {
    conversationId: {
        type: String
    },
    sender: {
        type: String,
    },
    text: {
        type: String,
    },
}, {
timestamps: true,
})

module.exports =  Conversation = mongoose.model('Conversation', ConversationSchema);