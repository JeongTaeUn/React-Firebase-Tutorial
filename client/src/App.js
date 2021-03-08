import React, { useEffect, useState } from "react";
import "./App.css";
import Customer from "./components/Customer";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { withStyles, fade, makeStyles } from "@material-ui/core/styles";
import CustomerAdd from "./components/CustomerAdd";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

const styles = makeStyles((theme) => ({
  root: {
    whith: "100%",
    marginTop: theme.spacing(3),
    flexGrow: 1,
    minWidth: 1080,
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center",
  },
  circularProgress: {
    display: "flex",
    "^ > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  tableHead: {
    fontSize: "1.0px",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function App() {
  const classes = styles();
  const [customers, setCustomers] = useState();
  const [completed, setCompleted] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  //loading progress until fetch success
  useEffect(() => {
    const progress = () => {
      setCompleted((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    };

    const timer = setInterval(progress, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  }, []);

  //App Bar Start
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // use CustomerAdd
  const stateRefresh = (customers) => {
    setCustomers(customers);
    setSearchKeyword("");
  };

  const callApi = async () => {
    const respons = await fetch("/api/customers");
    const body = await respons.json();
    return body;
  };

  const filteredComponent = (data) => {
    if (!data) {
      return (
        <TableRow>
          <TableCell colSpan="7" align="center">
            <CircularProgress
              className={classes.circularProgress}
              variant="determinate"
              value={completed}
            />
          </TableCell>
        </TableRow>
      );
    }
    data = data ? data.filter((c) => c.name.indexOf(searchKeyword) > -1) : [];
    return data.map((c, index) => {
      return (
        <Customer
          key={c.name}
          id={index + 1}
          imageUrl={c.imageUrl ? c.imageUrl : "https://placeimg.com/64/48/any"}
          name={c.name}
          birthday={c.birthday}
          gender={c.gender}
          job={c.job}
          action={stateRefresh}
        />
      );
    });
  };

  const cellList = [
    "No",
    "Image",
    "Name",
    "Job",
    "Gender",
    "Birthday",
    "Delete",
  ];

  const handleValueChange = (e) => {
    console.log(e.target.value);
    setSearchKeyword(e.target.value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Customer Management
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              name="searchKeyword"
              value={searchKeyword}
              onChange={handleValueChange}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div className={classes.menu}>
        <CustomerAdd action={stateRefresh} />
      </div>
      <Paper className={classes.paper}>
        <Table className={classes.tableHead}>
          <TableHead key="head">
            <TableRow>
              {cellList.map((cell, index) => {
                return <TableCell key={index}>{cell}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>{filteredComponent(customers)}</TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(App);
