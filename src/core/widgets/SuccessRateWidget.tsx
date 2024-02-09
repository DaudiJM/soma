import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export type SuccessRateDataType = {
  name: string;
  nameKey: string;
  value: number;
}

type WidgetProps = {
  data: SuccessRateDataType[];
}

const SuccessRateWidget:React.FC<WidgetProps> = ({ data }) => {

  return (
    <Card sx={{ mb: 4, p:0.5 }}>
      <CardHeader title="Bills Success Rate" />
      <CardContent>
        <List>
          {data.map((item) => (
            <ListItem disableGutters key={item.name}>
              <ListItemText>
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Typography component="div" variant="h6">
                    {item.nameKey}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Typography component="div" variant="h6">
                    {`${item.value}%`}
                  </Typography>
                </Box>
                <LinearProgress
                  aria-label={`${item.nameKey} progress`}
                  sx={{
                    color:
                      item.value >= 75
                        ? "success.main"
                        : item.value <= 25
                        ? "error.main"
                        : "warning.main",
                  }}
                  color="inherit"
                  variant="determinate"
                  value={item.value}
                />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default SuccessRateWidget;
