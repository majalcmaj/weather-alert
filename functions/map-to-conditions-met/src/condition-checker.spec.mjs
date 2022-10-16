import fs from "fs/promises";
import { expect, Assertion } from "chai";

import checkConditions from "./condition-checker.mjs";

describe("Tests mapping to conditions met", function () {
  async function readMockConditions() {
    return {
      speed: 8.5,
      directionStart: 270,
      directionEnd: 90,
      hourFrom: 8,
      hourTo: 20,
    };
  }

  it("Raises alert when conditions met", async () => {
    const input = await readMockInput("input-good");

    const result = await checkConditions(input, readMockConditions);

    expect(result).to.be.alert(true);
  });

  it("Does not raise alert when it's windy at bad hour", async () => {
    const input = await readMockInput("input-bad-hour");

    const result = await checkConditions(input, readMockConditions);

    expect(result).to.be.alert(false);
  });

  it("Does not raise alert when it's windy but the direction is off", async () => {
    const input = await readMockInput("input-bad-direction");

    const result = await checkConditions(input, readMockConditions);

    expect(result).to.be.alert(false);
  });

  it("Does not raise alert when it's not windy", async () => {
    const input = await readMockInput("input-bad-speed");

    const result = await checkConditions(input, readMockConditions);

    expect(result).to.be.alert(false);
  });
});

async function readMockInput(filename) {
  return fs
    .readFile(`./test-data/${filename}.json`, "utf-8")
    .then((context) => JSON.parse(context));
}

Assertion.addMethod("alert", function (isAlert) {
  const result = this._obj;

  expect(result).to.be.an("object");
  expect(result).to.have.key("shouldAlert");
  expect(result.shouldAlert).to.equal(isAlert);
});

