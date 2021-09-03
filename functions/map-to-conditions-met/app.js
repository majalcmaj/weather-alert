"use_strict";

const _ = require('lodash');
const dayjs = require('dayjs');
const { readConditions } = require("./conditions-reader");

exports.lambdaHandler = async (event, context) => {
    const reads = _.zipWith(
        event.forecast.timestamps,
        event.forecast.windSpeeds,
        event.forecast.windDirections,
        (timestamp, windSpeed, windDirection) => ({ timestamp, windSpeed, windDirection }));
    console.log(JSON.stringify(reads, null, 2));

    const conditions = await readConditions();
    const meetsConditions = _.curry(readMeetsConditions)(conditions)

    const meetingConditions = _.filter(reads, meetsConditions);
    return { shouldAlert: !_.isEmpty(meetingConditions) };
};

const readMeetsConditions = (conditions, read) => {
    const time = new Date(read.timestamp)
    const minutesOfDay = time.getHours() * 60 + time.getMinutes;
    const hourTo = dayjs.conditions.hourTo

    return read.timestamp >= conditions.hourFrom && 
    read.windSpeed >= conditions.speed &&
     
}
