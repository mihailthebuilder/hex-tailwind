import { useState } from "react";
import { closestTailwindToHex } from "../utils/colors";

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
          <HexColor hex={hexInput} />
          <TailwindColor hex={hexInput} />
        </>
      )}
    </>
  );
};

const isValidHex: (input: string) => boolean = (input) => {
  let regex = new RegExp(/^([a-f0-9]{6}|[a-f0-9]{3})$/);
  return regex.test(input);
};

const HexColor = ({ hex }: { hex: string }) => {
  return (
    <>
      <p>Input color</p>
      <div className="h-10 w-10" style={{ backgroundColor: `#${hex}` }}></div>
    </>
  );
};

const TailwindColor = ({ hex }: { hex: string }) => {
  const closestTailwind = closestTailwindToHex(hex);

  return (
    <>
      <p>
        Tailwind color - {closestTailwind.tailwind}, {closestTailwind.hex},
        {closestTailwind.diff}
      </p>
      <div className={`h-10 w-10 bg-${closestTailwind.tailwind}`}></div>
    </>
  );
};

export default HexToTailwind;
