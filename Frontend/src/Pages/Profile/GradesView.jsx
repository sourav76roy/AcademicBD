import { Card } from "antd";

export default function GradesView({ result }) {
  // divide the result into reading, listening, writing, speaking
  const readingData = result?.filter((res) => res?.examType === "reading");
  const listeningData = result?.filter((res) => res?.examType === "listening");
  const writingData = result?.filter((res) => res?.examType === "writing");
  const speakingData = result?.filter((res) => res?.examType === "speaking");

  // reading answer count, listening answer count, writing answer count, speaking answer count
  const readingAnswerCount = readingData?.reduce((acc, curr) => {
    return acc + curr?.correctAnswers;
  }, 0);
  const listeningAnswerCount = listeningData?.reduce((acc, curr) => {
    const marks = parseInt(curr?.status?.marks);
    return acc + marks;
  }, 0);
  const writingAnswerCount = writingData?.reduce((acc, curr) => {
    const marks = parseInt(curr?.status?.marks);
    return acc + marks;
  }, 0);
  const speakingAnswerCount = speakingData?.reduce((acc, curr) => {
    const marks = parseInt(curr?.status?.marks);
    return acc + marks;
  }, 0);
  //  reading grade
  const readingGrade = Math.round(
    (readingAnswerCount / readingData.length) * 9
  );
  //  listening grade
  const listeningGrade = Math.round(
    listeningAnswerCount / listeningData.length
  );
  //  writing grade
  const writingGrade = Math.round(writingAnswerCount / writingData.length);
  //  speaking grade
  const speakingGrade = Math.round(speakingAnswerCount / speakingData.length);

  return (
    <>
      <div className="flex items-center justify-stretch flex-wrap gap-2 my-4 w-full">
        <GradeCard
          title="Reading"
          grade={`${readingGrade} / ${readingData?.length}`}
        />
        <GradeCard
          title="Listening"
          grade={`${listeningGrade} / ${listeningData?.length}`}
        />
        <GradeCard
          title="Writing"
          grade={`${writingGrade} / ${writingData?.length}`}
        />
        <GradeCard
          title="Speaking"
          grade={`${speakingGrade} / ${speakingData?.length}`}
        />
      </div>
    </>
  );
}

function GradeCard({ title, grade }) {
  return (
    <Card className="flex items-center justify-center gap-2 text-center min-w-24 flex-shrink">
      <h1>{title}</h1>
      <p>{grade}</p>
    </Card>
  );
}
