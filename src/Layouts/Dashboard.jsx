import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { GiConfirmed } from "react-icons/gi";
import { Link, Outlet } from "react-router-dom";
import image from "../assets/Images/logo/logo.png";

const drawerWidth = 260;

const Dashboard = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
    setIsActive(location.pathname.split("/")[2]);
  }, [location]);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <img src={image} className="w-28 m-3" />
      <Divider />
      <List className="font-poppins">
        <Link
          to="/dashboard/selectedClasses"
          className={isActive === "selectedClasses" && "text-[#77bef8]"}
        >
          <ListItemButton>
            <MdOutlinePendingActions className="mr-10"></MdOutlinePendingActions>
            Selected Classes
          </ListItemButton>
        </Link>

        <Link
          to="/dashboard/enrolledClasses"
          className={isActive === "enrolledClasses" && "text-[#77bef8]"}
        >
          <ListItemButton>
            <GiConfirmed className="mr-10"></GiConfirmed>
            Enrolled Classes
          </ListItemButton>
        </Link>

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />

        <Link to="/">
          <ListItemButton>
            <AiOutlineHome className="mr-10"></AiOutlineHome>
            Home
          </ListItemButton>
        </Link>

        <Link to="/instructors">
          <ListItemButton>
            <FaUserTie className="mr-10"></FaUserTie>
            Instructors
          </ListItemButton>
        </Link>

        <Link to="/classes">
          <ListItemButton>
            <SiGoogleclassroom className="mr-10"></SiGoogleclassroom>
            Classes
          </ListItemButton>
        </Link>
        
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <AiOutlineMenu />
          </IconButton>
          <Typography noWrap component="div"></Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div>
          <Outlet></Outlet>
        </div>
      </Box>
    </Box>
  );
};

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;