// sslcommerz payment gateway
const SSLCommerzePayment = require("sslcommerz-lts");
const User = require("../model/User");
const paymentModel = require("../model/paymentModel");
const store_id = process.env.Store_id;
const store_passwd = process.env.Store_passwd;
const liveLink = process.env.LiveLink;
const is_live = false; //true for live, false for sandbox

const paymentOder = async (req, res) => {
  try {
    // const { amount, currency, tran_id, success_url, fail_url } = req.body;
    const { userId, paymentType } = req.body;

    // find user details find by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found!");
    }
    const { name, email, phone, location } = user;
    let amount =
      paymentType === "start"
        ? 200
        : paymentType === "pro"
        ? 400
        : paymentType === "special" && 500;

    // generate uniq tran_id
    const tranId = `${new Date().getTime().toString()}`;

    const storePaymentData = {
      total_amount: amount,
      currency: "BDT",
      tran_id: tranId,
      success_url: `http://localhost:3000/payment/success/${tranId}`,
      fail_url: `http://localhost:3000/payment/fail/${tranId}`,
      cancel_url: `http://localhost:3000/payment/cancel/${tranId}`,
      ipn_url: `http://localhost:3000/ipn/${tranId}`,
      shipping_method: "Courier",
      product_name: paymentType,
      product_category: paymentType,
      product_profile: "general",
      cus_name: name,
      cus_email: email,
      cus_add1: location,
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: phone,
      cus_fax: "01711111111",
      ship_name: name,
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const sslcommerz = new SSLCommerzePayment(store_id, store_passwd, is_live);

    sslcommerz.init(storePaymentData).then(async (data) => {
      const gatewayPageURL = data?.GatewayPageURL;

      // create end date
      const addMonths = (date, months) => {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
      };
      // validation time make function
      const validateMonth = () => {
        const duration =
          paymentType === "start"
            ? 2
            : paymentType === "pro"
            ? 4
            : paymentType === "special" && 6;

        const startDate = new Date();
        const endDate = addMonths(startDate, duration);

        return {
          startDate,
          endDate,
        };
      };
      const finalStoreData = {
        userId: userId,
        paymentType,
        amount,
        tranId,
        status: "pending",
        validateTime: validateMonth(),
      };

      const saved = new paymentModel(finalStoreData);
      await saved.save();

      if (saved) {
        // Redirect the user to payment gateway
        res.status(200).json({
          status: 200,
          message: "Success",
          data: gatewayPageURL,
        });
      }
    });
  } catch (err) {
    return res?.status(404).send("Somethings Wrong!");
  }
};

// payment success
const paymentSuccess = async (req, res) => {
  const { tranId } = req.params;

  try {
    if (tranId) {
      const paymentDetails = await paymentModel.findOne({ tranId: tranId });
      if (paymentDetails?._id) {
        const paymentUpdate = await paymentModel.findByIdAndUpdate(
          paymentDetails?._id,
          {
            $set: {
              status: "successful",
            },
          },
          { new: true }
        );

        if (paymentUpdate) {
          return res.redirect(`${liveLink}/payment/success/`);
        }
        // response
        return res.status(200).send({
          message: "payment successful",
          data: paymentUpdate,
        });
      }

      return res.status(403).send({ message: "Not found payment details!" });
    }

    return res.status(404).send({ message: "tranId not found!" });
  } catch (error) {
    return res?.status(404).send({ message: "Somethings Wrong!" });
  }
};

// payment fail
const paymentFail = async (req, res) => {
  const { tranId } = req.params;

  try {
    if (tranId) {
      const paymentDetails = await paymentModel.findOne({ tranId: tranId });
      if (paymentDetails?._id) {
        const PDDelete = await paymentModel.findOneAndDelete(
          paymentDetails?._id
        );
        if (PDDelete) {
          return res.redirect(`${liveLink}/payment/fail`);
        }

        // response
        return res.status(200).send({
          message: "payment successful",
          data: paymentUpdate,
        });
      }

      return res.status(403).send({ message: "Not found payment details!" });
    }

    return res.status(404).send({ message: "tranId not found!" });
  } catch (error) {
    return res?.status(404).send({ message: "Somethings Wrong!" });
  }
};

// payment cancel
const paymentCancel = async (req, res) => {
  const { tranId } = req.params;

  try {
    if (tranId) {
      const paymentDetails = await paymentModel.findOne({ tranId: tranId });
      if (paymentDetails?._id) {
        const PDDelete = await paymentModel.findOneAndDelete(
          paymentDetails?._id
        );
        if (PDDelete) {
          return res.redirect(`${liveLink}/payment/fail`);
        }

        // response
        return res.status(200).send({
          message: "payment successful",
          data: paymentUpdate,
        });
      }

      return res.status(403).send({ message: "Not found payment details!" });
    }

    return res.status(404).send({ message: "tranId not found!" });
  } catch (error) {
    return res?.status(404).send({ message: "Somethings Wrong!" });
  }
};

// find by userId payment history
const userPaymentHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const userPayment = await paymentModel.find({ userId: userId });
    if (userPayment) {
      return res.status(200).send({ message: "success", data: userPayment });
    } else {
      return res.status(404).send({ message: "Not found payment history!" });
    }
  } catch (error) {
    return res?.status(404).send({ message: "Somethings Wrong!" });
  }
};

// all payment history for admin view data
const allPaymentHistory = async (req, res) => {
  try {
    const paymentHistory = await paymentModel.find();

    const historyData = await Promise.all(
      paymentHistory.map(async (payment) => {
        const userData = await User.findById(payment?.userId);

        return {
          ...payment?._doc,
          userData: {
            _id: userData?._id,
            name: userData?.name,
            email: userData?.email,
            phone: userData?.phone,
            gender: userData?.gender,
            location: userData?.location,
            role: userData?.role,
          },
        };
      })
    );

    // const paymentHistoryData = {}

    return res.status(200).send({
      message: "payment history find successful",
      data: historyData,
    });
  } catch (error) {
    return res.status(402).send({ message: "Some think Wrong!" });
  }
};

module.exports = {
  paymentOder,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  userPaymentHistory,
  allPaymentHistory,
};
