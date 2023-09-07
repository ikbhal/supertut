import React, { useEffect, useState } from "react";
import "../Styles/main.css";
import ProcessCard from "../Components/ProcessCard";
import ProcessCardMiddle from "../Components/ProcessCardMiddle";
import { Link } from "react-router-dom";
const MainPage = () => {



  return (
    <div className="main-container">
      <div className="top-container">
        <div className="left-container">
          <h1>Get a Certified and Qualified Tutors from Online</h1>
          <Link to="teachers">
            <button className="find-tutor">Find a Tutor</button>
            </Link>
        </div>
        <div className="right-container">
          <div className="image-div">
            <img src="../src/Assets/prof-maths.jpg" alt="" />
          </div>
          <div className="image-div">
            <img src="../src/Assets/prof-yoga.jpg" alt="" />
          </div>
          <div className="image-div">
            <img src="../src/Assets/prof-singing.jpg" alt="" />
          </div>
          <div className="image-div">
            <img src="../src/Assets/prof-hindi.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="middle-container">
          <h2>Learning has never been this easy</h2>
        <div className="center-container">
          <div className="process-select">
          <ProcessCard heading={"1. Search"} para={" View the profiles freely and connect with your fantastic teacher according to your criteria (prices, recommendations,reviews, classes at home or online)"} imgSrc={"../src/Assets/1.mov"}/>
          <ProcessCardMiddle heading={"2. Contact"} para={" Teachers will get back to you within hours! And if you can't find the perfect teacher, our team is here to help."} imgSrc={"../src/Assets/2.mov"}/>
          <ProcessCard heading={"3. Organize"} para={"Freely schedule your classes with your teacher from the messaging platform."} imgSrc={"../src/Assets/3.mov"}/>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
