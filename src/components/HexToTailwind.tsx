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
    <section className="flex flex-row justify-center">
      <div className="grid grid-cols-2 max-w-60">
        <div>
          <p>HEX code:</p>
          <input
            type="text"
            className="border uppercase w-20"
            value={`#${hexInput}`}
            onChange={handleHexInputChange}
          />
          <div
            className="h-10 w-full"
            style={{ backgroundColor: "#" + hexInput }}
          ></div>
        </div>

        {isValidHex(hexInput) && <TailwindColor hex={hexInput} />}
      </div>
    </section>
  );
};

const isValidHex: (input: string) => boolean = (input) => {
  let regex = new RegExp(/^([a-f0-9]{6}|[a-f0-9]{3})$/);
  return regex.test(input);
};

const TailwindColor = ({ hex }: { hex: string }) => {
  const closestTailwind = closestTailwindToHex(hex);

  return (
    <div>
      <p>Tailwind code:</p>
      <p>{closestTailwind.tailwind}</p>
      <div
        className="h-10 w-full"
        style={{ backgroundColor: "#" + closestTailwind.hex }}
      ></div>
    </div>
  );
};

export default HexToTailwind;
