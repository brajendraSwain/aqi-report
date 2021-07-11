// `wss` required when we serve the site from a secure endpoint 
export const AQI_WS_URL = "wss://city-ws.herokuapp.com";

export const AQI_COLOR_CLASSES = [
    { class: "good", range: [0, 50] },
    { class: "satisfactory", range: [51, 100] },
    { class: "moderate", range: [101, 200] },
    { class: "poor", range: [201, 300] },
    { class: "very_poor", range: [301, 400] },
    { class: "severe", range: [401, 500] },
];

export const CHANGE_TYPE_CLASS = {
    positive: "positive",
    negative: "negative",
};

export const LIVE_CHART_HEIGHT = 450;

export const LIVE_TRACKING_INTERVAL = 3 ; // in sec

