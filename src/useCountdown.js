import { useState, useEffect, useRef } from 'react';

const SEC_PER_DAY = 60 * 60 * 24;
const SEC_PER_HOUR = 60 * 60;
const SEC_PER_MIN = 60;

const HOURS_PER_DAY = 24;
const MIN_PER_HOUR = 60;

export const formatSecondsLeft = (secondsLeft, unit =  "days", compact) => {

  const diffDays = Math.floor(secondsLeft / SEC_PER_DAY);
  const diffHours = Math.floor(secondsLeft / SEC_PER_HOUR);
  const diffMin = Math.floor(secondsLeft / SEC_PER_MIN);

  switch (unit) {
    case "days":
      return {
        days: (compact && diffDays === 0) ? undefined :  diffDays,
        hours: (compact && diffHours === 0 && diffDays === 0) ? undefined : diffHours % HOURS_PER_DAY,
        minutes: diffMin % MIN_PER_HOUR,
        seconds: secondsLeft % SEC_PER_MIN
      };
    case "hours":
      return {
        hours: (compact && diffHours === 0) ? undefined : diffHours,
        minutes: diffMin % MIN_PER_HOUR,
        seconds: secondsLeft % SEC_PER_MIN
      };
    case "minutes":
      return {
        minutes: diffMin,
        seconds: secondsLeft % SEC_PER_MIN
      };
    case "seconds":
      return {
        seconds: secondsLeft
      };
    default:
      return {
        seconds: secondsLeft
      };
  }

}

export const toString = (value) => {
  return (value < 10) ? `0${value}` : value;
}

const useCountdown = (initialDate, initFormat, allowCountUp = true ) => {



  const [date, setDate] = useState(new Date(initialDate));
  const [format, setFormat] = useState(initFormat);
  const [secondsLeft, setSecondsLeft] = useState(null);
  const timer = useRef();

  const {toStrings = true, compact = false, unit = "days"} = format;

  useEffect(() => {

    timer.current = setInterval(updateSecondsLeft, 1000);
    return () => clearInterval(timer.current);

  }, [date]);

  useEffect(() => {
    if(secondsLeft !== null && secondsLeft < 1 && !allowCountUp) {
      clearInterval(timer.current);
    }
  }, [secondsLeft, allowCountUp]);

  const changeDate = (date) => {
    const newDate = new Date(date);
    setDate(newDate);
  }

  const changeFormat = (params) => {
    setFormat({...format, ...params})
  }

  const getStringValues = (countdown) => {

    return {
      days: toString(countdown.days),
      hours: toString(countdown.hours),
      minutes: toString(countdown.minutes),
      seconds: toString(countdown.seconds),
    }

  }

  const updateSecondsLeft = () => {
    
    const now = Date.now();
    let diffSec = Math.floor((date - now) / 1000);
    diffSec *= (diffSec < 0) ? (-1) : 1;
    setSecondsLeft(diffSec);
  }

  
  let countdown = formatSecondsLeft(secondsLeft, unit, compact);
  countdown = toStrings ? getStringValues(countdown) : countdown;

  return { changeDate, countdown, changeFormat, format };

}

export default useCountdown;