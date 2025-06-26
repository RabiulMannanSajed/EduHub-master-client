// replaceOklchColors.js
export default function replaceOklchColors(el) {
  const elements = el.querySelectorAll("*");
  elements.forEach((child) => {
    const style = window.getComputedStyle(child);
    ["color", "backgroundColor", "borderColor", "boxShadow"].forEach((prop) => {
      const value = style.getPropertyValue(prop);
      if (value.includes("oklch")) {
        // Replace with a safe fallback, e.g. white or computed rgb
        child.style[prop] = "#ffffff"; // Or pick other safe colors or rgb values
      }
    });
  });
}
