import React, { useState } from 'react'
import useCountdown from './useCountdown';
import { Dropdown } from 'semantic-ui-react';
import { Header, Segment, Label, Container } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive';
import BACKGROUNDS from './backgrounds';


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
  const isMobile = useMediaQuery({ maxWidth: 767 });
  background = BACKGROUNDS[background] ? BACKGROUNDS[background] : BACKGROUNDS.defaultBg;
  const backgroundImage = isMobile ? background.small : background.big;

  const dateTarget = new Date(date);
  const now = Date.now();

  const isCountdown = (now - dateTarget < 0);

  const TEXT_DOWN = "Time left until date: ";
  const TEXT_UP = "Time passed since date: ";

  const handleChange = (e, { value }) => {
    changeFormat({unit: value});
  }

  const countdownStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: background.position ? background.position : "center center",
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
      <div className="countdown-container" style={countdownStyle}>
        {countdown.days &&
          <div className="countdown-element">
            <div className="countdown-element-display" data-testid="countdown-days">
              {countdown.days}
            </div>
            <div className="countdown-element-label">
              Days
            </div>
          </div>
        }
        {countdown.hours &&
          <div className="countdown-element">
            <div className="countdown-element-display" data-testid="countdown-hours">
              {countdown.hours}
            </div>
            <div className="countdown-element-label">
              Hours
            </div>
          </div>
        }
        {countdown.minutes &&
          <div className="countdown-element">
            <div className="countdown-element-display" data-testid="countdown-minutes">
              {countdown.minutes}
            </div>
            <div className="countdown-element-label">
              Minutes
          </div>
          </div>}
        {countdown.seconds &&
          <div className="countdown-element">
            <div className="countdown-element-display" data-testid="countdown-seconds">
              {countdown.seconds}
            </div>
            <div className="countdown-element-label">
              Seconds
          </div>
          </div>}
      </div>
    </>
  )
}
