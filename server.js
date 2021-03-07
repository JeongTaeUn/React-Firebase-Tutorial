const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// DataBase
// const fs = require("fs");
// const data = fs.readFileSync("./database.json");
// const conf = JSON.parse(data);
// const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: conf.host,
//   user: conf.user,
//   password: conf.password,
//   port: conf.port,
//   database: conf.database,
// });
// connection.connect();

// app.get("/api/customers", (req, res) => {
//   connection.query("select * from table_name where isDeleted = 0", (err, rows, fields) => {
//        res.send(rows);
//   });
// });

// For Test
app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      imageUrl: "https://placeimg.com/64/64/1",
      name: "customer1",
      birthday: "19900101",
      gender: "man1",
      job: "student1",
    },
    {
      id: 2,
      imageUrl: "https://placeimg.com/64/64/2",
      name: "customer2",
      birthday: "19900102",
      gender: "man2",
      job: "student2",
    },
    {
      id: 3,
      imageUrl: "https://placeimg.com/64/64/3",
      name: "customer3",
      birthday: "19900103",
      gender: "man3",
      job: "student3",
    },
  ]);
});

//for file upload
// image upload aws A3 is good
const multer = require("multer");
const upload = multer({ dest: "./upload" });

app.use("/image", express.static("./upload"));

app.post("/api/customers", upload.single("image"), (req, res) => {
  // insert Data
  // const sql = "insert into customer values (null,?,?,?,?,?,now(),0)";
  // const image = "/image/" + req.file.filename;
  // const name = req.body.name;
  // const birthday = req.body.birthday;
  // const gender = req.body.gender;
  // const job = req.body.job;
  // const params = [image, name, birthday, gender, job, 0];
  // connection.query(sql, params, (err,rows,fields) => {
  //   res.send(rows);
  // });
  //for test
  res.send([
    {
      id: 1,
      imageUrl: "https://placeimg.com/64/64/1",
      name: "customer1",
      birthday: "19900101",
      gender: "man1",
      job: "student1",
    },
    {
      id: 2,
      imageUrl: "https://placeimg.com/64/64/2",
      name: "customer2",
      birthday: "19900102",
      gender: "man2",
      job: "student2",
    },
    {
      id: 3,
      imageUrl: "https://placeimg.com/64/64/3",
      name: "customer3",
      birthday: "19900103",
      gender: "man3",
      job: "student3",
    },
    {
      id: 4,
      imageUrl: "https://placeimg.com/64/64/4",
      name: "customer4",
      birthday: "19900104",
      gender: "man4",
      job: "student4",
    },
  ]);
});

app.delete("/api/customers/:id", (req, res) => {
  // update Data
  // const sql = "update table_name set isDelete = 1 where id = ?";
  // const params = [req.params.id];
  // connection.query(sql, params, (err,rows,fields) => {
  //   res.send(rows);
  // });

  const testData = [
    {
      id: 1,
      imageUrl: "https://placeimg.com/64/64/1",
      name: "customer1",
      birthday: "19900101",
      gender: "man1",
      job: "student1",
    },
    {
      id: 2,
      imageUrl: "https://placeimg.com/64/64/2",
      name: "customer2",
      birthday: "19900102",
      gender: "man2",
      job: "student2",
    },
    {
      id: 3,
      imageUrl: "https://placeimg.com/64/64/3",
      name: "customer3",
      birthday: "19900103",
      gender: "man3",
      job: "student3",
    },
  ];

  const filterData = testData.filter((data) => data.id != req.params.id);
  res.send(filterData);
});

app.listen(port, () => console.log(`Listening on Port ${port}`));
