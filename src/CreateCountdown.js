import React from 'react';
import Countdown from './Countdown.js';
import 'semantic-ui-css/semantic.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { List, Image, Divider } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { EXAMPLES } from './Examples.js';
import { Link } from "react-router-dom";
import Sun from './Sun';
import CountdownForm from './CountdownForm.js';


function App() {

  return (
    <div className="App">
      <Container style={{ margin: "2rem 0 1rem 0" }}>
        <Header as='h1' >
          <div className="flex align-items-center" >
            <Image circular src={process.env.PUBLIC_URL + '/stoppuhr.svg'} size='small' style={{ marginRight: "1rem" }} />
            <div>Create a custom Countdown</div>
          </div>
        </Header>
        <div>
          Icon created by <a href="https://www.flaticon.com/de/autoren/freepik" title="Freepik">
            Freepik
          </a> from <a href="https://www.flaticon.com/de/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
        <Divider />
        <CountdownForm />
        <Header as='h1' className="center aligned">Examples</Header>
        <Sun />
        <Divider />
      </Container>
      <Countdown  {...EXAMPLES["MOONLANDING"]} />
      <Container style={{ margin: "2rem 0 1rem 0" }}>
        <Header as='h1'>All examples</Header>
        <List>
          {
            Object.keys(EXAMPLES).map((example) => {
              return <List.Item as={Link} to={`/examples/${EXAMPLES[example].path}`}>
                <List.Header>{EXAMPLES[example].title}</List.Header>
                {EXAMPLES[example].date}
              </List.Item>
            })
          }
        </List>
      </Container>
    </div>
  );
}

export default App;
