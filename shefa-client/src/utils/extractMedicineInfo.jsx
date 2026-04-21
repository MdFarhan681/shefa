export const extractMedicineInfo = (text) => {
  const clean = text.toLowerCase();

  let name = "";
  let company = "";

  if (clean.includes("montelukast")) name = "Monas";
  if (clean.includes("napa")) name = "Napa";
  if (clean.includes("seclo")) name = "Seclo";

  if (clean.includes("acme")) company = "ACME";
  if (clean.includes("square")) company = "Square";
  if (clean.includes("beximco")) company = "Beximco";
  if (clean.includes("incepta")) company = "Incepta";

  return { medicineName: name, companyName: company };
};