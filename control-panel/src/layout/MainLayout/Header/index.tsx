import React from "react";
import {Avatar, Box, ButtonBase, useTheme} from "@mui/material";
import LogoSection from "./LogoSection";
import {AcUnitOutlined} from "@mui/icons-material";
import NotificationSection from "./NotificationSection";
import SettingsSection from "./SettingsSection";

interface HeaderProps {
  handleLeftDrawerToggle: Function
}
const Header: React.FC<HeaderProps> = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar>
            <AcUnitOutlined />
          </Avatar>
        </ButtonBase>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      <NotificationSection />
      <SettingsSection />
    </>
  );
};

export default Header;