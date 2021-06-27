'use strict';

const fs = require('fs').promises;
const chai = require('chai');
const expect = chai.expect;
const Assertion = chai.Assertion;
const sinon = require('sinon');

const app = require('../../app.js');
const readConditions = require('../../conditions-reader');

describe('Tests mapping to conditions met', function () {
    sinon.stub(readConditions).returns(Promise.resolve({
        speed: 8.5,
        directionStart: 270,
        directionAngle: 90,
        hourFrom: "8:00",
        hourTo: "20:00"
    }));

    it('Raises alert when conditions met', async () => {
        const event = await readMockInput("input-good");

        const result = await app.lambdaHandler(event);

        expect(result).to.be.alert(true);
    });

    it("Does not raise alert when it's windy at bad hour", async () => {
        const event = await readMockInput("input-bad-hour");

        const result = await app.lambdaHandler(event);

        expect(result).to.be.alert(false);
    });

    it("Does not raise alert when it's windy but the direction is off", async () => {
        const event = await readMockInput("input-bad-direction");

        const result = await app.lambdaHandler(event);

        expect(result).to.be.alert(false);
    });


    it("Does not raise alert when it's not windy", async () => {
        const event = await readMockInput("input-bad-speed");

        const result = await app.lambdaHandler(event);

        expect(result).to.be.alert(false);
    });
});

async function readMockInput(filename) {
    return fs.readFile(`./tests/unit/${filename}.json`, 'utf-8')
        .then(context => JSON.parse(context));
}

Assertion.addMethod("alert", function (isAlert) {
    const result = this._obj;

    expect(result).to.be.an('object');
    expect(result).to.have.key('shouldAlert');
    expect(result.shouldAlert).to.equal(isAlert);
});