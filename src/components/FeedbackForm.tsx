import { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [loading, isLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <form>
      <input type="text"></input>
      <button type="submit"></button>
    </form>
  );
};

export default FeedbackForm;
