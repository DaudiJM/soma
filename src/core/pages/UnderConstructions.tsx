import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Result from "core/components/Result";
import { ReactComponent as ConstructionsSvg } from "core/assets/constructions.svg";

const UnderConstructions = () => {
  const nav = useNavigate();

  const navigate = (route: string) => () => { nav(route); }

  return (
    <Result
      extra={
        <Button
          color="secondary"
          onClick={navigate("/dashboard")}
          variant="contained"
        >
          Back Home
        </Button>
      }
      image={<ConstructionsSvg />}
      maxWidth="sm"
      subTitle="This page is currently under construction"
      title="Ooops!"
    />
  );
};

export default UnderConstructions;
