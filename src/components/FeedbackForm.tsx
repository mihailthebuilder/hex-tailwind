import { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<Error>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    fetch("https://formsubmit.co/ajax/mihailthebuilder@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: "New HEX to Tailwind submission",
        message: { feedback },
      }),
    })
      .then((response) => response.json())
      .then(() => setSubmitted(true))
      .catch((error: Error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  if (submitted) {
    return <p className="text-green-700 font-bold">Submitted!</p>;
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <p className="text-red-700 font-semibold">
          Something went wrong, error message {error.message}. Please reach out
          to me{" "}
          <a className="underline" href="https://linkedin.com/in/mihailmarian">
            on LinkedIn
          </a>{" "}
          instead.
        </p>
      )}
      <textarea
        rows={3}
        className="border border-black block rounded focus:ring-cyan-800 p-2 w-full"
        value={feedback}
        onChange={(event) => {
          setFeedback(event.target.value);
        }}
        placeholder="Feed me feedback..."
        required
      ></textarea>
      <button
        type="submit"
        className={
          (isLoading ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-700") +
          ` text-white font-semibold py-2 px-10 rounded w-40`
        }
        disabled={isLoading}
      >
        {isLoading ? "..." : "Submit"}
      </button>
    </form>
  );
};

export default FeedbackForm;