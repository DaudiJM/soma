import Grid from "@mui/material/Grid"
import BoxedLayout from "core/components/BoxedLayout";
import { Outlet } from "react-router-dom";
import SettingsDrawer from "core/components/SettingsDrawer";
import Wrapper from "core/components/Wrapper";
import CCard from "core/components/Cards";
import image from "core/assets/login_page.svg";

const AuthLayout = () => {
    return(
        <Wrapper>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <Grid item xs={false} sm={false} xl={7} 
                sx={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: "no-repeat",
                    bgcolor: "background.default",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                />
                <Grid item xs={12} sm={12} xl={5}>
                    <CCard
                        hideBackButton
                    >
                        <BoxedLayout>
                            <Outlet />
                        </BoxedLayout>
                    </CCard>
                </Grid>
            </Grid>
            <SettingsDrawer />
        </Wrapper>
    )
}

export default AuthLayout;