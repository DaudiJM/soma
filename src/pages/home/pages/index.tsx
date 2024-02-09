import Grid from "@mui/material/Grid";
import WelcomeWidget from "core/widgets/WelcomeWidget";
import CountSummarySection from "../sections/CountSummarySection";
import CollectionSection from "../sections/CollectionSection";


const HomePage = () => {

    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <WelcomeWidget />
            </Grid>
            {/* <Grid item xs={12}>
                <CountSummarySection />
            </Grid>
            <Grid item xs={12} >
                <CollectionSection />
            </Grid> */}
        </Grid>
    );
}

export default HomePage;