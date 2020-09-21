import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Countdown from './Countdown';
import Sun from './Sun';

export const EXAMPLES = {
  SYLVESTER: { date: "Januar 1, 2021 00:00:00", title: "Sylvester 2021", background: "sylvester", path: "sylvester" },
  CHRISTMAS: { date: "December 24, 2020 00:00:00", title: "Christmas 2020", background: "christmas", path: "christmas" },
  SUMMER: { date: "June 21, 2021 05:32:00", title: "Summer 2021", background: "beach", path: "summer" },
  MOONLANDING: { date: "1969-07-21T02:56:20Z", title: "First steps on moon", background: "moon", path: "moonlanding" },
  ENDWW2: { date: "1945-09-02T00:00:00Z", title: "End of World War 2", background: "grave", path: "endww2" },
  HALLOWEEN: { date: "2021-10-31T00:00:00Z", title: "Halloween", background: "halloween", path: "halloween" },
  SUN: {path: "sun", title: "Solar altitude"}
}

export default function Examples() {



  let { example } = useParams();
  const props = EXAMPLES[example.toUpperCase()];

  if(example === "sun") {
    return <Sun/>
  }
  
  return (
    <Countdown {...props} />
  )
}
