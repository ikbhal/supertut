import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/singleteacher.css";
import { FaStar } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";

const SingleTeacher = () => {
  const params = useParams();
  const [page, setPage] = useState({});
  const fetchData = async () => {
    const getData = await fetch(
      `https://supertut.rontohub.com/api/v3/teachers/${params.id}`
    );
    const data = await getData.json();
    setPage(data);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, [params.id]);

  return (
    <div className="container-main">
          <div className="container">
            <div className="left-content">
              <h1>{page.title}</h1>
              <h3>About {page.name}</h3>
              <p>{page.about}</p>
              <h3>About the lession</h3>
              <p>{page.aboutLesson}</p>
              <div className="review-content">
                <h3>Review</h3>
                <div className="review-card">
                  <h4>reviewiers Name</h4>
                  <p>
                    You’ve not only been my teacher this year, but also a
                    mentor, a confidant, and a friend. Thank you for being there
                    with me when I needed it most
                  </p>
                </div>
              </div>
              <div className="rates-div">
                <h3>Rates</h3>
                <div className="rate-card">
                  <ul>
                    <li>Hourly Fee</li>
                    <li>&#8377;{page.hourlyFee} </li>
                  </ul>
                  <ul>
                    <li>Pack Prices</li>
                    <li>5h: &#8377;{5*page.hourlyFee}</li>
                    <li>10h: &#8377;{10*page.hourlyFee}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="teacher-details">
                <div className="img-details">
                  <img src={page.photo} alt="" />
                </div>
                <h3>{page.name}</h3>
                <div className="review-div">
                  <FaStar className="star" />
                  <p>(61 Reviews)</p>
                </div>
              </div>
              <div className="package-details">
                <ul>
                  <li>
                    <span>Hourly Fee</span>
                    <span> &#8377;{page.hourlyFee}</span>
                  </li>
                </ul>
                <ul>
                  <li>Number of Students</li>
                  <li>50+</li>
                </ul>
                <button>
                  {" "}
                  <FaRegMessage /> Reserve a class
                </button>
              </div>
            </div>
          </div>
    </div>
  );
};

export default SingleTeacher;
