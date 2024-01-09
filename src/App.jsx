import { useState } from "react";
import { mockTransactions, mockGeographyData } from "./data/mockData";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Grid } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeIcon from "@mui/icons-material/Home";
import "./App.css";

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "white",
  color: "black",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const columns = [
  { id: "id", label: "ID", maxWidth: 100 },
  { id: "name", label: "Name", maxWidth: 100 },
  {
    id: "date",
    label: "Date",
    maxWidth: 100,
  },
  {
    id: "amount",
    label: "Amount",
    maxWidth: 100,
  },
];

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "70%",
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

const CalcData = ({ revenues }) => {
  let total = 0,
    highestSale = 0,
    highestName = "";
  for (let x of revenues) {
    total += x.value;
    if (highestSale < x.value) {
      highestName = x.id;
      highestSale = x.value;
    }
  }
  return (
    <>
      <Stack direction="row" spacing={2}>
        <DemoPaper variant="elevation">
          <h2>
            <AttachMoneyIcon></AttachMoneyIcon>
          </h2>
          <h4>
            Revenue Generated: $
            {total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </h4>
        </DemoPaper>
        <DemoPaper variant="elevation">
          <h2>
            <AttachMoneyIcon></AttachMoneyIcon>
          </h2>
          <h4>
            Highest Sales: $
            {highestSale.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </h4>
        </DemoPaper>
        <DemoPaper variant="elevation">
          <h2>
            <StoreIcon></StoreIcon>
          </h2>
          <h4>Highest Seller: {highestName}</h4>
        </DemoPaper>
      </Stack>
    </>
  );
};

const Transactions = ({ transactions }) => {
  const rows = [];
  transactions.forEach((transaction) => {
    rows.push({
      id: transaction.txId,
      name: transaction.user,
      date: transaction.date,
      amount: transaction.cost,
    });
  });
  return (
    <>
      <div className="transaction">
        <Paper
          sx={{
            width: "50%",
            overflow: "hidden",
          }}
        >
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
};

function App() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [revenues, setRevenues] = useState(mockGeographyData);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [home, setHome] = useState("Dashboard");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  console.log(home);
  return home === "Dashboard" ? (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Dashboard", "FAQ Page"].map((text, index) => (
            <ListItem
              key={text}
              onClick={() => {
                setHome(text);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <HomeIcon /> : <HelpOutlineIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <CalcData revenues={revenues}></CalcData>
        <br></br>
        <br></br>
        <h4 className="transactionTitle">Recent Transactions</h4>
        <Transactions transactions={transactions}></Transactions>
      </Main>
    </Box>
  ) : (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Dashboard", "FAQ Page"].map((text, index) => (
            <ListItem
              key={text}
              onClick={() => {
                setHome(text);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <HomeIcon /> : <HelpOutlineIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <h5>FAQ PAGE</h5>
      </Main>
    </Box>
  );
}

export default App;
