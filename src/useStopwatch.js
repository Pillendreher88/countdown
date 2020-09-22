import { useState, useEffect, useRef } from 'react';


const useStopwatch = (initTime, countUp = false) => {

  const [time, setTime] = useState(initTime);
  const [isPaused, setPaused] = useState(true);
  const timer = useRef();

  useEffect(() => {

    if (!isPaused && (time > 0 || countUp)) {
      const startTime = Date.now();
      timer.current = setTimeout(() => updateTime(startTime), 100);
    }

    else {
      setPaused(true);
    }
    return () => clearTimeout(timer.current);

  }, [isPaused, time, countUp]);

  const reset = () => {
    setTime(initTime);
    setPaused(true);
  }

  const stop = () => {
    setPaused(true);
  }
  const start = () => {
    if(!countUp && time === 0) {
      setTime(initTime);
    }
    setPaused(false);
  }

  const togglePause = () => {
    setPaused(prev => !prev);
  }

  const updateTime = (startTime) => {
    const timeDiff = Date.now() - startTime;
    setTime(prevTime => {
      const time = prevTime - timeDiff;
      return (time > 0 || countUp) ? time : 0
    });
  }

  return { time, isPaused, start, stop, reset, togglePause };

}

export default useStopwatch;