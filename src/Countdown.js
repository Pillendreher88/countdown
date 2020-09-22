import React from 'react'
import useCountdown from './useCountdown';
import { Dropdown } from 'semantic-ui-react';
import { Header, Segment, Label, Container } from 'semantic-ui-react';

import Display from './Display';


const options = [
  { key: 1, text: "in Days", value: "days" },
  { key: 2, text: "in Hours", value: "hours" },
  { key: 3, text: "in Minutes", value: "minutes" },
  { key: 4, text: "in Seconds", value: "secondes" },
]

export default function Countdown({
  title = "Countdown",
  date,
  background = "defaultBg",
  compactDisplay = false,
  initUnit = "days",
  selectUnit = true,
  hideTargetDate = false }) {

  const { countdown, changeFormat, format } = useCountdown(date, { compact: compactDisplay, unit: initUnit, toString: true });
 

  const dateTarget = new Date(date);
  const now = Date.now();

  const isCountdown = (now - dateTarget < 0);

  const TEXT_DOWN = "Time left until date: ";
  const TEXT_UP = "Time passed since date: ";

  const handleChange = (e, { value }) => {
    changeFormat({unit: value});
  }

  return (
    <>
      <Container style={{ margin: "2rem 0 1rem 0" }}>
        <Header as='h2' className="center aligned">{title}</Header>
        {!hideTargetDate ?
          <Segment raised padded textAlign="center">
            {isCountdown ? TEXT_DOWN : TEXT_UP}
            <Label color="red">
              {dateTarget.toString()}
            </Label>
            {selectUnit ?
              <Dropdown
                placeholder='Format'
                selection
                options={options}
                value={format.unit}
                onChange={handleChange}
                style={{ marginTop: "1rem" }} /> : null}
          </Segment> : null}
      </Container>
      <Display background = {background} time = {countdown}/>
    </>
  )
}
