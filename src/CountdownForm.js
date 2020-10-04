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
    background: "beach",
    onEnd: "countUp",
  };

  const [countdownCustom, setCountdownCustom] = useState(initialState);
  const [type, setType] = useState("date");

  const options59 = [];

  for (let i = 0; i < 60; i++) {
    options59.push({ text: (i < 10) ? `0${i}` : i, value: i });
  }

  const options99 = [];

  for (let i = 0; i < 100; i++) {
    options99.push({ text: (i < 10) ? `0${i}` : i, value: i });
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
    const { checked, name } = param;
    console.log(param);
    setCountdownCustom({ ...countdownCustom, [name]: checked });
  }

  const handleSubmit = () => {
    if (type === "time") {
      addStopwatch(countdownCustom)
    }
    else {
      addCountdown(countdownCustom);
    }
  }

  const addCountdown = (countdown) => {

    const date = new Date(countdown.date)
    date.setHours(countdown.hour);
    date.setMinutes(countdown.minute);
    date.setSeconds(countdown.seconds);
    const query = querystring.stringify({ d: Date.parse(date), title: countdown.title || undefined, background: countdown.background });
    history.push(`/?${query}`);
  }

  const addStopwatch = (countdown) => {

    const msLeft = countdown.hour * 60 * 60 * 1000 + countdown.minute * 60 * 1000 + countdown.seconds * 1000;
    const countUp = (countdownCustom.onEnd === "countUp") ? 1 : 0;
    const alert = (countdownCustom.onEnd === "alert") ? 1 : 0;
    const query = querystring.stringify({ t: msLeft, title: countdown.title || undefined, background: countdown.background, countUp, alert });
    history.push(`/?${query}`);
  }

  const { title, date, allowCountUp, minute, hour, seconds, onEnd } = countdownCustom;

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
            <Form.Input
              placeholder='Enter title'
              label='Title'
              name='title'
              value={title}
              onChange={handleChange}
              width={8}
            />
            <Form.Field >
              <label>Type: </label>
            </Form.Field>
            <Form.Radio
              label='Specific date'
              name='type'
              checked={type === 'date'}
              onChange={() => setType('date')}
            />
            <Form.Radio
              label='fixed amount of  time'
              name='type'
              checked={type === 'time'}
              onChange={() => setType('time')}
            />
            {type === 'time' &&
              <>
                <Form.Field >
                  <label>After Countdown ends: </label>
                </Form.Field>
                <Form.Field disabled={type === 'date'}>
                  <Form.Radio
                    name="onEnd"
                    value="countUp"
                    label='Count up '
                    checked={onEnd === "countUp"}
                    onChange={handleChange} />
                </Form.Field>
                <Form.Field >
                  <Form.Radio
                    name="onEnd"
                    value="alert"
                    label='Stop and play alert sound '
                    checked={onEnd === "alert"}
                    onChange={handleChange} />
                </Form.Field>
                <Form.Field >
                  <Form.Radio
                    name="onEnd"
                    value="stop"
                    label='Stop without sound '
                    checked={onEnd === "stop"}
                    onChange={handleChange} />
                </Form.Field>
              </>}
            <Grid padded>
              <Grid.Column computer={2} tablet={2} mobile={5}>
                <Form.Field
                  control={Select}
                  options={type === 'time' ? options99 : options23}
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
              {(type === "date") &&
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
                </Grid.Column>}
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
