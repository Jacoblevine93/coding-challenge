import React, { Component } from 'react';
import './User.css';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {this.props.setUser(user);});
  }

  signIn=()=> {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut=()=> {
    this.props.firebase.auth().signOut();
  }

  displayUser=(currentUser)=> {
    if (currentUser !== 'Guest') {return currentUser.displayName;}
    else {return currentUser}
  }

  render() {
    return (
      <section id="user-section">
        <p> User: {this.displayUser(this.props.currentUser)}</p>
        <button className="btn-sm" onClick={this.signIn}>Sign In</button>
        <button className="btn-sm" onClick={this.signOut}>Sign Out</button>
      </section>
    );
  }

}

export default User;
