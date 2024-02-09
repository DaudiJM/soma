import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as ForbiddenSvg } from "core/assets/403.svg";
import Result from "core/components/Result";

const Forbidden = () => {

  return (
    <Result
      extra={
        <Button
          color="secondary"
          component={RouterLink}
          to={"/dashboard"}
          variant="contained"
        >
          Back Home
        </Button>
      }
      image={<ForbiddenSvg />}
      maxWidth="sm"
      subTitle="You do not have permission to access this page"
      title="Oops!"
    />
  );
};

export default Forbidden;
