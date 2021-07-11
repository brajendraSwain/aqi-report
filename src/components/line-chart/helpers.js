export function getDataSeries(cities, history) {
    const maxLength = 13;
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
                x: `${(len - i - 1) * 5} sec ago`,
                y: hData?.aqi || null,
            };
            allSeries[city].push(s);
        });
    }
    return cities.map((city) => allSeries[city]);
}
