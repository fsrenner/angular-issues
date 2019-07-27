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
          <p>
              This app displays the issues from the Angular Github repository for the last seven days. 
              Github displays 30 results per page, so this app finds the total number of pages of issues 
              for the last seven days and sets up the corresponding pagination to page through all of the results. 
              You may click a page number to go directly to that page or click the arrows to go through the results.
          </p>
          <Issues />
      </div>
    </React.Fragment>
  );
}

export default App;
