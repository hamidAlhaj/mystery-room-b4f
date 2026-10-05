import React, { useState } from "react";
import "./MageSplash.css";

export default function MageSplash() {
  const [visible, setVisible] = useState(() => {
    return sessionStorage.getItem("mageSplashSeen") !== "true";
  });
  const [fading, setFading] = useState(false);

  function handleEnter() {
    if (fading) return;
    setFading(true);
    sessionStorage.setItem("mageSplashSeen", "true");
    setTimeout(() => {
      setVisible(false);
    }, 800);
  }

  if (!visible) return null;

  const h = React.createElement;

  return h(
    "div",
    { className: `mage-splash-overlay ${fading ? "fade-out" : ""}` },
    h(
      "div",
      { className: "mage-scene" },
      h("div", { className: "rune-ring" }),
      h("div", { className: "rune-ring-inner" }),
      h(
        "svg",
        {
          className: "mage-svg",
          viewBox: "0 0 160 160",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
        },
        // Wizard Hat (Centered at X = 80, Royal Purple)
        h("path", {
          d: "M42 62 L80 12 L118 62 Z",
          fill: "#3b0764",
          stroke: "#c084fc",
          strokeWidth: "3",
          strokeLinejoin: "round",
        }),
        h("ellipse", {
          cx: "80",
          cy: "62",
          rx: "50",
          ry: "10",
          fill: "#581c87",
          stroke: "#c084fc",
          strokeWidth: "2.5",
        }),
        // Glowing Golden Eyes
        h("circle", { cx: "70", cy: "76", r: "3.5", fill: "#fbbf24" }),
        h("circle", { cx: "90", cy: "76", r: "3.5", fill: "#fbbf24" }),
        // Wizard Cloak (Deep Violet)
        h("path", {
          d: "M53 86 Q80 100 107 86 L122 145 L38 145 Z",
          fill: "#2e1065",
          stroke: "#a855f7",
          strokeWidth: "2.5",
          strokeLinejoin: "round",
        }),
        // Wizard Staff + Glowing Orb
        h(
          "g",
          { className: "staff-group" },
          h("line", {
            x1: "130",
            y1: "44",
            x2: "116",
            y2: "146",
            stroke: "#fcd34d",
            strokeWidth: "4",
            strokeLinecap: "round",
          }),
          h("circle", {
            className: "staff-orb",
            cx: "130",
            cy: "38",
            r: "9.5",
            fill: "#fbbf24",
          })
        )
      )
    ),
    h("p", { className: "mage-splash-eyebrow" }, "The Elemental Trial Awaits"),
    h(
      "h1",
      { className: "mage-splash-title" },
      "The Grand Archmage ",
      h("em", null, "Summons You")
    ),
    h(
      "p",
      { className: "mage-splash-subtitle" },
      "Beyond this seal lie the chambers of Wind, Ocean, Earth, Fire, Shadow, and Time. Only a sharp mind may pass."
    ),
    h(
      "button",
      {
        type: "button",
        className: "enter-realm-btn",
        onClick: handleEnter,
      },
      "Enter the Realm ✦"
    )
  );
}