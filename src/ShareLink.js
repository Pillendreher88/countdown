import React, {useRef} from 'react'
import { Header, Input } from 'semantic-ui-react';

export default function ShareLink({url}) {

  const ref = useRef(null);

  const copyToClipboard = () => {
     ref.current.select(); 
    console.log(ref.current);
    document.execCommand('copy');
  }

  return (
    <>
    <Header as='h2' className = "center aligned">Share this Countdown</Header>
    <div className = "share-link-container">
      <Input 
      type="text" 
      ref = {ref} 
      value={url} 
      size = "large" 
      fluid   
      action={{
      color: 'teal',
      labelPosition: 'right',
      icon: 'copy',
      content: 'Copy',
      onClick : copyToClipboard
    }}/>
    </div>
    </>
  )
}
