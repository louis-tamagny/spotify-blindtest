/* eslint-disable react/prop-types */
import { Row, Col, Button } from "react-bootstrap"

const GameAnswers = ({ list, handleChoice }) => {
  return (
    <Row style={{ padding: "10%", gap: "10px" }}>
      {list.map((item) => (
        <Col key={item.id}>
          <Button
            style={{ width: "100%", height: "100%" }}
            value={item.id}
            onClick={(e) => handleChoice(e)}
          >
            {item.name}
          </Button>
        </Col>
      ))}
    </Row>
  )
}

export default GameAnswers
