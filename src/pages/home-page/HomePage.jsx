import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addCityData, addToHistory } from "../../redux/aqi/aqi.actions";
import AqiTable from "../../components/AqiTable/AqiTable";
import "./HomePage.scss";
import LineChart from "../../components/line-chart/LineChart";
export class HomePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            aqiData: {},
        };
    }

    componentDidMount() {
        let once = true;
        const _this = this;
        let ws = new WebSocket("wss://city-ws.herokuapp.com");
        ws.onopen = function (evt) {
            //Subscribe to the channel
            console.log("open", evt);
        };
        ws.onmessage = function (evt) {
            _this.onAQIDataChange(JSON.parse(evt.data));
            if (once) {
                // first time data is to be pushed to history
                const { dispatch, aqiCityData } = _this.props;
                dispatch(addToHistory(aqiCityData));
            }
            once = false;
        };

        setInterval(() => {
            const { dispatch, aqiCityData } = this.props;
            dispatch(addToHistory(aqiCityData));
        }, 5000);
    }

    onAQIDataChange(data) {
        const lastUpdated = new Date();
        const { dispatch, aqiCityData } = this.props;
        const mappedData = Object.fromEntries(
            data.map((aData) => [
                aData.city,
                { ...aData, aqi: +(+aData.aqi).toFixed(2), lastUpdated },
            ])
        );

        dispatch(addCityData({ ...aqiCityData, ...mappedData }));
    }

    render() {
        return (
            <div className="home-page-container">
                <div className="heading">Air Quality Monitoring</div>
                <div className="body-container">
                    <AqiTable />
                    <LineChart />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    aqiCityData: state.aqi.allCityData,
});

export default connect(mapStateToProps)(HomePage);
