import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown, Form, Checkbox } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';
import ImageSelection from './ImageSelection.js';
import querystring from 'query-string';



const getTomorrow = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

export default function CountdownForm() {

  let history = useHistory();

  const initialState = {
    title: "",
    allowCountUp: true,
    date: getTomorrow(),
    hour: 0,
    minute: 0,
    seconds: 0,
    background: "beach"
  };

  const [countdownCustom, setCountdownCustom] = useState(initialState);

  const options59 = [];

  for (let i = 0; i < 60; i++) {
    options59.push({ text: (i < 10) ? `0${i}` : i, value: i });
  }

  const options23 = [];

  for (let i = 0; i < 24; i++) {
    options23.push({ text: (i < 10) ? `0${i}` : i, value: i });
  }

  const handleDateChange = (date) => {
    setCountdownCustom({ ...countdownCustom, date });
  }

  const handleChange = (e, param) => {
    const { name, value } = param;
    setCountdownCustom({ ...countdownCustom, [name]: value });
  }

  const toggle = (e, param) => {
    const { checked } = param;
    setCountdownCustom({ ...countdownCustom, allowCountUp: checked });
  }

  const handleSubmit = () => {
    addCountdown(countdownCustom);
  }

  const addCountdown = (countdown) => {
    const date = new Date(countdown.date)
    date.setHours(countdown.hour);
    date.setMinutes(countdown.minute);
    date.setSeconds(countdown.seconds);
    const query = querystring.stringify({ d: Date.parse(date), title: countdown.title || undefined, background: countdown.background });
    history.push(`/?${query}`);
  }

  const { title, date, allowCountUp, minute, hour, seconds } = countdownCustom;

  const CustomInput = ({ value, onClick }) => (
    <Form.Input
      value={value}
      onClick={onClick}
    />
  );
  const Select = (props) => <Dropdown selection fluid {...props} />;
  return (
    <Grid padded>
      <Grid.Row centered>
        <Grid.Column mobile={16} computer={12} color="black">
          <Form onSubmit={handleSubmit} inverted>
            <Form.Group widths='equal' inline>
              <Form.Input
                placeholder='Enter title'
                label='Title'
                name='title'
                value={title}
                onChange={handleChange}
              />
              <Form.Field>
                <Checkbox
                  label='Allow count up '
                  checked={allowCountUp}
                  onChange={toggle} />
              </Form.Field>
            </Form.Group>
            <Grid padded>
              <Grid.Column computer={2} tablet={2} mobile={5}>
                <Form.Field
                  control={Select}
                  options={options23}
                  name='hour'
                  value={hour}
                  label="Hour"
                  search
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column computer={2} tablet={2} mobile={5}>
                <Form.Field
                  control={Select}
                  options={options59}
                  label="Minute"
                  name='minute'
                  value={minute}
                  search
                  onChange={handleChange}

                />
              </Grid.Column>
              <Grid.Column computer={2} tablet={2} mobile={5}>
                <Form.Field
                  control={Select}
                  options={options59}
                  label="Seconds"
                  name='seconds'
                  value={seconds}
                  search
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={4} computer={4}>
                <Form.Field>
                  <label>Pick a date</label>
                  <DatePicker
                    name='date'
                    value={date}
                    onChange={handleDateChange}
                    selected={date}
                    minDate={!allowCountUp ? new Date() : null}
                    placeholderText="Click to select a date"
                    customInput={<CustomInput />}
                  />
                </Form.Field>
                <Form.Field>
                </Form.Field>
              </Grid.Column>
            </Grid>
            <ImageSelection
              onChange={(background) => setCountdownCustom({ ...countdownCustom, background })}
              value={countdownCustom.background} />
            <Form.Button content='Create Countdown' inverted color='blue' />
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
