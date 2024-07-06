import { useParams } from "react-router-dom";
import { useStore } from "../../Store/Store";
import { useEffect, useState } from "react";
import { message } from "antd";

const thikIcon = (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2.5"
    className="w-3 h-3"
    viewBox="0 0 24 24"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const arrowRightIcon = (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="w-4 h-4 ml-auto"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Payment() {
  const { isUser, paymentPost } = useStore();
  const { status } = useParams();
  const [error, setError] = useState(null);
  // console.log("status ", status);

  useEffect(() => {
    if (status) {
      if (status === "success") {
        message.success("Payment Successful");
      } else if (status === "cancel") {
        setError("Payment Cancel");
      } else {
        setError("Payment Failed");
      }
    }
  }, []);

  const handleContinue = async (type) => {
    const paymentData = {
      userId: isUser?.user?._id,
      paymentType: type,
    };

    if (paymentData) {
      const response = await paymentPost(paymentData);
      window.location.replace(response);
    }
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Pricing
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.
          </p>
        </div>

        {/* show error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* pricing */}

        <div className="flex flex-wrap -m-4">
          {/* start */}
          <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                START
              </h2>
              <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                <span>৳200</span>
              </h1>
              <div className="mb-6">
                <ParaItem text="2 months" />
                <ParaItem text="Tumeric plaid portland" />
                <ParaItem text="Hexagon neutra unicorn" />
              </div>
              <button
                onClick={() => handleContinue("start")}
                className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
              >
                Continue
                {arrowRightIcon}
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div>
          </div>

          {/* pro */}
          <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
              <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                POPULAR
              </span>
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                PRO
              </h2>
              <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                <span>৳400</span>
              </h1>

              <div className="mb-6">
                <ParaItem text="4 months" />
                <ParaItem text="Tumeric plaid portland" />
                <ParaItem text="Hexagon neutra unicorn" />
                <ParaItem text="Mixtape chillwave tumeric" />
              </div>

              <button
                onClick={() => handleContinue("pro")}
                className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"
              >
                Continue
                {arrowRightIcon}
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div>
          </div>

          {/* special */}
          <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                SPECIAL
              </h2>
              <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                <span>৳500</span>
              </h1>

              <div className="mb-6">
                <ParaItem text="6 months" />
                <ParaItem text="Tumeric plaid portland" />
                <ParaItem text="Hexagon neutra unicorn" />
                <ParaItem text="Vexillologist pitchfork" />
                <ParaItem text="Mixtape chillwave tumeric" />
              </div>

              <button
                onClick={() => handleContinue("special")}
                className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
              >
                Continue
                {arrowRightIcon}
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// facility item
function ParaItem({ text }) {
  return (
    <div className="flex items-center text-gray-600 mb-2">
      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
        {thikIcon}
      </span>

      <p>{text}</p>
    </div>
  );
}
