import {styled, useMediaQuery, useTheme, Box, CssBaseline, AppBar, Toolbar, Breadcrumbs} from "@mui/material";
import SideBar from "./SideBar";
import {Outlet} from "react-router-dom";
import Customization from "../Customization";
import {drawerWidth} from "../../constant";
import {useState} from "react";
import Header from "./Header";

interface MainProps {
  open: boolean
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<MainProps>(({theme, open}) => ({
  ...theme.typography.body1,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }
      : {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    marginRight: '10px'
  }
}))

const MainLayout = () => {
  const [leftDrawerOpened, setLeftDrawerOpen] = useState(true)
  const theme = useTheme()
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpen(!leftDrawerOpened)
  }

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar enableColorOnDark position='fixed' color='inherit' elevation={0} sx={{bgcolor: theme.palette.background.default, transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'}}>
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>
      <SideBar drawerOpen={false} drawerToggle={handleLeftDrawerToggle} window={window}/>
      <Main theme={theme} open={false}>
        <Breadcrumbs />
        <Outlet />
      </Main>
      <Customization />
    </Box>
  )
}

export default MainLayout