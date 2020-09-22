import React, {useEffect, useState} from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import Countdown from './Countdown';
import querystring from 'query-string';
import ShareLink from './ShareLink';
import Stopwatch from './Stopwatch';

export default function Main() {


  const location = useLocation();
  const query = querystring.parse(location.search);
  const { d: date, t: time, title, background, countUp, alert } = query;

  

  if (!date && !time)
    return <Redirect to="/create" />;

  return (
    <>
      {date ?
        <div>
          <Countdown
            title={title}
            date={Number(date)}
            background={background}
          />
          <ShareLink url={window.location.href} />
        </div> :
        <Stopwatch
          title={title}
          initTime={time}
          background={background}
          alert = {Boolean(Number(alert))}
          countUp = {Boolean(Number(countUp))} />}
    </>
  )
}
