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
          description="We develop and write the IELTS test."
        />

        {/* section content */}
        <Row gutter={16}>
          <IeltsCard
            cartTitle="Reading Test"
            img={AcademicReading}
            type="reading"
          />

          <IeltsCard
            cartTitle="Writing Test"
            img={AcademicWriting}
            type="writing"
          />

          <IeltsCard
            cartTitle="Speaking Test"
            img={AcademicSpeaking}
            type="speaking"
          />

          <IeltsCard
            cartTitle="Listening Test"
            img={AcademicListening}
            type="listening"
          />
        </Row>
      </Container>
    </>
  );
}

// ielts card
function IeltsCard({ cartTitle, img, type }) {
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          dolorum, nemo, quod, quidem voluptas quas quae quibusdam
        </p>

        <div className="flex justify-center items-stretch">
          <Link to="/exam-lists" state={type}>
            <Button> Let's Go </Button>
          </Link>
        </div>
      </Card>
    </Col>
  );
}
