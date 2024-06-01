const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const secret = process.env.Secret_Code;

// Register
const register = async (req, res) => {
  try {
    // console.log(" register data ", req.body);

    const {
      email,
      password,
      name,
      phone,
      gender,
      location,
      intro,
      agreement,
      image,
      payment,
    } = req.body;

    if (
      !email ||
      !password ||
      !name ||
      !phone ||
      !gender ||
      !location ||
      !intro ||
      !image ||
      !payment
    ) {
      return res.status(204).json({ message: "Please all input fulfilled" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // console.log("existingUser ", existingUser);
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      gender,
      location,
      intro,
      agreement,
      role: "user",
      image,
      payment,
    });
    const data = await user.save();

    // console.log("db data ", data);

    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      data: {
        email: data?.email,
        name: data?.name,
        token,
        _id: data?._id,
        phone: data?.phone,
        gender: data?.gender,
        location: data?.location,
        intro: data?.intro,
        role: data?.role,
        image: data?.image,
        payment: data?.payment,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Some Thing wrong",
    });
  }
};

// Login
const login = async (req, res) => {
  // console.log(" login data ", req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(204)
        .json({ message: "Please fulfill User or password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "User Login successfully",
      data: {
        email: user?.email,
        name: user?.name,
        token,
        _id: user?._id,
        phone: user?.phone,
        gender: user?.gender,
        location: user?.location,
        intro: user?.intro,
        role: user?.role,
        image: user?.image,
        payment: user?.payment,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    // now return response
    res.status(200).json({ massage: "All users", data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// user role update function
const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  console.log("userId , role ", userId, role);
  try {
    // check empty field or not
    if (!role || !userId) {
      return res.status(204).json({ message: "Please fulfill all input" });
    }

    // check user exist or not
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    // now update user role
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { role: role },
      { new: true }
    );

    //  return response
    return res
      .status(200)
      .json({ message: "User role updated successfully", data: updateUser });
  } catch (err) {
    console.log("error ", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete user & all data
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  console.log("deleteUser userId", userId);
  try {
    // check userId empty or not
    if (!userId) {
      return res.status(204).json({ message: "Please fulfill all input" });
    }

    // check user exist or not
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    // delete result of user
    const deleteUserData = await User.findByIdAndDelete(userId);

    // return response
    return res.status(200).json({
      message: "User deleted successfully",
      data: deleteUserData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("deleteUser error ", error);
  }
};

// Export the module
module.exports = { register, login, getAllUsers, updateUserRole, deleteUser };
