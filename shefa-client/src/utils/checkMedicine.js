import { medicines } from "../../public/data/medicines";

export const checkMedicine = (name, company) => {
  const found = medicines.find(
    (m) =>
      m.name.toLowerCase() === name.toLowerCase() &&
      m.company.toLowerCase() === company.toLowerCase()
  );

  if (found) {
    return { status: "REAL", message: "Verified medicine ✅" };
  }

  return { status: "UNKNOWN", message: "Not found ⚠️" };
};