import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Result from "core/components/Result";
import { ReactComponent as NotFoundSvg } from "core/assets/404.svg";

const NotFound = () => {

  return (
    <Result
      extra={
        <Button
          color="secondary"
          component={RouterLink}
          to="/dashboard"
          variant="contained"
        >
          Back Home
        </Button>
      }
      image={<NotFoundSvg />}
      maxWidth="sm"
      subTitle="The page you are looking for was not found"
      title="Oops!"
    />
  );
};

export default NotFound;
