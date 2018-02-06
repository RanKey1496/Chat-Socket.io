const Conversation = require('../Models/Conversation'),
    Message = require('../Models/Message'),
    User = require('../Models/User');

exports.getConversations = (req, res, next) => {
    Conversation.find({ participants: 1 })
                .select('_id')
                .exec((err, conversations) => {
                    if(err) {
                        res.send({ error: err });
                        return next(err);
                    }

                    const fullConversations = [];
                    conversations.forEach((conversation) => {
                        Message.find({ conversationId: conversation._id })
                                .sort('-createdAt')
                                .limit(1)
                                .populate({
                                    path: 'author',
                                    select: 'firstName'
                                })
                                .exec((err, message) => {
                                    if(err) {
                                        res.send({ error: err });
                                        return next(err);
                                    }
                                    fullConversations.push(message);
                                    if(fullConversations.length === conversation.length) {
                                        return res.status(200).json({ conversations: fullConversations });
                                    }
                                });
                    });
                });
}