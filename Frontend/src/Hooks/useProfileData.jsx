import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useStore } from "../Store/Store";

const useResultsData = () => {
  const { axiosSecure } = useAxiosSecure();
  const { getUserResults, isUser } = useStore();
  const [reCall, setReCall] = useState(false);

  useEffect(() => {
    axiosSecure
      .get(`/result/get-result-by-userId/${isUser?.user?._id}`)
      .then(({ data }) => {
        // console.log(data);
        getUserResults(data?.results);
      });
  }, [reCall]);

  return { reCall, setReCall };
};

export default useResultsData;

// import { useEffect, useState } from "react";
// import useAxiosSecure from "./useAxiosSecure";
// import { useStore } from "../Store/Store";

// const useResultsData = () => {
//   const { axiosSecure } = useAxiosSecure();
//   const { isUser } = useStore();
//   const [reCall, setReCall] = useState(false);
//   const [resultsData, setResultsData] = useState(false);

//   useEffect(() => {
//     axiosSecure
//       .get(`/result/get-result-by-userId/${isUser?.user?._id}`)
//       .then(({ data }) => {
//         // console.log(data);
//         setResultsData(data?.results);
//       });
//   }, [reCall]);

//   return { reCall, setReCall, resultsData, setResultsData };
// };

// export default useResultsData;
