import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/custom-hooks";

const WelcomeWidget = () => {
  const { user } = useAuth();
  const [greetings, setGreeting] = useState("");

  const loadGreetings = () => {
    const now = new Date();
    const greetings = now.getHours() < 3 ? "Hello " : now.getHours() < 12 ? "Good morning, "
      : now.getHours() < 15 ? "Good afternoon, " : now.getHours() < 20 ? "Good evening, " : "Hello, ";

      setGreeting(greetings);
  }

  useEffect(() => {
    loadGreetings();
  }, [user]);

  return (
    <Card elevation={0} sx={{ backgroundColor: "transparent", mb: 2 }}>
      <CardContent>
        <Typography component="div" gutterBottom variant="h1">
          { greetings } { user?.name }
        </Typography>
        <Typography
          component="div"
          sx={{ fontWeight: 300, mb: 3 }}
          variant="h1"
        >
          Welcome Back!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WelcomeWidget;
