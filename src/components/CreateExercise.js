import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component{

    //adding a constuctor
    constructor(props) {
        super(props);    //you must call it for defining constructor of subclass and it must be the first line

        //binding this(i.e. referring to the class CreateExercise) to each of the methods so that 'this' will be referring to the right thing
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //setting initial state of the component (state is how you create variables in react)
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [] 
        }//whenever you update the state it automatically updates the page with the new values  
    }

    // componentdidmount(react lifecycle method) is called before anything displays on the page
    componentDidMount() {
        this.setState({
            users: ['test user'],
            username: 'test user'
        })
    }

    onChangeUsername(e) {
        this.setState({
            //we don't do this.state.username = data, always use setState method
            username: e.target.value    // only updates this particular element
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date  //as this is taking the date on the calender
        })
    }

    onSubmit(e) {
        e.preventDefault(); // preventing default html form submit behaviour and doing what we define below
    
        const exercise = {
          username: this.state.username,
          description: this.state.description,
          duration: this.state.duration,
          date: this.state.date
        }

        console.log(exercise);

        window.location = '/'; //back to home page
    }
    

    render() {
        return(
            <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) { //this.state.users : array of all the users , .map allows us to return something for each element in the array
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>
              <div className="form-group">
                <label>Duration (in minutes): </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                    />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
      
              <div className="form-group">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}