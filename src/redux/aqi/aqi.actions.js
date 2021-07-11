export const addCityData = (cityData) => ({
    type: "ADD_DATA",
    payload: cityData,
});

export const addToHistory = (cityData) => ({
    type: "ADD_TO_HISTORY",
    payload: cityData,
});

export const addOrRemoveCityToCompare = (city) => ({
    type: "ADD_REMOVE_CITY_FOR_COMPARE",
    payload: city,
});

export const selectSingleCityInChart = (city) => ({
    type: "SELECT_SINGLE_CITY",
    payload: city,
});
