import React, { Component } from 'react';
import './Wall.css';

 class Wall extends Component {
   constructor(props) {
     super(props);

     this.state = {
       comments: [],
       newComment: "",
    };

     this.commentsRef = this.props.firebase.database().ref('Comments');

   }

   componentDidMount() {
      this.commentsRef.on('child_added', snapshot => {
        const comment = snapshot.val();
        comment.key = snapshot.key;
        if (!this.props.Comment) this.props.setActiveComment(comment);
        this.setState({comments: this.state.comments.concat(comment)})
      });
   }

    handleCommentChange=(e)=> {
      this.setState({newComment: e.target.value});
    }

    handleSubmit=(e)=> {
      e.preventDefault();
      var newComment = {
        text: this.state.newComment,
      }
      this.commentsRef.push(newComment);
      this.setState({newComment: ''});
    }

    render() {
      return (
        <div id="comment-list-section">
          <div className="align-middle">
            <h1 id="title-tag"> Bloc Coding Challenge</h1>
            <button type="button" id="modal-button" data-toggle="modal" data-target="#myModal">Post</button>
            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title"></h4>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.handleSubmit}>
                      <input type="text" value={this.state.newComment} onChange={this.handleCommentChange} required />
                      <input className="btn btn-default" type="submit" value="Submit" />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="comment-list">
            {this.state.comments.map((comment) =>
            <div  id="comments" onClick={() => this.props.setActiveComment(comment)} key={comment.key}>{comment.name}
            </div>
            )}
          </ul>
        </div>
      );
    }
}

export default Wall;
