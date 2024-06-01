import { FileAddOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import CustomModal from "../../Components/Modal/CustomModal";
import useBooks from "../../Hooks/useBooks";
import { useStore } from "../../Store/Store";
import AddNewBook from "./AddNewBook/AddNewBook";
import BookCard from "./BookCard/BookCard";

export default function BookTest() {
  useBooks();
  const [bookTestOpenModal, setBookTestOpenModal] = useState(false);
  const { books } = useStore();
  const [bookData, setBookData] = useState([]);
  const [bookType, setBookType] = useState({ value: "all" });

  // fiter
  useEffect(() => {
    setBookData(
      books.filter((book) => {
        if (bookType?.value === "all") {
          return book;
        } else {
          return book?.testType === bookType?.value;
        }
      })
    );
  }, [books, bookType]);

  // console.log("books ", books);
  const handleFilterChange = (value) => {
    setBookType(value);
  };

  // console.log("bookData ", bookData);

  return (
    <section>
      {/* add book button */}
      <div className="flex items-center justify-between">
        <Select
          labelInValue
          defaultValue={{
            value: "all",
            label: "All",
          }}
          className="w-28"
          onChange={handleFilterChange}
          options={[
            {
              value: "all",
              label: "All",
            },
            {
              value: "reading",
              label: "Reading",
            },
            {
              value: "writing",
              label: "Writing",
            },
            {
              value: "listening",
              label: "Listening",
            },
            {
              value: "speaking",
              label: "Speaking",
            },
          ]}
        />

        <Button
          onClick={() => setBookTestOpenModal(true)}
          type="primary"
          icon={<FileAddOutlined />}
          size="large"
        >
          Add Book
        </Button>
      </div>

      {/* show books test card */}
      <div className="mt-10 flex flex-col gap-5">
        {bookData?.length > 0 ? (
          bookData?.map((book, idx) => <BookCard book={book} key={idx} />)
        ) : (
          <h1 className="text-center text-2xl py-10">No Books Found</h1>
        )}
      </div>

      <CustomModal
        openModal={bookTestOpenModal}
        setOpenModal={setBookTestOpenModal}
        modalTitle="Add New Book"
      >
        <AddNewBook />
      </CustomModal>
    </section>
  );
}
