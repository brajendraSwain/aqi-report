import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import "./AqiTable.scss";
import { AQI_COLOR_CLASSES, CHANGE_TYPE_CLASS } from "../../utils/constants";
import {
    addOrRemoveCityToCompare,
    selectSingleCityInChart,
} from "../../redux/aqi/aqi.actions";

const cityColorStateBackUp = {};
// order --- good -> severe
const aqiColorScale = AQI_COLOR_CLASSES.map((d) => d.class);

export const AqiTable = (props) => {
    const { aqiCityData, dispatch } = props;
    function onRowClick(rowData, evt) {
        if (evt.ctrlKey) {
            dispatch(selectSingleCityInChart(rowData.city));
        } else {
            dispatch(addOrRemoveCityToCompare(rowData.city));
        }
    }
    return (
        <table className="aqi-table">
            <tbody>
                <AqiHeadRow />
                {Object.entries(aqiCityData)
                    .sort(sortByCity)
                    .map(([key, aData]) => (
                        <AqiRow
                            key={key}
                            rowData={aData}
                            onRowClick={onRowClick.bind(null, aData)}
                        />
                    ))}
            </tbody>
        </table>
    );
};

export function AqiRow({ rowData, onRowClick }) {
    const colorClass = getColorClass(Math.round(rowData.aqi));
    const changeTypeClass = getChangeTypeClass(colorClass, rowData.city);
    const aqiClass = `aqi-cell ${colorClass}`;
    const rowClass = `aqi-row bg-animate ${changeTypeClass}`;
    cityColorStateBackUp[rowData.city] = colorClass;
    return (
        <tr className={rowClass} onClick={onRowClick}>
            <td className="aqi-cell">{rowData.city}</td>
            <td className={aqiClass}>{rowData.aqi}</td>
            <td className="aqi-cell">
                {moment(rowData.lastUpdated).fromNow()}
            </td>
        </tr>
    );
}

export function AqiHeadRow() {
    return (
        <tr className="aqi-head-row">
            <td className="aqi-cell">City</td>
            <td className="aqi-cell">Current AQI</td>
            <td className="aqi-cell">Last Updated</td>
        </tr>
    );
}

export function sortByCity([key, a], [key1, b]) {
    if (a.city > b.city) {
        return 1;
    }

    if (a.city > b.city) {
        return -1;
    }
    return 0;
}

export function getColorClass(value) {
    return AQI_COLOR_CLASSES.find(
        (d) => value >= d.range[0] && value <= d.range[1]
    )?.class;
}

export function getChangeTypeClass(newColor, city) {
    const backUpColor = cityColorStateBackUp[city];
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

const mapStateToProps = (state) => ({
    aqiCityData: state.aqi.allCityData,
});

export default connect(mapStateToProps)(AqiTable);
