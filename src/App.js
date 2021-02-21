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

const customers = [
  {
    id: 1,
    imageUrl: "https://placeimg.com/64/64/1",
    name: "customer1",
    birthday: "19900101",
    gender: "man",
    job: "student",
  },
  {
    id: 2,
    imageUrl: "https://placeimg.com/64/64/2",
    name: "customer2",
    birthday: "19900102",
    gender: "man",
    job: "student",
  },
  {
    id: 3,
    imageUrl: "https://placeimg.com/64/64/3",
    name: "customer3",
    birthday: "19900103",
    gender: "man",
    job: "student",
  },
];

function App() {
  const customer = customers.map((data) => {
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
  });

  const { root, table } = styles;
  return (
    <Paper className={root}>
      <Table className={table}>
        <TableHead>
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
