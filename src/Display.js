import React from 'react'
import { useMediaQuery } from 'react-responsive';
import BACKGROUNDS from './backgrounds';

export default function Display({background, time}) {

  const isMobile = useMediaQuery({ maxWidth: 767 });
  background = BACKGROUNDS[background] ? BACKGROUNDS[background] : BACKGROUNDS.defaultBg;
  const backgroundImage = isMobile ? background.small : background.big;

  const displayStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: background.position ? background.position : "center center",
  }

  return (
    <div className="countdown-container" style={displayStyle}>
      {time.days &&
        <div className="countdown-element">
          <div className="countdown-element-display" data-testid="countdown-days">
            {time.days}
          </div>
          <div className="countdown-element-label">
            Days
            </div>
        </div>
      }
      {time.hours &&
        <div className="countdown-element">
          <div className="countdown-element-display" data-testid="countdown-hours">
            {time.hours}
          </div>
          <div className="countdown-element-label">
            Hours
            </div>
        </div>
      }
      {time.minutes &&
        <div className="countdown-element">
          <div className="countdown-element-display" data-testid="countdown-minutes">
            {time.minutes}
          </div>
          <div className="countdown-element-label">
            Minutes
          </div>
        </div>}
      {time.seconds &&
        <div className="countdown-element">
          <div className="countdown-element-display" data-testid="countdown-seconds">
            {time.seconds}
          </div>
          <div className="countdown-element-label">
            Seconds
          </div>
        </div>}
      {time.miliseconds &&
        <div className="countdown-element">
          <div className="countdown-element-display ms" data-testid="countdown-seconds" >
            {time.miliseconds}
          </div>
        </div>}
    </div>
  )
}
