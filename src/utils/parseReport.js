export default function parseReport(text) {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l);

  const data = [];

  const mainRegex = /([\w\s\-\/\(\)]+?)\s+(\d+\.?\d*)\s*([a-zA-Z/%]*)/;
  const rangeRegex = /([<>]?\d+\.?\d*[-–]\d+\.?\d*|<\d+\.?\d*)$/;

  lines.forEach((line) => {
    const mainMatch = line.match(mainRegex);
    const rangeMatch = line.match(rangeRegex);

    if (mainMatch) {
      const [_, parameter, value, unit] = mainMatch;
      const cleanedUnit = (unit || "").replace(/\s+/g, "");

      const range = rangeMatch ? rangeMatch[1] : "";

      let flag = false;
      if (range) {
        const cleanedRange = range.replace(/[^\d.\-–<]/g, "");
        const [low, high] =
          cleanedRange.includes("-") || cleanedRange.includes("–")
            ? cleanedRange.split(/[-–]/).map(Number)
            : [0, parseFloat(cleanedRange)];
        const numericValue = parseFloat(value);
        flag = numericValue < low || numericValue > high;
      }

      data.push({
        parameter: parameter.trim(),
        value,
        unit: cleanedUnit,
        range: range || "",
        flag,
      });
    }
  });

  return data;
}
