import { Badge, Card, Select } from "antd";
import { useEffect, useState } from "react";
import CustomModal from "../../Components/Modal/CustomModal";
import { useStore } from "../../Store/Store";
import ListeningResultForm from "./TestForm/ListeningResultForm";
import WritingResultForm from "./TestForm/WritingResultForm";
import SpeakingResultForm from "./TestForm/SpeakingResultForm";

export default function TestManage() {
  const { allResults, getAllResultTest } = useStore();
  const [resultType, setResultType] = useState({ value: "all" });
  const [resultsData, setResultsData] = useState([]);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [reCall, setReCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // result data fetch
  useEffect(() => {
    console.log("fetching result data");
    setIsLoading(true);
    const fetchResult = async () => getAllResultTest();
    fetchResult();
    setIsLoading(false);
    setResultModalOpen(false);
    console.log("fetching result data end");
  }, [reCall]);

  // filter
  useEffect(() => {
    setResultsData(
      allResults
        .filter((result) => {
          if (resultType?.value === "all") {
            return result;
          } else {
            return result?.examType === resultType?.value;
          }
        })
        .sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn))
    );
  }, [allResults, resultType]);

  // console.log("allResults ", allResults);
  // console.log("resultsData ", resultsData);
  // console.log("selectedResult ", selectedResult);

  return (
    <>
      <section>
        {/* add book button */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <Select
              labelInValue
              defaultValue={{
                value: "all",
                label: "All",
              }}
              className="w-28"
              onChange={(value) => setResultType(value)}
              options={[
                {
                  value: "all",
                  label: "All",
                },
                // {
                //   value: "reading",
                //   label: "Reading",
                // },
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

            {/* Total cart */}
            {
              <span className="text-sm font-semibold ml-4">
                Total Test: {resultsData?.length}
              </span>
            }
          </div>

          <h1 className="text-xl font-semibold mb-5">Test Manage Page</h1>
        </div>

        {/* content */}
        <div className="flex items-start justify-center gap-5 flex-wrap">
          {resultsData?.map((result) => (
            <TestWritingCard
              testItem={result}
              key={result?._id}
              onClick={() => {
                setResultModalOpen(true);
                setSelectedResult(result);
              }}
            />
          ))}
        </div>
      </section>

      {/* result modal */}
      <CustomModal
        openModal={resultModalOpen}
        setOpenModal={setResultModalOpen}
        modalTitle={selectedResult?.book?.title}
        className="!w-[90%]"
      >
        {/* divide examType  writing */}
        {selectedResult?.examType === "writing" && (
          <WritingResultForm
            setReCall={setReCall}
            reCall={reCall}
            result={selectedResult}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}

        {/* divide examType listening */}
        {selectedResult?.examType === "listening" && (
          <ListeningResultForm
            setReCall={setReCall}
            reCall={reCall}
            result={selectedResult}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}

        {/* divide examType speaking */}
        {selectedResult?.examType === "speaking" && (
          <SpeakingResultForm
            setReCall={setReCall}
            reCall={reCall}
            result={selectedResult}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </CustomModal>
    </>
  );
}

// test exam type
function TestWritingCard({ testItem, onClick }) {
  // console.log("testItem ", testItem);

  // show day-month-years and time
  const testDate = new Date(testItem?.createdOn).toLocaleDateString();
  const testTime = new Date(testItem?.createdOn).toLocaleTimeString();

  return (
    <div className="min-w-56 flex-grow">
      <Badge.Ribbon
        text={<span className="capitalize">{testItem?.examType}</span>}
      >
        <Card
          title={testItem?.book?.title}
          size="small"
          className="p-5 bg-white shadow-lg rounded-lg w-full"
          hoverable="true"
        >
          <div
            className="flex flex-col items-start justify-start gap-4"
            onClick={onClick}
          >
            <div>
              <span className="font-semibold">Test Date: </span>

              <p>
                {testDate} - {testTime}
              </p>
            </div>

            <div className="flex items-center justify-start gap-4">
              <p className="font-semibold">Test Status: </p>
              <span> {testItem?.status?.type} </span>
            </div>

            <div className="">
              <span className="font-semibold">Test Message: </span>
              <p> {testItem?.status?.message} </p>
            </div>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
}
