import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>    {/*as we only need part of the date and not the entire time and timezone */}
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
  )

//Exercise is implemented as a functional react component(a component that lacks state and life cycle methods) {you should use it only if you need to accept props and return JSX}
//ExerciseList is implemented as a class component

export default class ExercisesList extends Component {
    constructor(props) {
      super(props);
  
      this.deleteExercise = this.deleteExercise.bind(this)
  
      this.state = {exercises: []};
    }
  
    componentDidMount() {
      axios.get('http://localhost:5000/exercises/')
        .then(response => {
          this.setState({ exercises: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    deleteExercise(id) {
      axios.delete('http://localhost:5000/exercises/'+id)
        .then(response => { console.log(response.data)});//deleting the item from the database
        //to delete the element from the table being shown to the user
      this.setState({
        exercises: this.state.exercises.filter(el => el._id !== id) //_id is already created in the database when you store anything in the database
      })
    }
  
   /*using the exercise component created above*/
    exerciseList() {
      return this.state.exercises.map(currentexercise => {
        return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
      })
    }
  
    render() {
      return (
        <div>
          <h3>Logged Exercises</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.exerciseList() }   
            </tbody>
          </table>
        </div>
      )
    }
  }