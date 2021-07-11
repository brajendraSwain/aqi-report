import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import "./AqiTable.scss";
import {
    addOrRemoveCityToCompare,
    selectSingleCityInChart,
} from "../../redux/aqi/aqi.actions";
import { getChangeTypeClass, getColorClass } from "./helpers";

const cityColorStateBackUp = {};

export const AqiTable = (props) => {
    const { aqiCityData, dispatch } = props;
    function onRowClick(rowData, evt) {
        if (evt.ctrlKey) {
            dispatch(addOrRemoveCityToCompare(rowData.city));
        } else {
            dispatch(selectSingleCityInChart(rowData.city));
        }
    }
    return (
        <table className="aqi-table">
            <tbody>
                <AqiHeadRow />
                {Object.entries(aqiCityData).map(([key, aData]) => (
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
    const { city, aqi, lastUpdated } = rowData;
    const colorClass = getColorClass(Math.round(aqi));
    const backUpColor = cityColorStateBackUp[city];
    const changeTypeClass = getChangeTypeClass(city, colorClass, backUpColor);
    const aqiClass = `aqi-cell ${colorClass}`;
    const rowClass = `aqi-row bg-animate ${changeTypeClass}`;
    cityColorStateBackUp[city] = colorClass;
    return (
        <tr className={rowClass} onClick={onRowClick}>
            <td className="aqi-cell">{city}</td>
            <td className={aqiClass}>{aqi}</td>
            <td className="aqi-cell">{moment(lastUpdated).fromNow()}</td>
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

const mapStateToProps = (state) => ({
    aqiCityData: state.aqi.allCityData,
});

export default connect(mapStateToProps)(AqiTable);
