import React, { useEffect, useState } from "react";
import '../Styles/Comment.css'
import {postNewComment} from '../Lib/fetches/comments'

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            postId: '',
            disabled: ''
        };
        this.handleChange = this.handleChange.bind(this);
        console.log("super props:::::::", props)
      }
    

    handleKeyDown = async (event) => {
      if (event.key === 'Enter') {
        const comment = {
            text: this.state.text, 
            postId: this.props.postId
        }
        await postNewComment(comment);
        this.setState({text: '', disabled: 'disabled'}, () => {
          this.props.fetchComments(this.props.postId)
        })
      }
    }



    postId = this.props.postId;

    handleChange(event) {
        this.setState({text: event.target.value});
      }
  
    render(){
    return (
        <>
            <div className="wrapper">
                <img src={this.props.image} />
                <input 
                    disabled={this.state.disabled}
                    type='text' 
                    placeholder='Leave a comment'
                    onKeyDown={this.handleKeyDown} 
                    value={this.state.value} 
                    onChange={this.handleChange}/>
            </div>
        </>
    );
    }
  }

export default Comment;