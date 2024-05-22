import { useState } from "react";

const HexToTailwind = () => {
  const [hexInput, setHexInput] = useState("");

  return (
    <>
      <input
        type="text"
        className="border uppercase"
        value={hexInput}
        onChange={(event) => {
          setHexInput(event.target.value.toLowerCase());
        }}
      />

      <HexColor hexInput={hexInput} />
      <TailwindColor hexInput={hexInput} />
    </>
  );
};

const HexColor = ({ hexInput }: { hexInput: string }) => {
  return (
    <>
      <p>Input color</p>
      <div className={`h-10 w-10 bg-[#${hexInput}]`}></div>
    </>
  );
};

const TailwindColor = ({ hexInput }: { hexInput: string }) => {
  return (
    <>
      <p>Tailwind color</p>
      <div className="h-10 w-10 bg-transparent"></div>
    </>
  );
};

export default HexToTailwind;
