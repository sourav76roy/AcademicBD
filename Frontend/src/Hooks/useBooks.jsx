import { useEffect, useState } from "react";
import { useStore } from "../Store/Store";
import useAxiosSecure from "./useAxiosSecure";

const useBooks = () => {
  const { axiosSecure } = useAxiosSecure();
  const { getBooks, isUser } = useStore();
  const [reCall, setReCall] = useState(false);

  useEffect(() => {
    axiosSecure.get(`/book/books/${isUser?.role}`).then(({ data }) => {
      getBooks(data?.books);
    });
  }, [reCall]);

  return { reCall, setReCall };
};

export default useBooks;
