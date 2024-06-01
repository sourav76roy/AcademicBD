// exam controller
const User = require("../model/User");
const bookModel = require("../model/bookModel");
const questionGroupModel = require("../model/questionGroupModel");

// all questions model
const writingQModel = require("../model/writingQModel");
const listeningQModel = require("../model/listeningQModel");
const speakingQModel = require("../model/speakingQModel");

// result model
const resultReadingModel = require("../model/resultReadingModel");
const resultWritingModel = require("../model/resultWritingModel");
const resultListeningModel = require("../model/resultListeningModel");
const resultSpeakingModel = require("../model/resultSpeakingModel");

// add result
const addResult = async (req, res) => {
  const { userId, bookId, groupId, examType } = req.body;

  // Empty field validation
  if (!userId || !bookId || !groupId || !examType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const initialData = {
    userId,
    bookId,
    groupId,
    examType,
  };

  try {
    if (examType === "reading") {
      const {
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        result,
        totalMarks,
      } = req.body;

      if (
        totalQuestions === null ||
        totalMarks === null ||
        correctAnswers === null ||
        wrongAnswers === null ||
        result?.length === 0
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const storeData = {
        ...initialData,
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        result,
        totalMarks,
        examType: "reading",
      };
      const resultStore = new resultReadingModel(storeData);
      await resultStore.save();

      // return save successful
      return res.status(201).json({ message: "Result added successfully" });
    } else if (examType === "writing") {
      const { examId, answers } = req.body;

      if (!examId || answers?.length === 0) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const storeData = {
        ...initialData,
        examId,
        answers,
        status: {
          type: "pending",
          message: "Not Marked Yet",
          marks: 0,
        },
      };
      const resultStore = new resultWritingModel(storeData);
      await resultStore.save();

      // return save successful
      return res.status(201).json({ message: "Result added successfully" });
    } else if (examType === "listening") {
      const { examId, answers } = req.body;

      if (!examId || answers?.length === 0) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const storeData = {
        ...initialData,
        examId,
        answers,
        status: {
          type: "pending",
          message: "Not Marked Yet",
          marks: 0,
        },
      };

      const resultStore = new resultListeningModel(storeData);
      await resultStore.save();

      // return save successful
      return res.status(201).json({ message: "Result added successfully" });
    } else if (examType === "speaking") {
      const { examId, answers } = req.body;

      if (!examId || answers?.length === 0) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const storeData = {
        ...initialData,
        examId,
        answers,
        status: {
          type: "pending",
          message: "Not Marked Yet",
          marks: 0,
        },
      };

      const resultStore = new resultSpeakingModel(storeData);
      await resultStore.save();

      // return save successful
      return res.status(201).json({ message: "Result added successfully" });
    }
  } catch (error) {
    // console.log("resultWritingModel result add ", resultWritingModel);
    res.status(500).json({ error: error.message });
  }
};

// get all results
const getResults = async (req, res) => {
  try {
    const results = await resultReadingModel.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get result by userId
const getResultByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // if userId is not provided
    if (!userId) {
      return res.status(400).json({ error: "User Id is required" });
    }

    // find result by userId
    const resultReading = await resultReadingModel.find({ userId });
    const resultWriting = await resultWritingModel.find({ userId });
    const resultListening = await resultListeningModel.find({ userId });
    const resultSpeaking = await resultSpeakingModel.find({ userId });

    // if result is not found
    if (
      resultReading.length === 0 &&
      resultWriting.length === 0 &&
      resultListening.length === 0 &&
      resultSpeaking.length === 0
    ) {
      return res.status(404).json({ message: "Result not found" });
    }

    // now find bookId book details and groupId group details all books attended by user
    const results = [
      ...resultReading,
      ...resultWriting,
      ...resultListening,
      ...resultSpeaking,
    ];
    const bookDetails = await bookModel.find({
      _id: { $in: results.map((result) => result.bookId) },
    });
    const groupDetails = await questionGroupModel.find({
      _id: { $in: results.map((result) => result.groupId) },
    });

    // add book details and group details to result
    const resultData = results.map((result) => {
      const book = bookDetails.find(
          (book) => book._id.toString() === result.bookId.toString()
        ),
        group = groupDetails.find(
          (group) => group._id.toString() === result.groupId.toString()
        );

      return { ...result._doc, book, group };
    });

    // return user result
    return res
      .status(200)
      .json({ message: "Get Result Successful", results: resultData });

    // Add closing parenthesis here
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all results for marking
const getAllResultsMarking = async (req, res) => {
  try {
    let results = [];

    // writing question find
    const resultsWriting = await resultWritingModel.find({
      "status.type": "pending",
    });
    if (resultsWriting) {
      results = [...results, ...resultsWriting];
    }

    // listening question find
    const resultsListening = await resultListeningModel.find({
      "status.type": "pending",
    });
    if (resultsListening) {
      results = [...results, ...resultsListening];
    }

    // speaking results
    const resultsSpeaking = await resultSpeakingModel.find({
      "status.type": "pending",
    });
    if (resultsSpeaking) {
      results = [...results, ...resultsSpeaking];
    }

    // if result is not found
    if (results?.length === 0) {
      return res.status(404).json({ message: "Result not found" });
    }

    // find bookId for book details and groupId for group details
    const bookDetails = await bookModel.find({
      _id: { $in: results.map((result) => result.bookId) },
    });

    // find group details
    const groupDetails = await questionGroupModel.find({
      _id: { $in: results.map((result) => result.groupId) },
    });

    // add book details and group details to result
    const resultData = await Promise.all(
      results?.map(async (result) => {
        // find user details by userId
        const userDetails = await User.findById(result?.userId).select(
          "-password"
        );

        // book details
        const book = bookDetails.find(
          (book) => book?._id.toString() === result?.bookId.toString()
        );

        const group = groupDetails.find(
          (group) => group?._id.toString() === result?.groupId.toString()
        );

        // find group question by groupId
        const writingQuestions = await writingQModel.find({
          groupId: group?._id,
        });

        // listening Questions
        const listeningQuestions = await listeningQModel.find({
          groupId: group?._id,
        });

        // speaking Questions
        const speakingQuestions = await speakingQModel.find({
          groupId: group?._id,
        });

        return {
          ...result?._doc,
          userDetails,
          book,
          group,
          writingQuestions,
          listeningQuestions,
          speakingQuestions,
        };
      })
    );

    // return user result
    return res
      .status(200)
      .json({ message: "Get Result Successful", results: resultData });
  } catch (error) {
    res.status(500).json({ error: error.message });
    // console.log("getAllResultsMarking error", error);
  }
};

// user result mark update
const updateResultMark = async (req, res) => {
  try {
    const { resultId } = req.params;

    console.log("resultId", resultId);
    console.log("res body", req.body);

    const { marks, message, type } = req?.body;

    // Empty field validation
    if (!resultId || !marks || !message || !type) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // initialState
    const initialState = {
      message,
      marks,
    };

    if (type === "writing") {
      // find result by resultId
      const result = await resultWritingModel.findById(resultId);
      if (!result) {
        return res.status(404).json({ message: "Result not found" });
      }

      // update result
      const updateResult = await resultWritingModel.findByIdAndUpdate(
        resultId,
        {
          status: {
            ...initialState,
            type: "marked",
          },
        }
      );

      // return successful
      return res
        .status(200)
        .json({ message: "Result Marked Successfully", updateResult });
    } else if (type === "listening") {
      // find result by resultId
      const result = await resultListeningModel.findById(resultId);
      if (!result) {
        return res.status(404).json({ message: "Result not found" });
      }

      // update result
      const updateResult = await resultListeningModel.findByIdAndUpdate(
        resultId,
        {
          status: {
            ...initialState,
            type: "marked",
          },
        }
      );

      // return successful
      return res
        .status(200)
        .json({ message: "Result Marked Successfully", updateResult });
    } else if (type === "speaking") {
      // find result by resultId
      const result = await resultSpeakingModel.findById(resultId);
      if (!result) {
        return res.status(404).json({ message: "Result not found" });
      }

      // update result
      const updateResult = await resultSpeakingModel.findByIdAndUpdate(
        resultId,
        {
          status: {
            ...initialState,
            type: "marked",
          },
        }
      );

      // return successful
      return res
        .status(200)
        .json({ message: "Result Marked Successfully", updateResult });
    }

    // return untype error
    return res.status(400).json({ error: "Invalid user type" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("updateResultMark error", error);
  }
};

// export module
module.exports = {
  addResult,
  getResults,
  getResultByUserId,
  getAllResultsMarking,
  updateResultMark,
};
