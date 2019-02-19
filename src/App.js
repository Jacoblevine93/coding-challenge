import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import User from './components/User.js';
import Wall from './components/Wall.js';


var config = {
  apiKey: "AIzaSyBkYnqlLdzchq6vk1qmd2gLah5pjpzQThk",
  authDomain: "coding-challenge-9777d.firebaseio.com",
  databaseURL: "https://coding-challenge-9777d.firebaseio.com",
  projectId: "coding-challenge-9777d",
  storageBucket: "coding-challenge-9777d.appspot.com",
  messagingSenderId: "774053923436"
};
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComment: 'carrots',
      username: 'Guest'
    };
  }

  setActiveComment=(comment)=> {
    this.setState({activeComment: comment});
  }

  setUser=(user)=> {
    if (user === null) {user = 'Guest'}
    this.setState({username: user});
  }

  render() {
    return (
      <div className="App container-fluid">
        <div id="comment-list-row" class="row">
          <div class="col-lg-3 padding-0">
            <User
            setUser={this.setUser}
            currentUser={this.state.username}
            firebase={firebase}
            />
          </div>
          <div class="col-lg-9 padding-0">
            <Wall
            currentComment={this.state.activeComment}
            setActiveComment={this.setActiveComment}
            firebase={firebase}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
