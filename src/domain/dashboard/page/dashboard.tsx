import { ChartContainer } from "../components/dashboard-chart-container";
import { DashboardAnalyticsCards } from "../components/dashboard-analytics-cards";

const DashboardPage = () => {
    return (
        <>
            <DashboardAnalyticsCards />
            <ChartContainer />
        </>
    );
}

export default DashboardPage;