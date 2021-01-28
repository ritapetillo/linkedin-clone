import React, { useEffect, useState, useContext } from "react";
import { Container, Col, Row, Button, Spinner } from "react-bootstrap";
import withUser from "../Components/withUser";
import "../Styles/Feeds.css";
import { fetchPosts } from "../utils";
import FeedsProfileCard from "../Components/FeedsProfileCard";
import ProfileDetailsCard from "../Components/ProfileDetailsCard";
import Post from "../Components/Post";
import ExperienceModal from "../Components/ExperienceModal";
import PostFeedModal from "../Components/PostFeedModal";
import Postbox from "../Components/Postbox";
import LinkedNews from "../Components/LinkedNews";
import AddFeed from "../Components/AddFeed";
import NewPostButton from "../Components/NewPostButton";
import { getAllPosts } from "../Lib/fetches/posts";
import AppContext from "../Context/app-context";

const Feeds = (props, { currentUser }) => {
  const [state, setState] = useState({
    user: "",
    allUsers: [],
    posts: [],
    showModal: false,
    selectedPost: "",
    loading: true,
    error: false,
  });
  const [showModal,setShowModal] = useState(false)
  const { appState } = useContext(AppContext);

  useEffect(() => {
    setState({ ...state, user: appState.currentUser.currentUser });
    fetchAllPosts();
  }, []);

  useEffect(() => {
    setState({ ...state, user: currentUser });
    setState({ allUsers: props.allUsers });
    console.log(state);
  }, [currentUser, props.allUsers]);

  const fetchAllPosts = async () => {
    const posts = await getAllPosts();
    setState({ ...state, posts: posts.post });
    // setTimeout(() => {
    //   setState({
    //     loading: false,
    //   });
    // }, 750);
  };

  const handleModalToggle = async (selectedPost = "") => {
    setState({
      ...state,
      selectedPost,
    });
   setShowModal(!showModal)
    if (!showModal) {
      fetchAllPosts();
      setState({ selectedPost });
    }
  };

  const handleMoveTop = async () => {
    await fetchAllPosts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { user, allUsers, posts, selectedPost, loading } = state;

  return (
    <Container className="feeds">
      <Row>
        <Col lg={2} className="position-relative">
          <div className="feeds__top-stick">
            {/* here goes the profile card - Rita - */}
            <FeedsProfileCard user={user} users={allUsers} />{" "}
          </div>
        </Col>
        <Col className="feeds__middle-column" lg={7}>
          {" "}
          {/* here goes all feeds + create new feed - */}
          <Postbox
            toggleModal={handleModalToggle}
            user={user}
            users={allUsers}
          />
          <NewPostButton scrollUp={handleMoveTop} />
          {/* {loading ? (
            <>
              <Container>
                <Row className="mt-5"></Row>
                <Row className="mt-5"></Row>
                <Row className="mt-5"></Row> <Row className="mt-5"></Row>{" "}
                <Row className="mt-5">
                  <Col md={{ span: 4, offset: 5 }}>
                    <Spinner animation="border" variant="primary" />
                  </Col>
                </Row>{" "}
              </Container>{" "}
            </>
          ) : ( */}
          {posts?.map((post) => (
            <>
              <Post
                post={post}
                currentUser={`${user?.name} ${user?.lastName}`}
                toggleModal={handleModalToggle}
                // userId={user?._id}
                loading={loading}
              />
            </>
          ))}
          {/* ) */}
        </Col>
        <Col lg={3} className="position-relative">
          <div className="feeds__top-stick">
            <LinkedNews />
            <AddFeed />
          </div>
        </Col>
      </Row>
      <PostFeedModal
        showModal={showModal}
        toggleModal={handleModalToggle}
        selectedPost={selectedPost}
        user={user}
        users={allUsers}
      />
    </Container>
  );
};

export default Feeds;