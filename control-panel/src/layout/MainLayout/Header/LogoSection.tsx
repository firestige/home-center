import {Link} from 'react-router-dom'
import {ButtonBase} from "@mui/material";
import Logo from "../../../utils/Logo";

const LogoSection = () => {
  return (
    <ButtonBase disableRipple onClick={() => {}} component={Link} to='/'>
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;