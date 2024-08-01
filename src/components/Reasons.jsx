import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import fasticon from "../assets/fast.png";
import consistanticon from "../assets/consistent.png";
import innovateicon from "../assets/innovative.png";
import "./Reasons.css";

function Reasons() {
  return (
    <div className="container-fluid reasons-container">
      <Row>
        <Col md={1}></Col>
        <Col md={10}>
          <Row className="mt-5">
            <Col md={4}>
              <Card className="reason-card">
                <Card.Img variant="top" src={fasticon} className="reason-icon" />
                <Card.Body>
                  <Card.Title className="title pb-2">Fast</Card.Title>
                  <Card.Text className="reason-text">
                    ProChauffeur is responsive and fast. We take your schedule seriously.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="reason-card">
                <Card.Img variant="top" src={consistanticon} className="reason-icon" />
                <Card.Body>
                  <Card.Title className="title pb-2">Consistent</Card.Title>
                  <Card.Text className="reason-text">
                    Consistency ensures you can build your life on us. You always know what to expect.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="reason-card">
                <Card.Img variant="top" src={innovateicon} className="reason-icon" />
                <Card.Body>
                  <Card.Title className="title pb-2">Innovative</Card.Title>
                  <Card.Text className="reason-text">
                    We are on top of the newest technologies to amaze you with.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={1}></Col>
      </Row>
    </div>
  );
}

export default Reasons;
