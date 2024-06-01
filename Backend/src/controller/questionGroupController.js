// question group controller
const mongoose = require("mongoose");
const questionGroupModel = require("../model/questionGroupModel");
const mcqQModel = require("../model/mcqQModel");
const booleanQModel = require("../model/booleanQModel");
const fitgQModel = require("../model/fitgQModel");

// question group create controller
const questionGroupCreate = async (req, res) => {
  try {
    const {
      userId,
      bookId,
      groupTitle,
      status,
      description,
      image,
      examTime,
      totalMarks,
      passingMarks,
      totalQuestions,
    } = req.body;

    // console.log("Question Group Data", req.body);
    //   empty fields validation
    if (
      !userId ||
      !bookId ||
      !groupTitle ||
      !status ||
      !description ||
      !image ||
      !examTime ||
      !totalMarks ||
      !passingMarks ||
      !totalQuestions
    ) {
      return res.status(400).send("All fields are required.");
    }

    const questionGroup = new questionGroupModel({
      userId,
      bookId,
      groupTitle,
      status,
      description,
      image,
      examTime,
      totalMarks,
      passingMarks,
      totalQuestions,
    });

    const result = await questionGroup.save();

    // return response
    res
      .status(201)
      .send({ message: "Question Group created successfully.", result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while creating the question group.");
  }
};

// All the question groups of the book
const questionGroupList = async (req, res) => {
  try {
    const { bookId } = req.params;

    //  empty fields validation
    if (!bookId) {
      return res.status(400).send("Book Id is required.");
    }

    const questionGroup = await questionGroupModel.find({ bookId });
    res.status(200).send(questionGroup);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while fetching the question group.");
  }
};

// question group update controller by object id
const questionGroupUpdate = async (req, res) => {
  try {
    const groupId = req.params.id;
    const {
      userId,
      bookId,
      groupTitle,
      status,
      description,
      image,
      examTime,
      totalMarks,
      passingMarks,
      totalQuestions,
    } = req.body;

    //  empty fields validation
    if (
      !userId ||
      !bookId ||
      !groupTitle ||
      !status ||
      !description ||
      !image ||
      !examTime ||
      !totalMarks ||
      !passingMarks ||
      !totalQuestions ||
      !groupId
    ) {
      return res.status(400).send("All fields are required.");
    }

    // groupId validation
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).send("Invalid Group Id.");
    }

    const questionGroup = await questionGroupModel.findByIdAndUpdate(
      groupId,
      {
        $set: {
          userId,
          bookId,
          groupTitle,
          status,
          description,
          image,
          examTime,
          totalMarks,
          passingMarks,
          totalQuestions,
        },
      },
      { new: true }
    );
    res.status(200).send(questionGroup);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while updating the question group.");
  }
};

// question group delete controller by object id
const questionGroupDelete = async (req, res) => {
  try {
    const groupId = req.params.id;

    //  empty fields validation
    if (!groupId) {
      return res.status(400).send("Group Id is required.");
    }

    // groupId validation
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).send("Invalid Group Id.");
    }

    // find group question by id and delete all questions in this groupId
    const findQuestionGroup = await questionGroupModel.findById(groupId);
    if (!findQuestionGroup) {
      return res.status(404).send("Question Group not found.");
    }
    // now delete all questions all model by groupId
    await mcqQModel.deleteMany({ groupId });
    await booleanQModel.deleteMany({ groupId });
    await fitgQModel.deleteMany({ groupId });

    // delete question group
    const questionGroup = await questionGroupModel.findByIdAndDelete(groupId);
    res.status(200).send(questionGroup);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while deleting the question group.");
  }
};

// exports all the functions
module.exports = {
  questionGroupCreate,
  questionGroupList,
  questionGroupUpdate,
  questionGroupDelete,
};
