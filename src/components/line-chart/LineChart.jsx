import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries,
    DiscreteColorLegend,
    Hint,
    Crosshair,
} from "react-vis";
import "./LineChart.scss";
import { connect } from "react-redux";
import { PureComponent } from "react";

class LineChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hovered: null,
        };
        this.seriesDataList = [];
    }

    render() {
        const { history, cities } = this.props;
        if (!cities.length) {
            return (
                <div className="line-container">
                    <div className="no-data">
                        No Cities are Selected <br /> Click on the row to see
                        city in live chart
                    </div>
                </div>
            );
        }
        const seriesDataList = getDataSeries(cities, history);
        const { hovered } = this.state;
        return (
            <div className="line-container">
                <XYPlot
                    xType="ordinal"
                    height={500}
                    width={window.innerWidth - 650}
                    margin={{ bottom: 70 }}
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis tickLabelAngle={-45} />
                    <YAxis />
                    {seriesDataList.map((series, index) => {
                        return (
                            <LineMarkSeries
                                key={cities[index]}
                                style={{
                                    strokeWidth: "3px",
                                }}
                                data={series}
                                getNull={(d) => d.y !== null}
                                onValueMouseOver={(d) =>
                                    this.setState({
                                        hovered: {
                                            ...d,
                                            series: cities[index],
                                        },
                                    })
                                }
                                onValueMouseOut={(d) =>
                                    this.setState({ hovered: false })
                                }
                            />
                        );
                    })}
                    {hovered && <Hint value={hovered} />}
                    <DiscreteColorLegend
                        orientation="horizontal"
                        width={window.innerWidth - 650}
                        items={cities}
                    />
                </XYPlot>
            </div>
        );
    }
}

function getDataSeries(cities, history) {
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

const mapStateToProps = (state) => ({
    history: state.aqi.history,
    cities: state.aqi.citiesInCompare,
});

export default connect(mapStateToProps)(LineChart);
