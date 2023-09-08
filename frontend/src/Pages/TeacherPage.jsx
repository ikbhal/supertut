import { React, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "../Styles/teacherpage.css";
import { TEACHER_API } from "../Utils/constant";
import { Link } from "react-router-dom";

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
  const teacherData = teacher.map((item) => { return (
     <div className="teacher-card" key={item.id}>
        <Link to={`${item.id}`}>
          <div className="teacher-pic">
            <img src={item.photo} alt="teacher-pic" />
            <h3>{item.name}</h3>
          </div>
          <div className="teacher-data">
            <div className="review-div">
              
              {item.averageRating>=1 ?(

                <><FaStar className="star" /> 
                <p>{item.averageRating}</p>
                <p>
                  ({item.totalReviews} {item.totalReviews>1 ? <span>Reviews</span>  : <span>Review</span>})
                </p>
                </>
              ) :(
                  <p>No Reviews</p>
              )}
           
            </div>
            <p>{item.title}</p>
            <p className="rate-div"> &#8377;{item.hourlyFee}</p>
          </div>
        </Link>
      </div>
    );
  })

  return (
    <div className="teacher-continer">
      <h1>Teachers</h1>
      <button>Rate</button>
      <div className="card-continer">
        {teacherData
         }
      </div>
    </div>
  );
};

export default TeacherPage;
