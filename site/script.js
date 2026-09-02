const RAM = { xUrl: "", contractAddress: "" };
const xLink = document.querySelector("#x-link");
const caButton = document.querySelector("#ca-button");
const status = document.querySelector("#status");
const ramScene = document.querySelector("#ram-scene");
let statusTimer;

const showStatus = (message) => {
  window.clearTimeout(statusTimer);
  status.textContent = message;
  statusTimer = window.setTimeout(() => { status.textContent = ""; }, 2200);
};

ramScene.addEventListener("click", () => {
  ramScene.classList.remove("is-baa");
  void ramScene.offsetWidth;
  ramScene.classList.add("is-baa");
  window.setTimeout(() => ramScene.classList.remove("is-baa"), 780);
});

if (RAM.xUrl) {
  xLink.href = RAM.xUrl;
  xLink.target = "_blank";
  xLink.rel = "noreferrer";
  xLink.removeAttribute("aria-disabled");
}
xLink.addEventListener("click", (event) => {
  if (!RAM.xUrl) { event.preventDefault(); showStatus("X COMING SOON"); }
});
caButton.addEventListener("click", async () => {
  if (!RAM.contractAddress) { showStatus("CA COMING SOON"); return; }
  try { await navigator.clipboard.writeText(RAM.contractAddress); showStatus("CA COPIED"); }
  catch { showStatus(RAM.contractAddress); }
});
