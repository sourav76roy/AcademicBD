export default function ExamContainer({ children }) {
  return (
    <div className="mx-auto flex items-start justify-between gap-4 border divide-y">
      {/* passage */}
      <div className="w-full max-h-screen min-h-max overflow-y-scroll p-4">
        {children[0]}
      </div>
      {/* questions */}
      <div className="p-4 rounded-md w-full max-h-screen overflow-y-scroll">
        {children[1]}
      </div>
    </div>
  );
}
