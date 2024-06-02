import { useEffect, useState } from "react";
import Container from "../../Components/Container";
import SectionTitle from "../../Components/SectionTitle";
import useBooks from "../../Hooks/useBooks";
import { useStore } from "../../Store/Store";
import BookCard from "./BookCard/BookCard";
import { Empty, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

// desc: exam test lists
export default function ExamLists() {
  useBooks();
  const { books } = useStore();
  const location = useLocation();
  const [bookData, setBookData] = useState([]);
  const [bookType, setBookType] = useState({ value: location?.state || "all" });
  console.log(bookData)
  // fiter status check
  useEffect(() => {
    setBookData(
      books.filter((book) => {
        if (book?.status === "active") {
          if (bookType?.value === "all") {
            return book;
          } else {
            return book?.testType === bookType?.value;
          }
        }
      })
    );
  }, [books, bookType]);

  // filter change
  const handleFilterChange = (value) => {
    setBookType(value);
  };

  // search
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setBookData(
      books.filter((book) => {
        return book?.title.toLowerCase().includes(searchValue);
      })
    );
  };

  return (
    <Container className="!pt-12">
      <SectionTitle
        title="Exam Lists"
        description="Here are the list of exams you can take"
      />

      {/* page title */}
      <div className="flex items-center justify-between py-4">
        {/* filters side */}
        <Select
          labelInValue
          defaultValue={{
            value: location?.state || "all",
            label: (
              <span className="capitalize">{location?.state || "all"}</span>
            ),
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

        {/* Search side */}
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-72"
          onChange={handleSearchChange}
        />
      </div>

      {/* exam list || show books test card */}
      <div className="mt-10 flex flex-col gap-5">
        {bookData?.length > 0 ? (
          bookData?.map((book, idx) => <BookCard book={book} key={idx} />)
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </Container>
  );
}
