import { useState } from "react";
import { closestTailwindToHex } from "../utils/colors";
import CopyIcon from "./CopyIcon";

const HexToTailwind = () => {
  const [hexInput, setHexInput] = useState("3e3e66");

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

  const createCopyToClipboardFunction = (
    text: string
  ): (() => Promise<void>) => {
    return async () => {
      try {
        await navigator.clipboard.writeText(text);
        console.log("Text copied to clipboard", text);
      } catch (err) {
        console.error("Failed to copy text to clipboard:", err);
      }
    };
  };

  return (
    <section>
      <div className="grid grid-cols-2 gap-y-2">
        <p className="font-bold">Input HEX code:</p>
        <p className="font-bold">Tailwind code:</p>

        <input
          type="text"
          className="border uppercase w-40 block rounded shadow focus:ring-cyan-800 p-2"
          value={`#${hexInput}`}
          onChange={handleHexInputChange}
        />

        <div className="flex flex-col align-middle justify-center">
          <span>
            {closestTailwind ? (
              <>
                <div className="flex mb-2">
                  <div className="mr-1">{closestTailwind.tailwind}</div>
                  <CopyIcon
                    onClick={createCopyToClipboardFunction(
                      closestTailwind.tailwind
                    )}
                  />
                </div>
                <div className="flex flex-row align-middle">
                  <div className="mr-1">
                    #{closestTailwind.hex.toUpperCase()}
                  </div>
                  <CopyIcon
                    onClick={createCopyToClipboardFunction(
                      "#" + closestTailwind.hex.toUpperCase()
                    )}
                  />
                </div>
              </>
            ) : (
              "..."
            )}
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

        <div className="col-span-2">
          Difference perceptible to the human eye?{" "}
          {closestTailwind
            ? ColorDifferenceResult(closestTailwind.diff)
            : "..."}
        </div>
      </div>
    </section>
  );
};

const isValidHex: (input: string) => boolean = (input) => {
  let regex = new RegExp(/^([a-f0-9]{6}|[a-f0-9]{3})$/);
  return regex.test(input);
};

const ColorDifferenceResult = (diff: number) => {
  return <span className="font-bold">{diff > 1 ? "Yes" : "No"}</span>;
};

export default HexToTailwind;
