const INITIAL_STATE = {
    allCityData: {},
    history: [],
    citiesInCompare: [],
};
const aqiReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_DATA":
            return {
                ...state,
                allCityData: action.payload,
            };
        case "ADD_TO_HISTORY":
            const newHistory = getUpdatedHistory(state.history, action.payload);
            return {
                ...state,
                history: newHistory,
            };
        case "ADD_REMOVE_CITY_FOR_COMPARE":
            let citiesInCompare = state.citiesInCompare;
            const cityToBeAdded = action.payload;
            if (citiesInCompare.includes(cityToBeAdded)) {
                citiesInCompare = citiesInCompare.filter(
                    (city) => city !== cityToBeAdded
                );
            } else {
                citiesInCompare = [...citiesInCompare, cityToBeAdded];
            }
            return {
                ...state,
                citiesInCompare,
            };
        case "SELECT_SINGLE_CITY":
            return {
                ...state,
                citiesInCompare: [action.payload],
            };
        default:
            return state;
    }
};

function getUpdatedHistory(oldHistory, newData) {
    const maxLength = 60; // max 5 minutes of data
    const newHistory = [...oldHistory, newData];
    if (newHistory.length <= maxLength) {
        return newHistory;
    }
    const [, ...rest] = newHistory;
    return rest;
}

export default aqiReducer;
