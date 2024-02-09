import Grid from "@mui/material/Grid";
import useAnalyticsService from "../useAnalyticsService"
import ActivityWidget from "core/widgets/ActivityWidget";
import { useEffect, useState } from "react";
import { SuccessRate } from "../schema/analytics-schemas";
import SuccessRateWidget, { SuccessRateDataType } from "core/widgets/SuccessRateWidget";
import { GraphCollection } from "utils/app-interfaces";
import Loader from "core/components/Loader";


const CollectionSection = () => {
    const { loading, getDaySuccessRate, getWeekBillSummary } = useAnalyticsService();
    const [state, setState] = useState<SuccessRateDataType[]>([]);
    const [graphData, setGraphData] = useState<GraphCollection>({data: [], key: "", value: ""});

    const loadData = async () => {
        fetchTodaySuccessRate();
        fetchWeeklySummary();
    }

    const fetchTodaySuccessRate = async () => {
        const response = await getDaySuccessRate();
        if(response.header.responseCode === "0"){
            mapResponseToSuccessrateDataType(response.body.data);
        }
    }

    const mapResponseToSuccessrateDataType = (data: SuccessRate) => {
        const items = Object.keys(data).map((key, index) => {
            return {
                name: key,
                nameKey: key,
                value: Object.values(data)[index]
            }
        });
        setState(items);
    }

    const fetchWeeklySummary = async () => {
        const response = await getWeekBillSummary();
        if(response.header.responseCode === "0"){
            setGraphData(response.body.data);
        }
    }

    const showSuccessRate = () => {
       return state.filter(data => {
            return data.value > 0;
        }).length > 0;
    }

    useEffect(() => {
        loadData();

        return () => {};
    }, []);

    return(
        <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
                {loading ? <Loader /> : showSuccessRate() && <SuccessRateWidget data={state}/> }
            </Grid>
            <Grid item xs={12} sm={8}>
                {loading ? <Loader /> : graphData.data.length > 0 && <ActivityWidget data={graphData.data} key={graphData.key} value={graphData.value}/>}
            </Grid>
        </Grid>
    );
}

export default CollectionSection;