import { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setSubmitted(true);
  };

  if (submitted) {
    return <p className="text-green-700 font-bold">Submitted!</p>;
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <textarea
        rows={3}
        className="border border-black block rounded focus:ring-cyan-800 p-2 w-full"
        value={feedback}
        onChange={(event) => {
          setFeedback(event.target.value);
        }}
        required
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-10 rounded"
        disabled={isLoading}
      >
        {isLoading ? "..." : "Submit"}
      </button>
    </form>
  );
};

export default FeedbackForm;
