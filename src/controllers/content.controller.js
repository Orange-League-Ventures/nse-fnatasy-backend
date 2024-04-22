const {  Content } = require('../models');


const createContent = async (req, res) => {
    try {
        const { content_value, topic_id, content_image = "" } = req.body;
        if (!content_value || !topic_id.trim() || !topic_id || !content_value.trim()) {
            return res.status(404).json({ success: false, message: 'Invalid Request' });
        }

        console.log({ content_value, topic_id, content_image });

        const newTopic = await Content.create({
            content_value,
            topic_id,
            content_image
        });

        console.log({ newTopic });

        res.status(201).json({ success: true, message: 'Content created successfully', content: newTopic });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
}

const ContentByTopicID = async (req, res) => {
    try {
        const { page, topicId, limit } = req.query;
        console.log({ page, topicId });
        const offset = (page - 1) * limit;
        const content = await Content.findAndCountAll({
            where: {
                topic_id: topicId,
            },
            offset: offset,
            limit: limit,
        });

        res.status(201).json({ success: true, message: 'Content fetched successfully', content });

    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
}

module.exports = { createContent, ContentByTopicID };
