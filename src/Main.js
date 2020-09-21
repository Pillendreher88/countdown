import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import Countdown from './Countdown';
import querystring from 'query-string';
import ShareLink from './ShareLink';


export default function Main() {

  const location = useLocation();
  const query = querystring.parse(location.search);
  const { d: date, title, background} = query;

  return (
    date ? 
    <div>
      <Countdown
        title={title}
        date={Number(date)}
        background = {background}
       />
        <ShareLink url = {window.location.href}/>
    </div> :
    <Redirect to="/create" />
  )
}
