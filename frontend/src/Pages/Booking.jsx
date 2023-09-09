import React from "react";
import "../Styles/booking.css";

const Booking = () => {
  return (
    <div className="booking-container">
      <div className="booking-content">
        <div className="booking-left">
          <h3>Prabhot</h3>
        </div>
        <div className="booking-right">
          <div className="booking-heading">
            <h2>Schedule</h2>
            <p>Your first class with Prabhjot</p>
          </div>
          <div className="message-content">
            <h3>Your message (optional)</h3>
            <form>
              <textarea
                name=""
                id=""
                cols="60"
                rows="6"
                value="Hello Prabhjot, My name is Kishore and I'm in search of a Hindi professor. I would like to take online classes. Ideally, I would like to start the classes at the earliest possible. Are you available? Could you contact me so we can discuss this further?Have a great day! Talk to you soon, Kishore"
              ></textarea>
            </form>
          </div>
          <div>
            <h3>Who is this lesson for?</h3>
            <div className="select-person">
                <input className="input" id="you" type="radio" name="radio" value="you" />
                <label className="label" htmlFor="you">You</label>
                <input className="input" id="others" type="radio" name="radio" value="someoneElse" />
                <label className="label" htmlFor="others">Someone Else</label>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
