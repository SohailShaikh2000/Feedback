import React, { useEffect } from "react";
import Card from "./shared/Card";
import { useState } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import PropTypes from 'prop-types'
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";



function FeedbackForm() {
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(10)
  
  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    if(text === "") {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true)
      setMessage('Text must be at least 10 characters')
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }

    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text.trim().length > 10) {
      const newFeedback ={
        text,
        rating

      }

      if(feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback) 
      } else {
        addFeedback(newFeedback)
      } 

    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us ?</h2>
          <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a Review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            SEND
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}


FeedbackForm.propTypes = {
  isDisabled:PropTypes.bool
}

export default FeedbackForm;
