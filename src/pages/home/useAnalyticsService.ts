import { GraphCollection } from "utils/app-interfaces";
import { AdminCountSummary, SuccessRate } from "./schema/analytics-schemas";
import useController from "core/hooks/use-controller";

const useAnalyticsService = () => {
    const { request, loading } = useController();

    const getCountSummary = async () => {

       return await request<unknown, AdminCountSummary>({
            url: "/analytics/count",
        });
    }

    const getDaySuccessRate = async () => {

        return await request<unknown, SuccessRate>({
            url: "/analytics/success-rate",
        });
    }

    const getWeekBillSummary = async () => {
        return await request<unknown, GraphCollection>({
            url: "/analytics/bill",
        });
    }
    return { loading, getCountSummary, getDaySuccessRate, getWeekBillSummary };
}

export default useAnalyticsService;