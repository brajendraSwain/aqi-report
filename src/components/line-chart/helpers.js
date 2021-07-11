import {LIVE_TRACKING_INTERVAL} from "../../utils/constants";

export function getLineDataSeries(cities, history) {
    const maxLength = 60/LIVE_TRACKING_INTERVAL + 1;
    const len = Math.min(maxLength, history.length);
    const historyToBeIterated =
        history.length > len
            ? history.slice(history.length - maxLength, history.length)
            : history;
    let allSeries = {};
    cities.forEach((city) => {
        allSeries[city] = [];
    });
    for (let i = 0; i < len; i++) {
        cities.forEach((city) => {
            const hData = historyToBeIterated[i][city];

            const s = {
                x: `${(len - i - 1) * LIVE_TRACKING_INTERVAL} sec ago`,
                y: hData?.aqi || null,
            };
            allSeries[city].push(s);
        });
    }
    return cities.map((city) => allSeries[city]);
}
