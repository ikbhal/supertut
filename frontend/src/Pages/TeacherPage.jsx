import { React, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "../Styles/teacherpage.css";
import { TEACHER_API } from "../Utils/constant";

const TeacherPage = () => {
  const [teacher, setTeacher] = useState([]);
  const getTeachers = async () => {
    const fetchData = await fetch(TEACHER_API);
    const data = await fetchData.json();
    setTeacher(data);
    console.log(data);
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <div className="teacher-continer">
      <h1>Teachers</h1>
      <button>Rate</button>
      <div className="card-continer">
        {teacher &&
          teacher.map((item,index) => {
            return (
              <div className="teacher-card" key={index}>
                <div className="teacher-pic">
                  <img src={item.photo} alt="teacher-pic" />
                  <h3>{item.name}</h3>
                </div>
                <div className="teacher-data">
                  <div className="review-div">
                    <FaStar className="star" />
                    <p>(61 Reviews)</p>
                  </div>
                  <p>{item.title}</p>
                  <p className="rate-div"> &#8377;{item.hourlyFee}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TeacherPage;
