import _ from "lodash";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(timezone);
dayjs.tz.setDefault("Poland/Warsaw");

export default async function (forecast, conditionsProvider) {
  const reads = _.zipWith(
    forecast.timestamps,
    forecast.windSpeeds,
    forecast.windDirections,
    (timestamp, windSpeed, windDirection) => ({
      timestamp,
      windSpeed,
      windDirection,
    })
  );

  const conditions = await conditionsProvider();
  const meetsConditions = _.curry(readMeetsConditions)(conditions);

  const meetingConditions = _.filter(reads, meetsConditions);

  return { shouldAlert: !_.isEmpty(meetingConditions) };
}

function readMeetsConditions(conditions, read) {
  return (
    isHourOk(read.timestamp, conditions) &&
    isSpeedOk(read.windSpeed, conditions) &&
    isDirectionOk(read.windDirection, conditions)
  );
}

function isHourOk(timestamp, conditions) {
  const hour = dayjs(timestamp).hour();
  const hourOk = hour >= conditions.hourFrom && hour <= conditions.hourTo;
  return hourOk;
}

function isSpeedOk(speed, conditions) {
  return speed > conditions.speed;
}

function isDirectionOk(windDirection, conditions) {
  // This is done to avoid conditional branching mess for cases when
  // directionStart + directionAngle > 360
  const rotatedDirection = windDirection - conditions.directionStart;
  return rotatedDirection >= 0 && rotatedDirection <= conditions.directionAngle;
}
