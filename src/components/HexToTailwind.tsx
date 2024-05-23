import { useState } from "react";
import { closestTailwindToHex } from "../utils/colors";

const HexToTailwind = () => {
  const [hexInput, setHexInput] = useState("");

  const closestTailwind = isValidHex(hexInput)
    ? closestTailwindToHex(hexInput)
    : undefined;

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
    <section>
      <div className="grid grid-cols-2 max-w-96 gap-y-2">
        <p>Input HEX code:</p>
        <p>Tailwind code (with HEX):</p>

        <input
          type="text"
          className="border uppercase w-40 block rounded shadow focus:ring-cyan-800 p-2"
          value={`#${hexInput}`}
          onChange={handleHexInputChange}
        />

        <div className="flex flex-col align-middle justify-center">
          <span>
            {closestTailwind
              ? `${closestTailwind.tailwind} / #${closestTailwind.hex}`
              : "..."}
          </span>
        </div>

        <div
          className="h-10 w-full"
          style={{ backgroundColor: "#" + hexInput }}
        ></div>
        <div
          className="h-10 w-full"
          style={{
            backgroundColor: closestTailwind
              ? "#" + closestTailwind.hex
              : "transparent",
          }}
        ></div>
      </div>
    </section>
  );
};

const isValidHex: (input: string) => boolean = (input) => {
  let regex = new RegExp(/^([a-f0-9]{6}|[a-f0-9]{3})$/);
  return regex.test(input);
};

export default HexToTailwind;
