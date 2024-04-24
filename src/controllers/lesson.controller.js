const { Topic, Content, Lesson } = require('../models');


const createLesson = async (req, res) => {
    console.log("CREATE LESSON");
    try {
        const { lesson_name, lesson_image } = req.body;
        console.log({ lesson_name, lesson_image });

        if (!lesson_name || !lesson_name.trim() || !lesson_image || !lesson_image.trim()) {
            return res.status(404).json({ success: false, message: 'Invalid Request' });
        }
        const [entry, created] = await Lesson.findOrCreate({
            where: { lesson_name: lesson_name.toLowerCase() },
            defaults: { lesson_image: lesson_image },
        });
        if (created) {
            res.status(201).json({ success: true, message: 'Lesson created successfully', topic: entry });
        } else {
            res
                .status(500)
                .json({ success: false, message: "The Lesson already exists" });
        }


    } catch (error) {
        console.log({ error });
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
}

const allLessons = async (req, res) => {
    try {
        const lessons = await Lesson.findAll();
        res.status(201).json({ success: true, message: 'Lessons fetched successfully', lessons });

    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
}


module.exports = { createLesson, allLessons };
