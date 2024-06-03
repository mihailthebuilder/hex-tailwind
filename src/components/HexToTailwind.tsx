import { useEffect, useState } from "react";
import { closestTailwindToHex } from "../utils/colors";
import Copy from "./Copy";
import ClipboardIcon from "./ClipboardIcon";

import { useStore } from "@nanostores/react";
import { hexCodeInUrlStore } from "../hexCodeInUrlStore";

const HexToTailwind = ({ url }: { url: string }) => {
  const [hexInput, setHexInput] = useState("3e3e66");

  const $hexCodeInUrlStore = useStore(hexCodeInUrlStore);

  useEffect(() => {
    if ($hexCodeInUrlStore.length > 0) {
      const newHexInput = $hexCodeInUrlStore.toLowerCase();
      setHexInput(newHexInput);
    }
  }, [$hexCodeInUrlStore]);

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
      } catch (err) {
        console.error("Failed to copy text to clipboard:", err);
      }
    };
  };

  const urlToCopy = `${url}?hex=${hexInput}`;

  return (
    <section className="text-[1.25rem]">
      <div className="grid grid-cols-2 gap-y-2">
        <label className="font-bold" htmlFor="hexcode">
          Input HEX code:
        </label>
        <p className="font-bold">Tailwind color:</p>

        <input
          id="hexcode"
          type="text"
          className="border border-black uppercase w-40 block rounded focus:ring-cyan-800 p-2"
          value={`#${hexInput}`}
          onChange={handleHexInputChange}
        />

        <div className="flex flex-col align-middle justify-center">
          <span>
            {closestTailwind ? (
              <>
                <div className="flex mb-2">
                  <div className="mr-1">{closestTailwind.tailwind}</div>
                  <Copy
                    onClick={createCopyToClipboardFunction(
                      closestTailwind.tailwind
                    )}
                  >
                    <ClipboardIcon />
                  </Copy>
                </div>
                <div className="flex flex-row align-middle">
                  <div className="mr-1">
                    #{closestTailwind.hex.toUpperCase()}
                  </div>
                  <Copy
                    onClick={createCopyToClipboardFunction(
                      "#" + closestTailwind.hex.toUpperCase()
                    )}
                  >
                    <ClipboardIcon />
                  </Copy>
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

        <div className="col-span-2 text-[1.15rem] md:text-[1.25rem]">
          Difference visible to the human eye?{" "}
          {closestTailwind
            ? ColorDifferenceResult(closestTailwind.diff)
            : "..."}
        </div>
        <div className="col-span-2 text-[1.15rem] md:text-[1.25rem]">
          <Copy onClick={createCopyToClipboardFunction(urlToCopy)}>
            <span className="underline">Copy Link</span>
          </Copy>
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
