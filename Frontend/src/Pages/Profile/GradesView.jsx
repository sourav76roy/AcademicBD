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

  //  speaking average
  const speakingGrade = Math.round(speakingAnswerCount / speakingData.length);

  // ielts grading system
  function getLetterGrade(score) {
    // score check
    if (typeof score !== "number") {
      return score;
    }

    if (score >= 41) {
      return 9;
    } else if (score >= 39 && score <= 40) {
      return 9;
    } else if (score >= 37 && score <= 38) {
      return 8.5;
    } else if (score >= 35 && score <= 36) {
      return 8;
    } else if (score >= 32 && score <= 34) {
      return 7.5;
    } else if (score >= 30 && score <= 31) {
      return 7;
    } else if (score >= 26 && score <= 29) {
      return 6.5;
    } else if (score >= 23 && score <= 25) {
      return 6;
    } else if (score >= 18 && score <= 22) {
      return 5.5;
    } else if (score >= 16 && score <= 17) {
      return 5;
    } else if (score >= 13 && score <= 15) {
      return 4.5;
    } else if (score >= 10 && score <= 12) {
      return 4;
    } else if (score >= 7 && score <= 9) {
      return 3.5;
    } else if (score >= 5 && score <= 6) {
      return 3;
    } else if (score >= 3 && score <= 4) {
      return 2.5;
    } else if (score >= 1 && score <= 2) {
      return 2;
    } else {
      return 0;
    }
  }

  return (
    <div className="flex items-center justify-between gap-5 mt-4">
      <div className="border p-4 rounded-md">
        <h1 className="text-2xl font-semibold text-center">Grade</h1>
        <div className="flex items-center justify-stretch flex-wrap">
          <GradeCard
            title="Reading"
            grade={`${getLetterGrade(readingGrade)}`}
          />
          <GradeCard
            title="Listening"
            grade={`${getLetterGrade(listeningGrade)}`}
          />
          <GradeCard
            title="Writing"
            grade={`${getLetterGrade(writingGrade)}`}
          />
          <GradeCard
            title="Speaking"
            grade={`${getLetterGrade(speakingGrade)}`}
          />
        </div>
      </div>

      <div className="border p-4 rounded-md">
        <h1 className="text-2xl font-semibold text-center"> Average </h1>
        <div className="flex items-center justify-stretch flex-wrap">
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
      </div>
    </div>
  );
}

function GradeCard({ title, grade }) {
  return (
    <Card className="flex items-center justify-center gap-2 text-center w-1/2">
      <h1>{title}</h1>
      <p>{grade}</p>
    </Card>
  );
}


