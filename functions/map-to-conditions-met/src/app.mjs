import checkConditionsMet from "./condition-checker.mjs";
import readConditions from "./conditions-reader.mjs";

export async function handler(event, context) {
  return checkConditionsMet(event.forecast, readConditions);
}
