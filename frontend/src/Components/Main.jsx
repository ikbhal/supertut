import React from "react";
import "../Styles/main.css";

const Main = () => {
  return (
    <div className="main-container">
      <div className="left-container">
        <h1>Learn with the best!</h1>
        <p>Teachers from Online</p>
      </div>
      <div className="right-container">
        <div>
          <img src="../src/Assets/prof-maths.jpg" alt="" />
        </div>
        <div>
          <img src="../src/Assets/prof-yoga.jpg" alt="" />
        </div>
        <div>
          <img src="../src/Assets/prof-singing.jpg" alt="" />
        </div>
        <div>
          <img src="../src/Assets/prof-hindi.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Main;
