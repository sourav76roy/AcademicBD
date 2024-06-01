// Question Controller
const mcqQModel = require("../model/mcqQModel");
const booleanQModel = require("../model/booleanQModel");
const fitgQModel = require("../model/fitgQModel");
const writingQModel = require("../model/writingQModel");
const listeningQModel = require("../model/listeningQModel");
const speakingQModel = require("../model/speakingQModel.js");

// add mcq question
const addQuestions = async (req, res) => {
  const {
    question,
    options,
    correctAns,
    type,
    bookId,
    groupId,
    userId,
    bookType,
  } = req.body;

  // empty fields validation
  if (!type || !bookId || !groupId || !userId || !bookType) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  // initial data
  const initialData = {
    userId,
    groupId,
    bookId,
    status: "active",
    type,
  };

  try {
    // checking book type
    if (bookType == "reading") {
      let finishData = {};
      // check type divide mcq and boolean and fitg
      if (type === "mcq") {
        if (!question || !options || !correctAns) {
          // empty fields validation
          return res.status(400).json({ error: "Please fill all the fields" });
        }

        // check options type
        if (typeof options !== "object") {
          return res.status(400).json({ error: "Options must be an object" });
        }

        // make mcq data
        finishData = {
          ...initialData,
          question,
          options,
          correctAns,
        };

        // final store data to database
        const mcq = new mcqQModel(finishData);
        await mcq.save();

        // return 201 status code and success message
        return res
          .status(201)
          .json({ message: "MCQ Question added successfully" });
      } else if (type === "boolean") {
        if (!question || !correctAns) {
          // empty fields validation
          return res.status(400).json({ error: "Please fill all the fields" });
        }

        // make boolean data
        finishData = {
          ...initialData,
          question,
          options,
          correctAns,
        };

        // final store data to database
        const boolean = new booleanQModel(finishData);
        await boolean.save();

        // return 201 status code and success message
        return res
          .status(201)
          .json({ message: "Boolean Question added successfully" });
      } else if (type === "fitg") {
        if (!question || !correctAns) {
          // empty fields validation
          return res.status(400).json({ error: "Please fill all the fields" });
        }

        // make fitg data
        finishData = {
          ...initialData,
          question,
          correctAns,
        };

        // final store data to database
        const fitg = new fitgQModel(finishData);
        await fitg.save();

        // return 201 status code and success message
        return res
          .status(201)
          .json({ message: "FITG Question added successfully" });
      }
    } else if (bookType == "writing") {
      const { description, image, title } = req.body;
      // console.log("req.body ", req.body);

      // empty fields validation
      if (!description || !image || !title) {
        return res.status(400).json({ error: "Please fill all the fields" });
      }

      let finishData = {
        ...initialData,
        description,
        image,
        title,
      };

      // final store data to database
      const writing = new writingQModel(finishData);
      await writing.save();

      // return 201 status code and success message
      return res
        .status(201)
        .json({ message: "Writing Question added successfully" });
    } else if (bookType == "listening") {
      const { description, audio, title } = req.body;

      console.log("listening called");

      // empty fields validation
      if (!description || !audio || !title) {
        return res.status(400).json({ error: "Please fill all the fields" });
      }

      let finishData = {
        ...initialData,
        description,
        audio,
        title,
      };

      // final store data to database
      const listening = new listeningQModel(finishData);
      await listening.save();

      console.log("listening saved", listening);

      // return 201 status code and success message
      return res
        .status(201)
        .json({ message: "Listening Question added successfully" });
    } else if (bookType == "speaking") {
      const { description, title, image } = req.body;

      // empty fields validation
      if (!description || !title || !image) {
        return res.status(400).json({ error: "Please fill all the fields" });
      }

      let finishData = {
        ...initialData,
        description,
        title,
        image,
      };

      // final store data to database
      const speaking = new speakingQModel(finishData);
      await speaking.save();

      // return 201 status code and success message
      return res
        .status(201)
        .json({ message: "Speaking Question added successfully" });
    }

    // return 400 status code and error message
    return res.status(400).json({ error: "Invalid question type" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all questions by bookId and groupId find by type mcq, boolean and fitg
const getBookQuestions = async (req, res) => {
  try {
    const mcq = await mcqQModel.find({ bookId: req.params.bookId });
    const boolean = await booleanQModel.find({ bookId: req.params.bookId });
    const fitg = await fitgQModel.find({ bookId: req.params.bookId });

    res.status(200).json({ mcq, boolean, fitg });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get mcq question by id
const getMcqQById = async (req, res) => {
  try {
    const mcq = await mcqQModel.findById(req.params.id);
    res.status(200).json(mcq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update mcq question
const updateMcqQ = async (req, res) => {
  const { question, options, correctAns, type, bookId, groupId, userId } =
    req.body;

  // empty fields validation
  if (
    !question ||
    !options ||
    !correctAns ||
    !type ||
    !bookId ||
    !groupId ||
    !userId
  ) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const mcq = {
      question,
      options,
      correctAns,
      type,
      bookId,
      groupId,
      userId,
    };

    await mcqQModel.findByIdAndUpdate(req.params.id, mcq);

    res.status(200).json({ message: "MCQ Question updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete mcq question
const deleteMcqQ = async (req, res) => {
  try {
    await mcqQModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "MCQ Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addQuestions,
  getBookQuestions,
  getMcqQById,
  updateMcqQ,
  deleteMcqQ,
};
