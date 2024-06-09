import { Button, Card, Col, Row } from "antd";
import Container from "../../../Components/Container";
import Img from "../../../Components/Img";
import SectionTitle from "../../../Components/SectionTitle";

// img import here
import AcademicListening from "../../../assets/card-listining.jpg";
import AcademicReading from "../../../assets/card-reading.jpg";
import AcademicSpeaking from "../../../assets/card-speaking.jpg";
import AcademicWriting from "../../../assets/card-writing.jpg";
import { Link } from "react-router-dom";

export default function IeltsTest() {
  return (
    <>
      <Container>
        <SectionTitle
          title="test you skills"
          description="Start Your Journey With AcademicBD."
        />

        {/* section content */}
        <Row gutter={16}>
          <IeltsCard
            cartTitle="Reading Test"
            img={AcademicReading}
            type="reading"
            description="This is Your Reading test for start the test click on start button below"
          />

          <IeltsCard
            cartTitle="Writing Test"
            img={AcademicWriting}
            type="writing"
            description="This is Your Writing test for start the test click on start button below "
          />

          <IeltsCard
            cartTitle="Speaking Test"
            img={AcademicSpeaking}
            type="speaking"
            description="This is Your Speaking test for start the test click on start button below "
          />

          <IeltsCard
            cartTitle="Listening Test"
            img={AcademicListening}
            type="listening"
            description="This is Your Listening test for start the test click on start button below"
          />
        </Row>
      </Container>
    </>
  );
}

// ielts card
function IeltsCard({ cartTitle, img, type, description }) {
  return (
    <Col span={6}>
      <Card
        title={cartTitle}
        bordered={true}
        hoverable={true}
        cover={
          <figure className="h-60 w-full px-0.5">
            <Img src={img} className="w-full h-full" />
          </figure>
        }
      >
        {/* demo description */}
        <p className="text-center text-gray-500 mb-4">
         {description}
        </p>

        <div className="flex justify-center items-stretch ">
          <Link to="/exam-lists" state={type}>
            <Button className="bg-green-500"> Start </Button>
          </Link>
        </div>
      </Card>
    </Col>
  );
}
