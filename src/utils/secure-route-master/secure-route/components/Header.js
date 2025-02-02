import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  ListItemIcon
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import AuthContext from '../AuthContext';
import menuData from '../../../config/header.json';
import useApi from "../../../api-manager-master/api-manager/Helper/useApi";
import config from "../../../config/Global.json";
import { NavLink } from 'react-router-dom'
import SearchOnWeb from './SearchOnWeb';
import Notification from './Notification';
import background from './background.webp'
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Header = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({});
  const [userRole, setUserRole] = useState('common'); // Default role
  const theme = useTheme();
  const { Get } = useApi();
  const isRoleBased = menuData.roleBased.isRoleBased;
  const getUserType = async () => {
    try {
      const userTypeData = await Get('checkUserType');
      if(isRoleBased){
        let roleQue = sortByReference(userTypeData.roles);
        setUserRole(userTypeData.user_type || roleQue[0] || 'common'); // Default to 'common' if no role found
        localStorage.setItem("role", userTypeData.user_type || roleQue[0] || 'common');
      }else{
        setUserRole('common'); // Default to 'common' if no role found
        localStorage.setItem("role",'common');
      }
    } catch (error) {
      console.error("Failed to fetch user type:", error);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      getUserType();
    }
  },[]);

  function sortByReference(data) {
    const reference = menuData.roleBased.roleQue;
    return data.sort((a, b) => {
      const indexA = reference.indexOf(a);
      const indexB = reference.indexOf(b);
      
      // If both elements are in the reference, compare their indexes
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      // If only a is in the reference, a comes first
      if (indexA !== -1) return -1;
      // If only b is in the reference, b comes first
      if (indexB !== -1) return 1;
      // If neither are in the reference, keep original order
      return 0;
    });
  }
  

  const filteredMenuData = isRoleBased
    ? menuData.menu[userRole] || []
    : menuData.menu.common || [];

  const handleMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    logOutUser();
    handleMenuClose();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSubMenuToggle = (title) => {
    setOpenSubMenu((prevOpenSubMenu) => ({
      ...prevOpenSubMenu,
      [title]: !prevOpenSubMenu[title],
    }));
  };

  const handleNavClick = () => {
    setDrawerOpen(false);
  };

  const renderMenu = (menuItems, isSubMenu = false, level = 0) => {
    return menuItems.map((item, index) => (
      <div key={index}>
        <ListItem
          button
          component={item.child ? 'div' : Link}
          to={!item.child ? item.url : undefined}
          onClick={item.child ? () => handleSubMenuToggle(item.title) : handleNavClick}
          sx={{
            paddingLeft: `${16 + level * 10}px`, // Increase padding based on the depth level
            paddingTop: '8px',
            paddingBottom: (index === menuItems.length - 1 && !isSubMenu) ? '16px' : '8px', // Add extra padding to the last item
          }}
        >

          <ListItemIcon>
            <i
              className={`fa-solid ${item.icon}`}
              style={{ color: 'black' }} // Apply color using inline styles
            ></i>
          </ListItemIcon>
          <ListItemText primary={item.title} />
          {item.child ? (
            openSubMenu[item.title] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItem>
        {item.child && (
          <Collapse in={openSubMenu[item.title]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderMenu(item.child, true, level + 1)} {/* Increase level for nested items */}
            </List>
          </Collapse>
        )}
        <Divider />
      </div>
    ));
  };
  const {
    appName, logo, logoStyle
  } = config;
  return (
    <>
      <CssBaseline />
      <AppBarStyled position="fixed" open={drawerOpen} sx={{ backgroundColor: '#021526' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>{(logo !== undefined) ? <img src={logo} style={logoStyle} /> : appName}</Typography>

          {(menuData.topBar.search.active !== false) ? <>&nbsp;<SearchOnWeb style={menuData.topBar.search.style} />&nbsp;</> : ""}
          {(menuData.topBar.notification.active !== false) ? <>&nbsp;<Notification />&nbsp;</> : ""}


          <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
            <i className={`fa-solid ${menuData.topBar.icon}`}></i>
          </IconButton>

          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleMenuClose}
          >
            {
              (menuData.topBar.menu !== undefined) ?
                menuData.topBar.menu.map((itm, index) => {
                  if (itm.url === "logout") {
                    return (<MenuItem key={index} style={itm.style} onClick={handleLogout}><i className={`fa ${itm.icon}`}></i> &nbsp;&nbsp;  {itm.title}</MenuItem>)
                  } else {
                    return (<MenuItem key={index} component={NavLink} to={itm.url}>
                      <i className={`fa ${itm.icon}`}></i> &nbsp;&nbsp;
                      {itm.title}

                    </MenuItem>)
                  }

                })
                : ""
            }

          </Menu>
        </Toolbar>
      </AppBarStyled>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat, repeat", backgroundSize: "cover" }}>
          <div style={{ height: "100px", width: "100%", alignContent:"center" }}>
            {/* <i className='fa fa-face-smile' style={{ fontSize: "45px", color: "yellow" }}></i> Welcome */}
          </div>
          <IconButton onClick={toggleDrawer}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          {renderMenu(filteredMenuData)}
          <ListItem style={{ padding: '0px', bottom: 0 }}>

          </ListItem>

        </List>
        <div style={{ position: "absolute", bottom: "0", paddingLeft: "50px", paddingBottom: "10px", alignContent: "center" }}><i className="fa-solid fa-circle-info"></i> &nbsp; Version: {config.version}</div>
      </Drawer>
      <Main open={drawerOpen}>
        <DrawerHeader />
        {/* Your main content goes here */}
      </Main>
    </>
  );
};

export default Header;








