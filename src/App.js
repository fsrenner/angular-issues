import React from 'react';
import 'typeface-roboto';
import './App.css';
import Issues from './Issues';
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import "mdbreact/dist/css/mdb.css"

function App() {
  return (
    <React.Fragment>
      <div className="container">
          <h1>Issues</h1>
          <Issues />
      </div>
    </React.Fragment>
  );
}

export default App;
