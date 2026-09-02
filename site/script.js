const RAM = {
  xUrl: "",
  contractAddress: "",
};

const xLink = document.querySelector("#x-link");
const caButton = document.querySelector("#ca-button");
const status = document.querySelector("#status");
const room = document.querySelector(".room");
const portrait = document.querySelector(".portrait");
const frameStage = document.querySelector("#frame-stage");
const frame = document.querySelector("#frame");
const portraitButton = document.querySelector("#portrait-button");
const plaque = document.querySelector("#plaque");
const dust = document.querySelector("#dust");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

for (let index = 0; index < 18; index += 1) {
  const mote = document.createElement("span");
  mote.style.setProperty("--x", `${(index * 37) % 101}%`);
  mote.style.setProperty("--y", `${(index * 61) % 97}%`);
  mote.style.setProperty("--size", `${2 + (index % 4)}px`);
  mote.style.setProperty("--delay", `${-(index * 1.7)}s`);
  mote.style.setProperty("--speed", `${12 + (index % 7) * 2}s`);
  dust.append(mote);
}

portrait.addEventListener("pointermove", (event) => {
  if (reducedMotion.matches || event.pointerType === "touch") return;
  const bounds = portrait.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  frameStage.style.setProperty("--tilt-x", `${y * -3.5}deg`);
  frameStage.style.setProperty("--tilt-y", `${x * 4.5}deg`);
  room.style.setProperty("--light-x", `${x * 22}px`);
  room.style.setProperty("--light-y", `${y * 14}px`);
});

portrait.addEventListener("pointerleave", () => {
  frameStage.style.removeProperty("--tilt-x");
  frameStage.style.removeProperty("--tilt-y");
  room.style.removeProperty("--light-x");
  room.style.removeProperty("--light-y");
});

portraitButton.addEventListener("click", () => {
  frame.classList.remove("rammed");
  plaque.classList.remove("knocked");
  void frame.offsetWidth;
  frame.classList.add("rammed");
  plaque.classList.add("knocked");

  window.setTimeout(() => {
    frame.classList.remove("rammed");
    plaque.classList.remove("knocked");
  }, 1200);
});

if (RAM.xUrl) {
  xLink.href = RAM.xUrl;
  xLink.target = "_blank";
  xLink.rel = "noreferrer";
  xLink.removeAttribute("aria-disabled");
}

xLink.addEventListener("click", (event) => {
  if (!RAM.xUrl) {
    event.preventDefault();
    status.textContent = "X coming soon";
  }
});

caButton.addEventListener("click", async () => {
  if (!RAM.contractAddress) {
    status.textContent = "CA coming soon";
    return;
  }

  try {
    await navigator.clipboard.writeText(RAM.contractAddress);
    status.textContent = "CA copied";
  } catch {
    status.textContent = RAM.contractAddress;
  }
});
