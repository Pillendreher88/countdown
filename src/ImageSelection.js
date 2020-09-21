import React, { useState } from 'react'
import { Modal, Button, Image } from 'semantic-ui-react';
import BACKGROUNDS from './backgrounds';


export default function ImageSelection({ onChange, value = "sylvester" }) {

  const [open, setOpen] = useState(false);
  const [selectedImage, changeSelected] = useState(null);

  const handleClick = (background) => {
    changeSelected(background);
  }

  const handleConfirm = () => {
    if (onChange) {
      onChange(selectedImage);
    }
    setOpen(false);
  }

  const images = () => {
    return Object.keys(BACKGROUNDS).map((background, index) =>
      <Image
        src={BACKGROUNDS[background].small}
        className={`${selectedImage === background ? "selected" : null} background-select`}
        onClick={(e) => handleClick(background)}
        key={background + index} />)
  }

  return (
    <>
      <Image size='small' src={BACKGROUNDS[value].small} />
      <Button onClick={() => setOpen(true)} type="button" style = {{margin: "1rem 0"}}  inverted color='grey'>
        Select your background-image
      </Button>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Select a Background for your countdown</Modal.Header>
        <Modal.Content>
          <Image.Group size='small'>
            {images()}
          </Image.Group>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)} type="button" negative>
            Cancel
        </Button>
          <Button
            positive
            onClick={handleConfirm}
          >
            Change Background
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}
