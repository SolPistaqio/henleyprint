export const relationships = [
  "Mother",
  "Father",
  "Child",
  "Spouse",
  "Sibling",
  "Parent-in-law",
];

export const requiredRules = [
  (v) => (!!v && !!v.trim()) || "This field is required",
];
export const requiredRulesRadio = [
  (v) => typeof v === "boolean" || "This field is required",
];

export const requiredChoice = [(v) => !!v || "This field is required"];

export const consentRules = [(v) => !!v || "This field is required"];
export const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) =>
    !v ||
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    "E-mail must be valid",
];
