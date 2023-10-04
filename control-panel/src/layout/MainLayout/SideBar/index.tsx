import {Box, Chip, Stack, useMediaQuery, useTheme} from "@mui/material";
import {BrowserView, MobileView} from 'react-device-detect'
import PerfectScrollbar from 'react-perfect-scrollbar'
import LogoSection from "../Header/LogoSection";
import MenuList from "./MenuList";
import MenuCard from "./MenuCard";

interface SideBarProps {
  drawerOpen: boolean,
  drawerToggle: Function,
  window: object
}
const SideBar = (props: SideBarProps) => {
  const theme = useTheme()
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))

  const drawer = (
    <>
      <Box sx={{display: {xs: 'block', md: 'none'}}}>
        <Box sx={{display: 'flex', p: 2, mx: 'auto'}}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar>
          <MenuList />
          <MenuCard />
          <Stack direction='row' justifyContent='center' sx={{mb:2}}>
            <Chip label={process.env.REACT_APP_VERSION} disabled color="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{px:2}}>
          <MenuList />
          <MenuCard />
          <Stack direction='row' justifyContent='center' sx={{mb:2}}>
            <Chip label={process.env.REACT_APP_VERSION} disabled color="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </Box>
      </MobileView>
    </>
  )
  return(<></>)
}

export default SideBar