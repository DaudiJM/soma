import Grid from "@mui/material/Grid";
import OverviewWidget from "core/widgets/OverviewWidget";
import useAnalyticsService from "../useAnalyticsService";
import { useEffect, useState } from "react";
import { AdminCountSummary } from "../schema/analytics-schemas";

const CountSummarySection = () => {
    const [state, setState] = useState<AdminCountSummary>({bills: 0, collection: 0, merchants: 0, users: 0});
    const { loading, getCountSummary } = useAnalyticsService();

    const loadCounts = async () => {
        const response = await getCountSummary();
        if(response.header.responseCode === "0"){
            setState(response.body.data);
        }
    }

    useEffect(() => {
        loadCounts();

        return () => {};
    }, []);

    return(
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl>
                <OverviewWidget title={state.users.toString()} description="Users"/>
            </Grid>
            <Grid item xs={12} sm={6} xl>
                <OverviewWidget title={state.merchants.toString()} description="Merchants"/>
            </Grid>
            <Grid item xs={12} sm={6} xl>
                <OverviewWidget title={state.bills.toString()} description="Bills"/>
            </Grid>
            <Grid item xs={12} sm={6} xl>
                <OverviewWidget title={state.collection.toString()} description="Collection"/>
            </Grid>
        </Grid>
    );
}

export default CountSummarySection;