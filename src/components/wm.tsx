"use client";

import React, { useEffect, useRef } from "react";

const Wm = () => {
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const watermark = watermarkRef.current;
    if (!watermark) return;

    const originalHTML = watermark.innerHTML;
    const originalStyle = watermark.getAttribute("style");

    const protectWatermark = () => {
      if (watermark.innerHTML !== originalHTML) {
        watermark.innerHTML = originalHTML;
      }
      if (watermark.getAttribute("style") !== originalStyle) {
        watermark.setAttribute("style", originalStyle || "");
      }
    };

    // MutationObserver to detect changes
    const observer = new MutationObserver(protectWatermark);
    observer.observe(watermark, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });

    // Periodic check
    const intervalId = setInterval(protectWatermark, 1000);

    // Cleanup
    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  const watermarkStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    top: "50%",
    left: "55%",
    transform: "translate(-50%, -50%) scale(1.5) rotate(-45deg)",
    userSelect: "none",
    pointerEvents: "none",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "max-content",
    scale: 1.5,
    opacity: 0.8,
  };

  return (
    <div ref={watermarkRef} style={watermarkStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: "1.25rem", marginLeft: "0.5rem" }}>
          ©Xfhreall -ini wm
        </h1>
      </div>
    </div>
  );
};

export default Wm;
