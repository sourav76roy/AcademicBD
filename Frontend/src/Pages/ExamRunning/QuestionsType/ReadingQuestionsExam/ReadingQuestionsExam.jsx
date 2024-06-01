import DOMPurify from "dompurify";
import React from "react";
import Img from "../../../../Components/Img";
import QuestionsLists from "./ShowQuestionsList/QuestionsLists";
import ExamContainer from "../../../../Components/ExamContainer";

export default function ReadingQuestionsExam({ state }) {
  return (
    <>
      <ExamContainer>
        {/* question passage */}
        <>
          <figure>
            <Img src={state?.image?.url} alt={state?.groupTitle} />
          </figure>

          <article
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(state?.description),
            }}
          ></article>
        </>

        {/* questions lists */}
        <>
          <QuestionsLists
            groupId={state?._id}
            bookId={state?.bookId}
            questions={state?.questions}
          />
        </>
      </ExamContainer>
    </>
  );
}
