import logo from './logo.svg';

import './App.css';
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';

function App() {

  const LifeInWeeks = () => {
    const [birthDate, setBirthDate] = useState('');
    const [week, setWeek] = useState(1);
    const [weeksInLife, setWeeksInLife] = useState(52); // number of weeks in a year
  
    const handleBirthDateChange = (event) => {
      setBirthDate(event.target.value);
    };
  
    const handleWeekChange = (event) => {
      setWeek(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const ageInWeeks = calculateAgeInWeeks(birthDate, week);
      setWeeksInLife(ageInWeeks);
    };
  
    const calculateAgeInWeeks = (birthDate, week) => {
      const today = new Date();
      const birthYear = birthDate.split('-')[0];
      const currentYear = today.getFullYear();
      const ageInYears = currentYear - birthYear;
      return ageInYears * 52 + week;
    };
  
    return (
      <Container>
        <Row>
          <Col>
            <h1>Life in Weeks</h1>
            <p>Enter your birth date and current week to see how many weeks you have lived:</p>
            <Form onSubmit={handleSubmit}>
              <FormControl
                type="date"
                value={birthDate}
                onChange={handleBirthDateChange}
                placeholder="Enter your birth date"
              />
              <FormControl
                type="number"
                value={week}
                onChange={handleWeekChange}
                placeholder="Enter your current week"
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
        <Row>
          {[...Array(weeksInLife).keys()].map((weekNumber) => (
            <Col key={weekNumber} xs={1}>
              <Card>
                <Card.Body>Week {weekNumber + 1}</Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };

  return (
    <LifeInWeeks />
  )
}

export default App;
