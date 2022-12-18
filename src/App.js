import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';

const App = () => {
  const [birthDate, setBirthDate] = useState('');
  const [weeksInLife, setWeeksInLife] = useState(0);

  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const ageInWeeks = calculateAgeInWeeks(birthDate);
    setWeeksInLife(ageInWeeks);
  };

  const calculateAgeInWeeks = (birthDate) => {
    const today = new Date();
    const birthDateTimestamp = new Date(birthDate).getTime();
    const ageInMilliseconds = today - birthDateTimestamp;
    const ageInWeeks = Math.floor(ageInMilliseconds / (7 * 24 * 60 * 60 * 1000));
    return ageInWeeks;
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Life in Weeks</h1>
          <p>Enter your birth date to see how many weeks you have lived:</p>
          <Form onSubmit={handleSubmit}>
            <FormControl
              type="date"
              value={birthDate}
              onChange={handleBirthDateChange}
              placeholder="Enter your birth date"
            />
            <Button variant="primary" type="submit">
              Calculate
            </Button>
          </Form>
        </Col>
      </Row>
      {weeksInLife > 0 && (
        <Row>
          <Col>
            <h2>You have lived for {weeksInLife} weeks</h2>
          </Col>
        </Row>
      )}
      {[...Array(Math.ceil(weeksInLife / 52)).keys()].map((yearNumber) => (
        <Row key={yearNumber}>
          {[...Array(52).keys()].map((weekNumber) => (
            <Col key={weekNumber} style={{ width: '1rem' }}>
              <div
                style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  backgroundColor: '#ddd',
                  border: '1px solid #ccc',
                  margin: '0.2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '-0.2rem',
                }}
              >
                {yearNumber * 52 + weekNumber + 1 <= weeksInLife ? 'x' : ''}
              </div>
            </Col>
          ))}
        </Row>
      ))}

    </Container>
  );
};

export default App;