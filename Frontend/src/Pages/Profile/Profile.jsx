import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card } from "antd";
import Container from "../../Components/Container";
import Img from "../../Components/Img";
import useResultsData from "../../Hooks/useProfileData";
import { useStore } from "../../Store/Store";
import ResultCard from "./ResultCard";
import GradesView from "./GradesView";

// desc: This file will contain the Profile page.
export default function Profile() {
  useResultsData();
  const { isUser, userResults } = useStore();
  // getUserResults(isUser?.user?._id);

  // console.log("isUser ", isUser?.user);
  // console.log("userResults ", userResults);

  // Grades view

  return (
    <Container>
      <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-4 w-full">
        {/* results carts */}
        <div className="w-full bg-slate-100 rounded-md border p-4 ">
          <h1 className="text-xl">Results</h1>
          <GradesView result={userResults} />

          <div className="mt-4 flex items-center justify-start gap-5 flex-wrap">
            {userResults?.map((result) => (
              <ResultCard key={result?._id} result={result} />
            ))}
          </div>
        </div>

        {/* profile side */}
        <Card className="min-w-80 w-full max-w-96 flex gap-3 items-center justify-center">
          {/* image or user logo */}
          {/* if user has image then show image else show user icon */}
          <figure className="w-28 h-28 rounded-full border mb-4 mx-auto flex items-center justify-center p-2">
            {isUser?.user?.image?.url ? (
              <Img src={isUser?.user?.image?.url} alt="user" />
            ) : (
              <Avatar size={80} icon={<UserOutlined />} />
            )}
          </figure>

          {/* bio */}
          <div className="flex flex-col gap-2">
            <h1>intro</h1>
            <p className="text-sm">{isUser?.user?.intro}</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1.4 mt-4 text-center">
            <h1 className="font-semibold">{isUser?.user?.name}</h1>
            <h3>{isUser?.user?.email}</h3>
            <h3>{isUser?.user?.phone}</h3>
            <h3>gender: {isUser?.user?.gender}</h3>
          </div>
        </Card>
      </div>
    </Container>
  );
}
