import React, { useEffect, useState, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  fetchUser,
  fetchAllUsers,
  fetchExperiences,
  toBase64,
  postUserImage,
} from "../utils";
import ProfileDetailsCard from "../Components/ProfileDetailsCard";
import "../Styles/Profile.css";
import AboutCard from "../Components/AboutCard";
import ELearning from "../Components/ELearning";
import PeopleSideCards from "../Components/PeopleSideCards";
import ExperienceEducation from "../Components/ExperienceEducation";
import Promoted from "../Components/Promoted";
import ProfileTopBar from "../Components/ProfileTopBar";
import ExperienceModal from "../Components/ExperienceModal";
import EducationModal from "../Components/EducationModal";
import SkillModal from "../Components/SkillModal";
import PostFeedModal from "../Components/PostFeedModal";
import Dashboard from "../Components/Dashboard";
import Activitycard from "../Components/Activity";
import AppContext from "../Context/app-context";
import { getCurrentProfile, uploadProfilePicture } from "../Lib/fetches/users";
import EditProfileModal from "../Components/EditProfileModal";

const Profile = ({ match }) => {
  const [state, setState] = useState({
    user: {},
    users: [],
    experiences: [],
    showExpModal: false,
    shoEduModal: false,
    selectedExprience: {},
    selectedEducation: {},
    selectedSkill:{}
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [imageUpdate, setImageUpdate] = useState(false);
  const [currentUserPage, setCurrentUserPage] = useState("");

  // const [selectedExprience, setSelectedExprience] = useState({})

  const { appState, updateCurrentUser } = useContext(AppContext);
  //called when components receive a new prop (for example a new user id)
  useEffect(() => {
    setUpUser();
  }, [match.params.user, showProfileModal]);

  //called once when component mounts
  useEffect(() => {
    setUpUser();
    handleScroll();
    //console.log(appState.currentUser.currentUser);
  }, []);

  useEffect(() => {
    updateUser();
    console.log("update");
  }, [state.showEduModal, state.showExpModal, state.showSkillModal, imageUpdate]);

  //function to set up the userand experiences when component load or when routing to new user
  const setUpUser = async () => {
    let param = match.params.user;
    // use later: param = param.split(".");
    try {
      const users = await fetchAllUsers();
      if (param === "me") {
        await updateCurrentUser();
        await setCurrentUserPage(param);
        setState({ ...state, user: appState.currentUser.currentUser });
        console.log("currentUser", currentUserPage);
      } else {
        const user = await getCurrentProfile(param);
        setCurrentUserPage(param);
        console.log("currentUser", param);
        {
          setState({ ...state, user: user.user });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async () => {
    await updateCurrentUser();
    setState({ ...state, user: appState.currentUser.currentUser });
  };

  //function to toggle the experience modal
  const handleExpModalToggle = async (experience = "") => {
    await updateCurrentUser();
    await setUpUser();
    setState({
      ...state,
      showExpModal: !state.showExpModal,
      selectedExprience: experience,
    });
  };

  //function to toggle the education modal
  const handleEduModalToggle = async (education = "") => {
    await updateUser();
    console.log("updated");
    setState({
      ...state,
      showEduModal: !state.showEduModal,
      selectedEducation: education,
    });
  };

  //function to toggle the skill modal
  const handleSkillModalToggle = async (skill = "") => {
    await updateUser();
    console.log("updated");
    setState({
      ...state,
      showSkillModal: !state.showSkillModal,
      selectedSkill: skill,
    });
  };

  //function to toggle the edit profile modal
  const toggleProfileModal = async () => {
    await setUpUser();
    setShowProfileModal(!showProfileModal);
  };

  //function to make the top bar appear when scrolling
  const handleScroll = () => {
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        let currentScrollPos = window.pageYOffset;
        let maxScroll = document.body.scrollHeight - window.innerHeight;
        let topbar = document.querySelector(".profileTopBar");
        if (typeof topbar !== "null") {
          if (currentScrollPos > 350 && currentScrollPos <= maxScroll) {
            topbar?.classList.add("d-lg-flex");
            // topbar?.classList.remove("d-md-none");
          } else {
            // topbar?.classList.add("d-md-none");
            topbar?.classList.remove("d-lg-flex");
          }
        }
      };
    }
  };
  function confirmDialog(msg) {
    return new Promise(function (resolve, reject) {
      let confirmed = window.confirm(msg);

      return confirmed ? resolve(true) : reject(false);
    });
  }

  const handleChangeImage = async (e) => {
    await updateCurrentUser();
    await setUpUser();
    setImageUpdate(!imageUpdate);
    const confirm = await confirmDialog(
      "Are you sure you want to submit change your profile Image?"
    );
    if (confirm) {
      const imageSent = await uploadProfilePicture(e.target.files[0]);
    }
    await updateUser();
  };

  const {
    user,
    users,
    showTopBar,
    showEduModal,
    showExpModal,
    showSkillModal,
    experiences,
    selectedExprience,
    selectedEducation,
    selectedSkill,
    education,
    skills,
  } = state;

  return (
    <Container className="profile">
      <ProfileTopBar show={showTopBar} user={user} />
      <Row>
        <Col md={8}>
          <ProfileDetailsCard
            user={user}
            users={users}
            currentUserPage={currentUserPage}
            handleChangeImage={handleChangeImage}
            toggleProfileModal={toggleProfileModal}
            setUpUser={setState}
            
          />

          <AboutCard bio={user?.bio} />
          <Dashboard />
          <Activitycard />
          <ExperienceEducation
            toggleExpModal={handleExpModalToggle}
            toggleEduModal={handleEduModalToggle}
            toggleSkillModal={handleSkillModalToggle}
            experiences={user?.experiences}
            education={user?.education}
            skills={user?.skills}
            user={user}

          />
          <ELearning />
        </Col>
        <Col md={4}>
          <PeopleSideCards following={user?.following} />
          <Promoted />
        </Col>
      </Row>
      {match.params.user == "me" && (
        <>
          <ExperienceModal
            toggleExpModal={handleExpModalToggle}
            showModal={showExpModal}
            userId={user?._id}
            selectedExprience={selectedExprience}
          />
          <EducationModal
            toggleEduModal={handleEduModalToggle}
            userId={user?._id}
            showModal={showEduModal}
            selectedEducation={selectedEducation}
          />
          <SkillModal
            toggleSkillModal={handleSkillModalToggle}
            userId={user?._id}
            showModal={showSkillModal}
            selectedSkill={selectedSkill}
          />
          <EditProfileModal
            toggleProfileModal={toggleProfileModal}
            showProfileModal={showProfileModal}
            user={user}
          />
        </>
      )}
    </Container>
  );
};
export default Profile;
