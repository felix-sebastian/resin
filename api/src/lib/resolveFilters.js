import { Op } from "sequelize";

const deserializeFilterValue = value =>
  JSON.parse(Buffer.from(value, "base64").toString());

export default filters =>
  !filters
    ? []
    : filters.reduce((result, filter) => {
        const value = deserializeFilterValue(filter.value);
        const { field, type } = filter;

        if (field === "location") {
          if (type === "radius") {
            const { radius, center } = value;
            const { latitude, longitude } = center;
            const conversionFactor = 110.949;
            const radDeg = radius.distance / conversionFactor;

            result.latitude = {
              [Op.between]: [latitude - radDeg, latitude + radDeg]
            };

            result.longitude = {
              [Op.between]: [longitude - radDeg, longitude + radDeg]
            };
          } else if (type === "rectangle") {
            const { pointA, pointB } = value;

            result.latitude = {
              [Op.between]: [pointA.latitude, pointB.latitude]
            };

            result.longitude = {
              [Op.between]: [pointA.longitude, pointB.longitude]
            };
          }
        } else if (
          // basic
          ["description", "damageSeverity", "dca", "numVehicles", "mode", "speedLimit",
          "$vehicles.oem$", "$vehicles.make$", "$vehicles.model$", 'windSpeed',
          'apparentTemperature', 'cloudCover', 'dewPoint', 'humidity',
          'ozone', 'precipIntensity', 'precipProbability', 'schoolZone',
          'precipType', 'pressure', 'summary', 'temperature', 'streetType',
          'uvIndex', 'visibility', 'windBearing', 'windGust' ].includes(
            field
          )
        ) {
          result[field] = {
            [Op[type]]: value
          };
        }
        return result;
      }, {});
