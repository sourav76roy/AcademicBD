import { Button } from "antd";
import { Link } from "react-router-dom";
import Container from "../../../Components/Container";
import Img from "../../../Components/Img";
import bannerImg from "../../../assets/growth-banner.jpg";

export default function HeroBanner() {
  return (
    <>
      <Container>
        <div className="flex md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-purple-900">
              Test your IELTS Score Here
            </h1>
            <p className="mb-8 leading-relaxed text-red-800 ">
              Preparing for the International English Language Testing System
              (IELTS) can be a challenging task, especially when you are also
              preparing to study abroad. However, with the right mindset and
              approach, you can stay motivated and achieve your goals. we will
              explore some tips on how to stay motivated during your IELTS
              preparation and how to set your study abroad and test preparation
              goals.
            </p>

            {/*  */}
            <div>
              <h2 className="text-lg font-medium mb-2">Growth Your Skills</h2>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link to="/exam-lists" state="reading">
                  <Button className="border-solid border-2 border-red-700 ring-offset-2 ring-4 ring-fuchsia-800 bg-orange-700 ">Reading</Button>
                </Link>
                <Link to="/exam-lists" state="writing">
                  <Button className="border-solid border-2 border-red-700 ring-offset-2 ring-4 ring-amber-800 bg-orange-700 " >Writing</Button>
                </Link>
                <Link to="/exam-lists" state="speaking">
                  <Button className="border-solid border-2 border-red-700 ring-offset-2 ring-4 ring-lime-800 bg-orange-700 " >Speaking</Button>
                </Link>
                <Link to="/exam-lists" state="listening">
                  <Button className="border-solid border-2 border-red-700 ring-offset-2 ring-4 ring-pink-800 bg-orange-700 " >Listening</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <figure className="rounded-lg overflow-hidden">
              <Img
                className="object-cover object-center rounded"
                alt="hero"
                src={bannerImg}
              />
            </figure>
          </div>
        </div>
      </Container>
    </>
  );
}
