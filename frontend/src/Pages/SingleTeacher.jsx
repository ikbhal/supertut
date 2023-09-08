import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/singleteacher.css";
import { FaStar } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
          <div className="review-container">
            <div className="flex-div">
              {page.reviews && page.reviews.length > 0 ? (
                <h3>Reviews</h3>
              ) : (
                <h3>No Reviews</h3>
              )}
              <div className="review-div flex-div">
                {page.averageRating >= 1 ? (
                  <>
                    <FaStar className="star" />
                    <p>{page.averageRating}</p>
                    <p>
                      ({page.totalReviews}{" "}
                      {page.totalReviews > 1 ? (
                        <span>Reviews</span>
                      ) : (
                        <span>Review</span>
                      )}
                      )
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {page.reviews &&
              page.reviews.map((review, id) => (
                <div className="review-content" key={review.id}>
                  <div className="flex-div">
                    <div className="flex-div">
                      <div className="first-letter">
                        <span>
                          {" "}
                          {review.reviewedBy.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <h4>{review.reviewedBy}</h4>{" "}
                    </div>
                    <span className="flex-div">
                      <FaStar className="star" /> {review.rating}
                    </span>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
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
                <li>5h: &#8377;{5 * page.hourlyFee}</li>
                <li>10h: &#8377;{10 * page.hourlyFee}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="right-content">
          <div className="teacher-details">
            <div className="img-details">
              <img src={page.photo} alt="" />
            </div>
            <h2>{page.name}</h2>
            <div className="review-div">
              {page.averageRating >= 1 ? (
                <>
                  <FaStar className="star" />
                  <p>{page.averageRating}</p>
                  <p>
                    ({page.totalReviews}{" "}
                    {page.totalReviews > 1 ? (
                      <span>Reviews</span>
                    ) : (
                      <span>Review</span>
                    )}
                    )
                  </p>
                </>
              ) : (
                <>No Reviews</>
              )}
            </div>
          </div>
          <div className="package-details">
            <ul>
              <li>Hourly Fee</li>
              <li>&#8377;{page.hourlyFee}</li>
            </ul>
            <ul>
              <li>Number of Students</li>
              <li>
                {page.totalStudents > 0 ? (
                  <p>{page.totalStudents}</p>
                ) : (
                  <p>0</p>
                )}
              </li>
            </ul>
            <Link to="booking">
              <button className="reserve-btn">
                {" "}
                <FaRegMessage className="fa-message" /> Reserve a class
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTeacher;
