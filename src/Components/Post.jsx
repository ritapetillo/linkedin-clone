import React, { useEffect, useState,useContext } from "react";
import { Row } from "react-bootstrap";
import "../Styles/Post.css";
import PublicIcon from "@material-ui/icons/Public";
import AddIcon from "@material-ui/icons/Add";
import DropdownPost from "./DropdownPost";
import CommentIcon from "@material-ui/icons/Comment";
import moment from "moment";
import Comment from './Comment';
import DisplayComment from './DisplayComment';
import {getAllComments} from '../Lib/fetches/comments'
import {getUserById} from '../Lib/fetches/users'

function Post({ post, currentUser, toggleModal, userId, fetchAllPosts }) {
  // const [state, setState] = useState({
  //   comments: []
  // });
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [comments, setComment] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  console.log("POST::::::::", post);
  useEffect(() => {
    console.log("POST");
  }, []);

  const handleLike = () => {
    setToggleLike(!toggleLike);
  };
  const handleComment = async() => {
    setToggleComment(!toggleComment);
    await fetchLoggedInUser();
  };
  const handleShowComments = (id) => {
    setShowComments(!showComments);
    //fetchCommentAuthor(id)
  }

  useEffect(() => {
    setComment( comments);
    fetchAllComments(post._id);
  }, []);

  const fetchAllComments = async(postId) => {
    const comments = await getAllComments(postId);
    setComment(comments)
    
  }

  const fetchLoggedInUser = async() => {
    const user = await getUserById(userId);
    await setLoggedInUser(user);
    console.log("logedin user:::::::::", user)
  }

  const differenceDays = (date) => {
    const diff = moment(post.updatedAt).fromNow(); // another date
    return diff;
  };

  if(comments.comment)
    console.log("Comments:::::::::::::::::", comments.comment)

  // const displayComments = async () => {
  //   await comments.comment.map(comment => {
  //     <DisplayComment text={comment.text} />
  //     console.log(comment.text)
  //   })
  // }

  return (
    <>
      <Row className="post d-flex flex-column ">
      
        <Row className="d-flex justify-content-between align-items-center pt-0 pb-3 post__header">
          <span>
            {toggleLike && <>{/* <b>{currentUser}</b> likes this */}</>}
          </span>
          <DropdownPost
            fetchAllPosts={fetchAllPosts}
            toggleModal={toggleModal}
            post={post}
            userId={userId}
          ></DropdownPost>
        </Row>

        <Row className="post__body d-flex justify-content-between pt-3">
          <div className="d-flex">
            <div className="post__avatar mr-2">
              {<img src={post.userId.image} alt="user-posted-image" />}
            </div>
            <div className="post__user">
              <h4>
                {post.userId.name} {post.userId.lastName}
              </h4>
              <span className="post__user-days">
                {differenceDays(post.createdAt)} <PublicIcon />
              </span>
            </div>
          </div>

          <div className="post__follow d-flex align-items-center px-2 blue-primary-color font-weight-bold">
            <span>
              <AddIcon /> Follow
            </span>
          </div>
        </Row>
        <Row className="d-flex flex-column align-items-start post__text mt-4">
          {post.text}
          <br />
          {(() => {
            if (post.image == undefined) {
              return <>{console.log(post.image)}</>;
            } else {
              return <img src={post.image} className="img-fluid"></img>;
            }
          })()}
        </Row>
        <Row className="d-flex align-items-center post__comments ">
          {toggleLike ? (
            <>
              <span className="d-flex align-items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  id="like-creation-medium"
                  data-supported-dps="24x24"
                  onClick={() => handleLike()}
                >
                  <g fill="none" fill-rule="evenodd">
                    <path d="M0 0h24v24H0z" />
                    <path
                      d="M12.69 9.5H5.06a1.8 1.8 0 00-1.56 2A1.62 1.62 0 005.15 13h.29a1.38 1.38 0 00-1.34 1.39 1.43 1.43 0 001.31 1.42A1.42 1.42 0 006 18.35a1.44 1.44 0 00-.15 1 1.52 1.52 0 001.51 1.12h4.08a6.54 6.54 0 001.56-.2l2.56-.75h3.38c1.78-.07 2.26-8.26 0-8.26h-1c-.17 0-.27-.34-.71-.82-.65-.71-1.39-1.62-1.91-2.13a12.74 12.74 0 01-3-3.92C11.9 3.42 11.85 3 11 3a1.38 1.38 0 00-1.21 1.45c0 .25.13 1.12.18 1.43a10.62 10.62 0 001.76 3.62"
                      fill="#1485BD"
                    />
                    <path
                      d="M5.06 10a1.41 1.41 0 00-1.56 1.5A1.6 1.6 0 005.15 13h.29a1.38 1.38 0 00-1.34 1.41 1.43 1.43 0 001.31 1.42A1.42 1.42 0 006 18.37a1.44 1.44 0 00-.15 1 1.52 1.52 0 001.52 1.13h4.08a6.54 6.54 0 001.55-.21l2.56-.75h3.38c1.78-.07 2.26-8.26 0-8.26h-1c-.17 0-.27-.34-.71-.82-.65-.71-1.39-1.62-1.91-2.13a12.74 12.74 0 01-3-3.92C11.9 3.44 11.85 3 11 3a1.33 1.33 0 00-1.21 1.47c0 .25.13 1.12.18 1.43a15.65 15.65 0 001.76 4.1H5.06z"
                      stroke="#004B7C"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>{" "}
                Liked{" "}
              </span>
            </>
          ) : (
            <>
              <span className="d-flex align-items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  width="24"
                  height="24"
                  focusable="false"
                  className="mercado-match"
                  onClick={() => handleLike()}
                >
                  <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
                </svg>{" "}
                Like{" "}
              </span>
            </>
          )}
          <span className="ml-3">
            <CommentIcon onClick={() => handleComment()} /> Comment
          </span>
          {comments.comment &&
            <>
            {comments.comment.length > 0 ?
            <p className="noOfComments" onClick={() => handleShowComments(comments.comment._id)}>
              {comments.comment.length} comments
            </p> : <></>
            }</>
          }
          {toggleComment ? 
            <>
            <Comment postId={post._id} image={loggedInUser.image} fetchPosts={fetchAllPosts} fetchComments={fetchAllComments}/>
            </>
            : 
            <></>
          }
          {
            showComments ? 
              comments.comment.map(comment => 
                  <DisplayComment text={comment.text} image={comment} fetchPosts={fetchAllPosts} fetchComments={fetchAllComments}/>
                ) : <></>
          }
        </Row>
      </Row>
    </>
  );
}

export default Post;
