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
      "https://basic-forms.app.taralys.com/submit/ecd3daad1459d31dae71afee1168b50fde7f92f23822156f069d35f7c4b52301ee739b33fecd8b4a726a76b48d4b272ec5d40008a2b7bef9b86f1304aa3245b5",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
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
