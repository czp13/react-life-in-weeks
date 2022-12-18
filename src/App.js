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

  // Calculate the average number of weeks in a human lifespan
  const averageLifespanWeeks = Math.round(80 * 52);

  const colors = {
    baby: '#ffd54f',
    youngAdult: '#aed581',
    adult: '#90caf9',
    oldAge: '#e0e0e0',
  };

  const ageRanges = [
    {
      age: 0,
      weeks: 52 * 2,
      color: colors.baby,
    },
    {
      age: 2,
      weeks: 52 * 12,
      color: colors.youngAdult,
    },
    {
      age: 21,
      weeks: 52 * 30,
      color: colors.adult,
    },
    {
      age: 55,
      weeks: 52 * 36,
      color: colors.oldAge,
    },
  ];

  const getColorForWeek = (weekNumber) => {
    for (let i = 0; i < ageRanges.length; i++) {
      const range = ageRanges[i];
      if (weekNumber <= range.weeks) {
        return range.color;
      }
      weekNumber -= range.weeks;
    }
  };

  const Legend = () => {
    const lifeCycleColors = [    { label: 'Baby', color: colors.baby },    
    { label: 'Young adult', color: colors.youngAdult },    
    { label: 'Adult', color: colors.adult },    
    { label: 'Old age', color: colors.oldAge },  
  ];
  
    return (
      <div>
        <p>Legend:</p>
        <ul>
          {lifeCycleColors.map(({ label, color }) => (
            <li key={label}>
              <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: color }} />
              {label}
            </li>
          ))}
        </ul>
      </div>
    );
  };


  return (
    <Container>
      <Row>
        <Col>
          <h1>Life in Weeks</h1>
          <p>Enter your birth date to see how many weeks you have lived:</p>
          <Form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <FormControl
              type="date"
              value={birthDate}
              onChange={handleBirthDateChange}
              placeholder="Enter your birth date"
            />
            <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
              Calculate
            </Button>
          </Form>
        </Col>
      </Row>
      {weeksInLife > 0 && (
        <Row style={{ marginTop: '20px', marginBottom: '20px'}}>
          <Col>
            <h2>You have lived for {weeksInLife} weeks</h2>
          </Col>
        </Row>
      )}
   {[...Array(Math.ceil(averageLifespanWeeks / 52)).keys()].map((yearNumber) => (
      <Row key={yearNumber}>
        {[...Array(52).keys()].map((weekNumber) => (
          <Col key={weekNumber} style={{ width: '1rem' }}>
            <div
              style={{
                width: '0.75rem',
                height: '0.75rem',
                backgroundColor: getColorForWeek(yearNumber * 52 + weekNumber + 1),
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
      <Row>
        <Col>
          <Legend squareColors={ageRanges} />
        </Col>
      </Row>
    </Container>
  );
};

export default App
