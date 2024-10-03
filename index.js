console.log("hi");

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// alert(rgbToHex(0, 51, 255)); // #0033ff

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// alert(hexToRgb("#0033ff").g); // "51";

function hexToRgb(hex) {
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r, g, b];
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

function averageHexColors(hex1, hex2) {
  let rgb1 = hexToRgb(hex1);
  let rgb2 = hexToRgb(hex2);
  let avgR = Math.round((rgb1[0] + rgb2[0]) / 2);
  let avgG = Math.round((rgb1[1] + rgb2[1]) / 2);
  let avgB = Math.round((rgb1[2] + rgb2[2]) / 2);
  return rgbToHex(avgR, avgG, avgB);
}

// Example usage:
let color1 = "#FF5733";
let color2 = "#33FF57";
let averageColor = averageHexColors(color1, color2);
console.log(averageColor); // Output: #996645

let moon,
  tmux = {};
moon = {
  _nc: "#000001",
  base: "#232324",
  surface: "#151114",
  overlay: "#1b161a",
  muted: "#524841",
  subtle: "#6c6153",
  text: "#c3ae89",
  love: "#b14c47",
  gold: "#b68269",
  rose: "#b3705a",
  pine: "#426749",
  foam: "#75906b",
  iris: "#937372",
  leaf: "#95b1ac",
  highlight_low: "#161414",
  highlight_med: "#ccbaaa",
  highlight_high: "#3c3531",
  none: "NONE",
};
tmux = {
  _nc: "#16141f",
  base: "#232324",
  surface: "#151114",
  overlay: "#1b161a",
  muted: "#6e6a86",
  subtle: "#908caa",
  text: "#e0def4",
  love: "#eb6f92",
  gold: "#ffb188",
  rose: "#ebbcba",
  pine: "#608888",
  foam: "#9ccfd8",
  iris: "#c4a7e7",
  leaf: "#95b1ac",
  highlight_low: "#2c2c2c",
  highlight_med: "#403d52",
  highlight_high: "#524f67",
  none: "NONE",
};

const prime = Object.keys(moon).map((x) => [
  x,
  averageHexColors(moon[x], tmux[x]),
]);

console.log(JSON.stringify(Object.fromEntries(prime)));

let prim = {
  _nc: "#0B0A10",
  base: "#232324",
  surface: "#151114",
  overlay: "#1B161A",
  muted: "#605964",
  subtle: "#7E777F",
  text: "#D2C6BF",
  love: "#CE5E6D",
  gold: "#DB9A79",
  rose: "#CF968A",
  pine: "#517869",
  foam: "#89B0A2",
  iris: "#AC8DAD",
  leaf: "#95B1AC",
  highlight_low: "#212020",
  highlight_med: "#867C7E",
  highlight_high: "#47424C",
  none: "#000000",
};
