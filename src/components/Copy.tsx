import { useState, type ReactNode } from "react";

const CopyIcon = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
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
        if (["Enter", "Space"].includes(event.key)) {
          handleCopy();
        }
      }}
      title="Click to copy to clipboard"
    >
      {children}
    </button>
  );
};
export default CopyIcon;
