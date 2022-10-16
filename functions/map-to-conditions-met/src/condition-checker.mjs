import _ from "lodash";
import dayjs from "dayjs";

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
  const hour = dayjs(read.timestamp).hour();
  const hourOk = hour >= conditions.hourFrom && hour <= conditions.hourTo;

  return hourOk;
}
