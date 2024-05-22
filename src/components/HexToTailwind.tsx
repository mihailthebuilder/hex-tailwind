import { useState } from "react";

const HexToTailwind = () => {
  const [hexInput, setHexInput] = useState("");

  const handleHexInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newInput = event.target.value.toLowerCase();

    if (newInput.length === 0) {
      setHexInput(newInput);
      return;
    }

    newInput = newInput.replaceAll("#", "");

    setHexInput(newInput);
  };

  return (
    <>
      <input
        type="text"
        className="border uppercase"
        value={`#${hexInput}`}
        onChange={handleHexInputChange}
      />

      {isValidHex(hexInput) && (
        <>
          <HexColor hexInput={hexInput} />
          <TailwindColor hexInput={hexInput} />
        </>
      )}
    </>
  );
};

const isValidHex: (input: string) => boolean = (input) => {
  let regex = new RegExp(/^([a-f0-9]{6}|[a-f0-9]{3})$/);
  return regex.test(input);
};

const HexColor = ({ hexInput }: { hexInput: string }) => {
  return (
    <>
      <p>Input color</p>
      <div
        className="h-10 w-10"
        style={{ backgroundColor: `#${hexInput}` }}
      ></div>
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
