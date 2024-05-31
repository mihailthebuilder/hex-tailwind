import { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<Error>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    fetch(
      "https://basic-forms.app.taralys.com/submit/36bf1586c1cca797d7e9c4e4237192ead9970dbb4bb797477598a83129e95e6b97a98d8c0466d7f9d81552bfbae90b013148811381492ce7f105e8fa5904d1bb",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: feedback,
      }
    )
      .then((response) => {
        if (response.status != 202) {
          throw Error(
            `Expected response status 202, got ${response.status}: ${response.statusText}`
          );
        }
      })
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
          (isLoading ? "bg-gray-600" : "bg-blue-800 hover:bg-blue-950") +
          ` text-white font-semibold py-2 px-10 rounded w-full md:w-40`
        }
        disabled={isLoading}
      >
        {isLoading ? "..." : "Submit"}
      </button>
    </form>
  );
};

export default FeedbackForm;
