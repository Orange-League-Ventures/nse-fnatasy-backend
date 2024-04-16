const { Topic, Content } = require('../models');


const createTopic = async (req, res) => {
    try {
        const { topic_name, chart_type, icon } = req.body;
        if (!topic_name || !topic_name.trim() || !chart_type || !chart_type.trim()) {
            return res.status(404).json({ success: false, message: 'Invalid Request' });
        }

        console.log({ topic_name, chart_type });

        const newTopic = await Topic.create({
            topic_name,
            chart_type,
            icon
        });

        console.log({ newTopic });

        res.status(201).json({ success: true, message: 'Topic created successfully', user: newTopic });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
}

const topicByChartType = async (req, res) => {
    try {
        const { page, chartType, limit } = req.query;
        console.log({ page, chartType });
        const offset = (page - 1) * limit;
        const topic = await Topic.findAndCountAll({
            where: {
                chart_type: chartType,
            },
            offset: offset,
            limit: limit,
        });

        res.status(201).json({ success: true, message: 'Topic fetched successfully', topic });

    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
}

module.exports = { createTopic, topicByChartType };
