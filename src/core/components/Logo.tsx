import Box, { BoxProps } from "@mui/material/Box/Box";
import logo from "../assets/logo.png";

type LogoProps = {
  colored?: boolean;
  size?: number;
} & BoxProps;

const Logo = ({ colored = false, size = 120, ...boxProps }: LogoProps) => {
  return (
    <Box {...boxProps}>
      {/* <LogoSvg height={size} width={size} /> */}
      <img src={logo} alt="logo" height={size} width={size} />
    </Box>
  );
};

export const LogoSmall = ({ colored = false, size = 120, ...boxProps }: LogoProps) => {
  return (
    <Box {...boxProps}>
      {/* <LogoSvg height={size} width={size} /> */}
      {/* <img src={logo} alt="logo" height={50}  /> */}
    </Box>
  );
};


export default Logo;
