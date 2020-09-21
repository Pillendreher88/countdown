import React, { useState, useEffect } from 'react'
import Countdown from './Countdown';


export default function Sunset() {

  const [sunData, setSunData] = useState(null);

  const setTime = (time, date) => {
    date.setHours(time[0]);
    date.setMinutes(time[1]);

    return date;
  }

  const getTommorow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    return date;
  }

  const isAfterTime = (time) => {
    const now = new Date();

    return (now.getHours() > time[0]) || (now.getHours() == time[0] && now.getMinutes() > time[1]);
  }

  useEffect(() => {

    fetch('https://mongro.de/api/astronomy')
      .then(response => response.json())
      .then(data => {
        const sunsetTime = data.sunset.split(":");
        const sunriseTime = data.sunrise.split(":");
        const didSunSet = isAfterTime(sunsetTime);
        const didSunRise = isAfterTime(sunriseTime);
        const isNight = didSunSet || !didSunRise;
        const sunset = setTime(sunsetTime, didSunSet ? getTommorow() : new Date());
        const sunrise = setTime(sunriseTime, didSunRise ? getTommorow() : new Date());

        setSunData({ isNight, sunset, sunrise });
      });
  }, [])


  return sunData ?
    <>
      <Countdown
        date={sunData.isNight ? sunData.sunrise : sunData.sunset}
        background={sunData.isNight ? "night" : "sunset"}
        title={sunData.isNight ? "The Sun rises in " : "The Sun sets in "}
        compactDisplay
        hideTargetDate />
      <div style={{ marginTop: "1rem" }}>
        Uses  data from the free <a href="https://ipgeolocation.io/" title="IP Geolocation">
          IP Geolocation API
        </a>
      </div>
    </>
    : null
}
