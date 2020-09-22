import React, { useEffect, useState, useRef } from 'react'
import useStopwatch from './useStopwatch'
import { Button, Container, Header, Icon, Modal } from 'semantic-ui-react';
import { formatMsLeft, getStringValues } from './useCountdown';
import Display from './Display';
import audioUrl from "./alert.mp3";


export default function Stopwatch({ background, title, initTime, countUp = false, alert = "0" }) {

  const { reset, start, togglePause, time, isPaused } = useStopwatch(initTime, countUp);
  const [open, setOpen] = useState(false);
  const audio = useRef(null);

  useEffect(() => {
    if (!countUp && time === 0) {
      setOpen(true);
      if(alert) {
        playAlert();
      } 
    }
  }, [time, countUp, alert]);

  useEffect(() => {
    audio.current = new Audio(audioUrl);
    audio.current.loop = true;
  }, []);

  useEffect(() => {
    if(!open) {
      stopAlert();
    }
  }, [open]);

  const playAlert = () => {
    audio.current.play();
  }

  const stopAlert = () => {
    console.log("stop");
    audio.current.pause();
    audio.current.currentTime = 0;
  }

  const timeFormatted = getStringValues(formatMsLeft(Math.abs(time), "hours", null, true));

  return (
    <>
      <Modal
        size="tiny"
        open={open}
        closeIcon
        onClose={() => {setOpen(false)}}
      >
        <Modal.Header>Time has elapsed</Modal.Header>
        <Modal.Actions>
          <Button color='red' onClick={() => { setOpen(false); start(); }}>
            Restart
          </Button>
          <Button color='green' onClick={() => setOpen(false)}>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
      <Container style={{ margin: "2rem 0 1rem 0" }}>
        <Header as='h1' className="center aligned">{title}</Header>
      </Container>
      <Display time={timeFormatted} background={background} />
      <div className="btn-container-stopwatch">
        {isPaused ?
          <Button
            onClick={() => start()} color="green"
            size="huge">
            <Icon name='play' />
            Start
          </Button> :
          <Button
            onClick={() => togglePause()} color="red"
            size="huge">
            <Icon name='pause' />
            Stopp
          </Button>
        }
        <Button
          onClick={() => reset()} color="yellow"
          size="huge">
          Reset
        </Button>
      </div>
    </>
  )
}
