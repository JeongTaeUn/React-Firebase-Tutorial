import React, { useEffect, useState } from "react";
import "./App.css";
import Customer from "./components/Customer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TableRow, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    whith: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
});

function App() {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  }, []);

  const callApi = async () => {
    const respons = await fetch("/api/customers");
    const body = await respons.json();
    return body;
  };

  const customer = customers ? customers.map((data) => {
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
  }) : null;

  const { root, table } = styles;
  return (
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
  );
}

export default withStyles(styles)(App);
