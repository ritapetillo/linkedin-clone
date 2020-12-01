import './App.css';
import Promoted from './Components/Promoted';
import "bootstrap/dist/css/bootstrap.min.css";

import PeopleSideCards from "./Components/PeopleSideCards"

import ExperienceEducation from "./Components/ExperienceEducation"

import Profile from './Components/Profile';
import NavBar from "./Components/Navbar";


function App() {
  return (
    <div className="App">

       <Promoted/>


      <PeopleSideCards/>


      <ExperienceEducation/>

      <Profile/>
      <NavBar />


    </div>
  );
}

export default App;
