import React, { useEffect, useState } from "react";
import "./App.css";
import Customer from "./components/Customer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TableRow, Paper, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CustomerAdd from "./components/CustomerAdd";

const styles = (theme) => ({
  root: {
    whith: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
  circularProgress: {
    display: "flex",
    "^ > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
});

function App() {
  const [customers, setCustomers] = useState();
  const [completed, setCompleted] = useState(0);

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

  // use CustomerAdd
  const stateRefresh = (customers) => {
    setCustomers(customers);
  };

  const callApi = async () => {
    const respons = await fetch("/api/customers");
    const body = await respons.json();
    return body;
  };
  const { root, table, circularProgress } = styles;

  const customer = customers ? (
    customers.map((data) => {
      return (
        <Customer
          key={data.id}
          id={data.id}
          imageUrl={data.imageUrl}
          name={data.name}
          birthday={data.birthday}
          gender={data.gender}
          job={data.job}
        />
      );
    })
  ) : (
    <TableRow>
      <TableCell colSpan="6" align="center">
        <CircularProgress
          className={circularProgress}
          variant="determinate"
          value={completed}
        />
      </TableCell>
    </TableRow>
  );

  return (
    <div>
      <Paper className={root}>
        <Table className={table}>
          <TableHead key="head">
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>image</TableCell>
              <TableCell>name</TableCell>
              <TableCell>job</TableCell>
              <TableCell>gender</TableCell>
              <TableCell>birthday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{customer}</TableBody>
        </Table>
      </Paper>
      <CustomerAdd action={stateRefresh}/>
    </div>
  );
}

export default withStyles(styles)(App);
