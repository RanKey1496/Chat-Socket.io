const Conversation = require('../Models/Conversation.js'),
    Message = require('../Models/Message.js');

exports.getConversations = (req, res, next) => {
    Conversation.find({}).select('_id').exec((err, conversations) => {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        const fullConversations = [];
        conversations.forEach((c) => {
            Message.find({ conversationId: c._id }).sort('-createdAt').limit(1).exec((err, data) => {
                if (err) {
                    res.send({ error: err });
                    return next(err);
                }
                fullConversations.push(data[0]);
                if (fullConversations.length === conversations.length) {
                    return res.status(200).json({ conversations: fullConversations });
                }
            });
        });
        
    })
}

exports.newConversation = (req, res, next) => {
    const conversation = new Conversation({
        participants: ['rankey', 'villa']
    })

    conversation.save((err, newConversation) => {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        const message = new Message({
            conversationId: newConversation._id,
            body: req.body.body,
            author: req.body.author
        });

        message.save((err, newMessage) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            return res.status(200).json({ message: 'Conversation started!', conversationId: newConversation._id });
        });
    });
}