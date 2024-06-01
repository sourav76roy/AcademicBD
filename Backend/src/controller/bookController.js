const mongoose = require("mongoose");

const bookModel = require("../model/bookModel");
const questionGroupModel = require("../model/questionGroupModel");

// all questions model
const mcqQModel = require("../model/mcqQModel");
const booleanQModel = require("../model/booleanQModel");
const fitgQModel = require("../model/fitgQModel");
const writingQModel = require("../model/writingQModel");
const listeningQModel = require("../model/listeningQModel");
const speakingQModel = require("../model/speakingQModel");

// book controller create function
const createBook = async (req, res) => {
  try {
    const { userId, title, testType, description, image, status, payment } =
      req.body;

    //  Empty field validation
    if (
      !userId ||
      !title ||
      !testType ||
      !description ||
      !image ||
      !status ||
      !payment
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //  Create new book
    const book = new bookModel({
      userId,
      title,
      testType,
      description,
      image,
      status,
      payment,
    });
    await book.save();

    // console.log("book ", book);

    //   Return response
    res.status(201).json({ message: "Book created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// book controller get function
const getBooks = async (req, res) => {
  const { role } = req.params;
  console.log("role", role);

  try {
    let books;

    // active books find
    if (role === "admin") {
      console.log("books if");
      books = await bookModel.find();
      console.log("books if");
    } else {
      console.log("books else");
      books = await bookModel.find({ status: "active" });
      console.log("books else", books);
    }

    // find all books & questionsGroups by bookId & questionsGroups into mcq by groupId
    const booksData = await Promise.all(
      books.map(async (book) => {
        let questionGroups = await questionGroupModel.find({
          bookId: book._id,
        });

        // question groups null check
        if (!questionGroups) {
          return { ...book._doc, questionGroups: [] };
        }

        questionGroups = await Promise.all(
          questionGroups.map(async (questionGroup) => {
            //

            // book type reading
            if (book?.testType === "reading") {
              let mcqs = await mcqQModel?.find({ groupId: questionGroup._id });
              let booleanQs = await booleanQModel?.find({
                groupId: questionGroup?._id,
              });
              let fitgQs = await fitgQModel?.find({
                groupId: questionGroup?._id,
              });

              return {
                ...questionGroup?._doc,
                questions: {
                  mcqs,
                  booleanQs,
                  fitgQs,
                },
              };
            }

            // book type writing
            if (book?.testType === "writing") {
              let writingData = await writingQModel?.find({
                groupId: questionGroup?._id,
              });

              return {
                ...questionGroup?._doc,
                questions: writingData ? writingData : [],
              };
            }

            // book type listening
            if (book?.testType === "listening") {
              const listeningData = await listeningQModel?.find({
                groupId: questionGroup?._id,
              });

              return {
                ...questionGroup?._doc,
                questions: listeningData ? listeningData : [],
              };
            }

            // book type speaking
            if (book?.testType === "speaking") {
              const speakingData = await speakingQModel?.find({
                groupId: questionGroup?._id,
              });

              return {
                ...questionGroup?._doc,
                questions: speakingData ? speakingData : [],
              };
            }
          })
        );

        return { ...book._doc, questionGroups };
      })
    );

    // console.log("booksData", booksData);

    //  Return response
    res.status(200).json({ books: booksData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// book update controller function
const updateBook = async (req, res) => {
  try {
    const { userId, title, testType, description, image, status } = req.body;
    const { bookId } = req.params;

    // bookId validation
    if (!bookId) {
      return res.status(400).json({ error: "Book id is required" });
    }

    // bookId mongoose validation
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ error: "Invalid book id" });
    }

    //  Empty field validation
    if (!userId || !title || !testType || !description || !image || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //  Update book
    await bookModel.findByIdAndUpdate(
      bookId,
      {
        userId,
        title,
        testType,
        description,
        image,
        status,
      },
      { new: true }
    );

    //   Return response
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// book controller delete function in to question group, mcq, boolean, fitg
const bookDelete = async (req, res) => {
  try {
    const { bookId } = req.params;

    // console.log("bookId", bookId);

    // bookId validation
    if (!bookId) {
      return res.status(400).json({ error: "Book id is required" });
    }

    // bookId mongoose validation
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ error: "Invalid book id" });
    }

    //  Delete book
    await bookModel.findByIdAndDelete(bookId);

    //  Delete all questionGroups
    await questionGroupModel.deleteMany({ bookId });

    //  Delete all mcqs
    await mcqQModel.deleteMany({ bookId });

    //  Delete all booleanQs
    await booleanQModel.deleteMany({ bookId });

    //  Delete all fitgQs
    await fitgQModel.deleteMany({ bookId });

    //   Return response
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export functions
module.exports = { createBook, getBooks, updateBook, bookDelete };
