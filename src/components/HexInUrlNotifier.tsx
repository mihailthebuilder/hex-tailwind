import { hexCodeInUrlStore } from "../hexCodeInUrlStore";

export default function HexCodeInUrlNotifier() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const hexCodeInUrl = params["hex"];

  if (hexCodeInUrl) {
    hexCodeInUrlStore.set(hexCodeInUrl);
  }

  return <></>;
}
