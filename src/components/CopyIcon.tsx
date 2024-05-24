import { useState } from "react";

const CopyIcon = ({ onClick }: { onClick: () => void }) => {
  const [notifyCopied, setNotifyCopied] = useState(false);

  if (notifyCopied) {
    setTimeout(() => {
      setNotifyCopied(false);
    }, 1000);
    return <span className="text-green-600 font-semibold">Copied!</span>;
  }

  const handleCopy = () => {
    onClick();
    setNotifyCopied(true);
  };

  return (
    <button
      onClick={handleCopy}
      onKeyDown={(event) => {
        console.log(event.key);
        if (["Enter", "Space"].includes(event.key)) {
          handleCopy();
        }
      }}
    >
      <svg
        className="cursor-pointer mt-[1.5px]"
        width="20px"
        height="20px"
        viewBox="0 0 21 21"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          fillRule="evenodd"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(4 3)"
        >
          <path d="m6.5 11.5-3-3 3-3" />

          <path d="m3.5 8.5h11" />

          <path d="m12.5 6.5v-4.00491374c0-.51283735-.3860402-.93550867-.8833789-.99327378l-.1190802-.00672622-1.9975409.00491374m-6 0-1.99754087-.00492752c-.51283429-.00124584-.93645365.38375378-.99544161.88094891l-.00701752.11906329v10.99753792c.00061497.5520447.44795562.9996604 1 1.0006148l10 .0061554c.5128356.0008784.9357441-.3848611.993815-.8821612l.006185-.1172316v-2.5" />

          <path d="m4.5.5h4c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-4c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z" />
        </g>
      </svg>
    </button>
  );
};
export default CopyIcon;
