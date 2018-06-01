import React from 'react';
import './style/githubLight.css';
import './style/githubPrimerProduct.css';
import './style/app.css';

import Header from './components/header'
import Triage from './components/triage'
import Wait from './components/wait'
import Todo from './components/todo'
import Review from './components/review'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="app">
          <div className="container container-left">
            <div className="table-list-header vcard-fullname">
              To Triage
            </div>
            <Triage />
          </div>
          <div className="container container-right">
            <div className="table-list-header vcard-fullname">
              Awaiting Response
            </div>
            <Wait />
          </div>
          <div className="container container-left">
            <div className="table-list-header vcard-fullname">
              TODO
            </div>
            <Todo />
          </div>
          <div className="container container-right">
            <div className="table-list-header vcard-fullname">
              To Review
            </div>
            <Review />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
