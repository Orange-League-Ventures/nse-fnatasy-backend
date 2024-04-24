const { Topic, Content } = require('../models');


const createTopic = async (req, res) => {
    try {
        const { topic_name, icon, content_value, content_image, lesson_id } = req.body;
        if (!topic_name || !topic_name.trim()
            || !content_value || !content_value.trim()
            || !lesson_id || !lesson_id.trim()) {
            return res.status(404).json({ success: false, message: 'Invalid Request' });
        }
        const newTopic = await Topic.create({
            topic_name,
            lesson_id,
            content_image,
            content_value,
            icon
        });
        console.log({ newTopic });
        res.status(201).json({ success: true, message: 'Topic created successfully', topic: newTopic });

    } catch (error) {
        console.log({ error });
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
}

const topicsByLessonId = async (req, res) => {
    try {
        const { lesson_id } = req.query;
        const topics = await Topic.findAll({
            where: {
                lesson_id: lesson_id,
            },
            attributes: ['id', 'topic_name', 'icon'],
        });

        res.status(201).json({ success: true, message: 'Topic fetched successfully', topics });

    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
}

const contentByTopicId = async (req, res) => {
    try {
        const { topic_id } = req.query;
        const content = await Topic.findAll({
            where: {
                id: topic_id,
            },
            attributes: ['id', 'content_value', 'content_image'],
        });

        res.status(201).json({ success: true, message: 'Content fetched successfully', content });

    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
}

module.exports = { createTopic, topicsByLessonId, contentByTopicId };
