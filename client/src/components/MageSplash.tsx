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
        // Wizard Hat
        h("path", {
          d: "M35 62 L80 12 L115 62 Z",
          fill: "#1f1610",
          stroke: "#d99b43",
          strokeWidth: "3",
        }),
        h("ellipse", {
          cx: "75",
          cy: "62",
          rx: "52",
          ry: "10",
          fill: "#2c1e14",
          stroke: "#d99b43",
          strokeWidth: "2.5",
        }),
        // Glowing Eyes
        h("circle", { cx: "65", cy: "76", r: "3.5", fill: "#fbbf24" }),
        h("circle", { cx: "85", cy: "76", r: "3.5", fill: "#fbbf24" }),
        // Wizard Cloak
        h("path", {
          d: "M48 86 Q75 100 102 86 L118 145 L32 145 Z",
          fill: "#17110c",
          stroke: "#b8863b",
          strokeWidth: "2.5",
        }),
        // Wizard Staff + Glowing Orb
        h(
          "g",
          { className: "staff-group" },
          h("line", {
            x1: "125",
            y1: "45",
            x2: "110",
            y2: "148",
            stroke: "#fcd34d",
            strokeWidth: "4",
            strokeLinecap: "round",
          }),
          h("circle", {
            className: "staff-orb",
            cx: "125",
            cy: "38",
            r: "10",
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