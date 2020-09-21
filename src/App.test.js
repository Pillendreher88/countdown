import React from 'react';
import { render, screen, wait, getNodeText, act } from '@testing-library/react';
import Countdown from './Countdown';
import { formatSecondsLeft, formatValue } from './useCountdown';

test('format seconds to days-hours-minutes correctly', () => {

  expect(formatSecondsLeft(60)).toHaveProperty('minutes', 1);
  expect(formatSecondsLeft(60 * 60)).toHaveProperty('hours', 1);
  expect(formatSecondsLeft(60 * 60 * 24)).toHaveProperty('days', 1);
  expect(formatSecondsLeft(60 * 60 * 24 * 2 + 8 * 60 + 44)).toEqual({ days: 2, hours: 0, minutes: 8, seconds: 44 });
  expect(formatSecondsLeft(60 * 60 * 24 + 8 * 60 + 44, "minutes")).toEqual({ minutes: 1448, seconds: 44 });
});

 test('renders countdown with correct start values', async () => {

  const testDate = new Date("October 13, 2022 11:13:00");
  const diffSec = Math.floor((testDate - Date.now()) / 1000);
  const countdown = formatSecondsLeft(diffSec);

  act(() => {
    render(<Countdown date={testDate} />);
  });
  await wait(() => expect(screen.getByTestId("countdown-days")).toHaveTextContent(countdown.days));

  expect(screen.getByTestId("countdown-hours")).toHaveTextContent(countdown.hours);
  expect(screen.getByTestId("countdown-days")).toHaveTextContent(countdown.days);
  expect(screen.getByTestId("countdown-days")).toHaveTextContent(countdown.days);

}); 




test("countdown should decrease by 1 sec after 1 second", () => {
  jest.useFakeTimers();
  let testDate = 10000;
  let now = 0;

  jest.spyOn(global.Date, 'now').mockImplementation(() => now);

  act(() => {
    render(<Countdown date={testDate} />);
  });

  act(() => {
    jest.advanceTimersByTime(1000);
    now += 1000;
  });
  
  const seconds = getNodeText(screen.getByTestId("countdown-seconds"));

  act(() => {
    jest.advanceTimersByTime(1000);
    now += 1000;
  });

  expect(screen.getByTestId("countdown-seconds")).toHaveTextContent(formatValue(+seconds - 1));

  act(() => {
    jest.advanceTimersByTime(1000);
    now += 1000;
  });

  expect(screen.getByTestId("countdown-seconds")).toHaveTextContent(formatValue(+seconds - 2));
});
