// terminal clear
console.clear();

// Desc: import required modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/Config/mongodb");
const authRoutes = require("./src/routes/authRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const questionGroupRoutes = require("./src/routes/questionGroupRoutes");
const questionsRoutes = require("./src/routes/questionsRoutes");
const resultRoutes = require("./src/routes/resultRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");

// Desc: create express app
const app = express();
const PORT = process.env.PORT || 4040;

// Desc: connect to database
connectDB();

// Desc: middleware
app.use(express.json());
app.use(cors());

// Desc: use routes
app.use("/auth", authRoutes);
app.use("/book", bookRoutes);
app.use("/question-group", questionGroupRoutes);
app.use("/questions", questionsRoutes);
app.use("/result", resultRoutes);
app.use("/payment", paymentRoutes);

// Desc: create a simple routes
app.get("/", (req, res) => {
  res.status(200).send(
    `<div style="display: flex; margin: auto; justify-content: center; flex-direction: column; align-items: center; height: 100vh;"> 
      <h1 style="color:green;"> Assalamualaikum </h1> 
      <p> Server Running Success </p> 
    </div>`
  );
});

// Desc: error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Desc: start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
