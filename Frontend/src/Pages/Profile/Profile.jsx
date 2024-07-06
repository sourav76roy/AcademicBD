import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Container from "../../Components/Container";
import Img from "../../Components/Img";
import useResultsData from "../../Hooks/useProfileData";
import { useStore } from "../../Store/Store";
import GradesView from "./ResultCart/GradesView";
import ResultCard from "./ResultCart/ResultCard";
import ProfileDetails from "./ProfileDetails/ProfileDetails";

// desc: This file will contain the Profile page.
export default function Profile() {
  useResultsData();
  const { isUser, userResults } = useStore();

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
        <ProfileDetails />
      </div>
    </Container>
  );
}
