import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar"
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";

// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />  {/*navbar component */}
        <br/> {/*to leave a line */}
        {/*path attribute is set to url path and it loads that particular component*/}
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>

  );
}

export default App;
