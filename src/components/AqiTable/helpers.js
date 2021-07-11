import { AQI_COLOR_CLASSES, CHANGE_TYPE_CLASS } from "../../utils/constants";
// order --- good -> severe
const aqiColorScale = AQI_COLOR_CLASSES.map((d) => d.class);

export function getColorClass(value) {
    return AQI_COLOR_CLASSES.find(
        (d) => value >= d.range[0] && value <= d.range[1]
    )?.class;
}

/**
 * get teh change is positive or negative
 * positive - if aqi is lesser eg - bad to good
 * @param {*} city
 * @param {*} newColor
 * @param {*} backUpColor
 * @returns
 */
export function getChangeTypeClass(city, newColor, backUpColor) {
    if (!backUpColor && aqiColorScale.indexOf(backUpColor) === -1) {
        return "";
    }
    if (aqiColorScale.indexOf(newColor) < aqiColorScale.indexOf(backUpColor)) {
        return CHANGE_TYPE_CLASS.positive;
    }

    if (aqiColorScale.indexOf(newColor) > aqiColorScale.indexOf(backUpColor)) {
        return CHANGE_TYPE_CLASS.negative;
    }
    return "";
}
