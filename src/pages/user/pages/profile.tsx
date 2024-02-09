import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import ChangePassword from "../sections/ChangePassword";
import CCard from "core/components/Cards";
import UserInformation from "../sections/UserInformation";
import { useAuth } from "core/hooks/custom-hooks";
import UpdateUserPage from "../sections/UpdateUserPage";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Profile = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const { user } = useAuth();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return(
        <Grid container spacing={3}>
            <Grid item xs={12} xl={4} mt={3}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        mb: 6,
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: "background.paper",
                            mb: 3,
                            height: 160,
                            width: 160,
                        }}
                    >
                        <PersonIcon sx={{ fontSize:120 }}/>
                    </Avatar>
                    <Typography component="div" variant="h4">{user?.name ?? "Name"}</Typography>
                    <Typography variant="body2" sx={{m: 2}}>{ user?.roles[0] ?? "User"}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} xl={8} mt={3}>
                <Box mb={4}>
                    <Tabs value={tabIndex} onChange={handleChange}>
                        <Tab label="Information" {...a11yProps(0)}/>
                        <Tab label="Update Info" {...a11yProps(1)}/>
                        <Tab label="Password" {...a11yProps(2)}/>
                    </Tabs>
                </Box>
                <TabPanel value={tabIndex} index={0}>
                    <UserInformation />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                  <UpdateUserPage />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <CCard title="Change Password">
                        <ChangePassword />
                    </CCard>
                </TabPanel>
            </Grid>
        </Grid>
    )
}

export default Profile;