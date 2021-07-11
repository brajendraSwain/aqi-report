import React, { PureComponent } from "react";
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
} from "react-vis";
import "./LineChart.scss";
import { connect } from "react-redux";
import { getDataSeries } from "./helpers";

const CHART_MIN_WIDTH = 500;
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
        let chartWidth = window.innerWidth - 650;
        chartWidth =
            chartWidth < CHART_MIN_WIDTH ? CHART_MIN_WIDTH : chartWidth;

        const seriesDataList = getDataSeries(cities, history);
        const { hovered } = this.state;
        return (
            <div className="line-container">
                <XYPlot
                    xType="ordinal"
                    height={500}
                    width={chartWidth}
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
                        width={chartWidth}
                        items={cities}
                    />
                </XYPlot>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    history: state.aqi.history,
    cities: state.aqi.citiesInCompare,
});

export default connect(mapStateToProps)(LineChart);
