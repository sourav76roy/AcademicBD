import DOMPurify from "dompurify";
import Img from "../../../../../Components/Img";

// desc: Writing Questions List component for BookCard component
export default function ListeningQuestionsLists({ questions = [] }) {
  console.log("questions", questions);
  return (
    <div>
      {/* Writing Questions */}
      <h2 className="text-lg font-semibold mb-4">Writing Questions Lists</h2>
      <div className="flex flex-col gap-5 items-start justify-start">
        {questions?.map((question, idx) => (
          <WritingQuestionItem
            question={question}
            key={question._id}
            idx={idx + 1}
          />
        ))}
      </div>
    </div>
  );
}

// Writing Question Item
function WritingQuestionItem({ question, idx }) {
  return (
    <div className="flex flex-col gap-4 items-start justify-start p-2 border rounded-md">
      <h3 className="text-lg font-semibold">
        Question - {idx} : {question?.title}
      </h3>
      <figure>
        <Img src={question?.image?.url} alt={question?.title} />
      </figure>

      {/* description */}
      <article
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(question?.description),
        }}
      ></article>

      {/* audio player */}
      {question?.audio && (
        <audio controls>
          <source src={question?.audio?.fileUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
