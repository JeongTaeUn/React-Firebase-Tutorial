const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// MySQL DataBase Start
// const fs = require("fs");
// const data = fs.readFileSync("./database.json");
// const conf = JSON.parse(data);
// const mysql = require("mysql");
// DataBase Connection
// const connection = mysql.createConnection({
//   host: conf.host,
//   user: conf.user,
//   password: conf.password,
//   port: conf.port,
//   database: conf.database,
// });
// connection.connect();
// MySQL DataBase End

// Firebase Start
const fs = require("fs");
const data = fs.readFileSync("./conf_firebase.json");
const conf = JSON.parse(data);
const firebaseAdmin = require("firebase-admin");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    type: conf.type,
    project_id: conf.project_id,
    private_key_id: conf.private_key_id,
    private_key: conf.private_key,
    client_email: conf.client_email,
    client_id: conf.client_id,
    auth_uri: conf.auth_uri,
    token_uri: conf.token_uri,
    auth_provider_x509_cert_url: conf.auth_provider_x509_cert_url,
    client_x509_cert_url: conf.client_x509_cert_url,
  }),
  databaseURL: conf.databaseURL,
});
const db = firebaseAdmin.firestore();

//FireBase Server Timestamp
// Using Cloud Firestore
//firebaseAdmin.firestore.FieldValue.serverTimestamp()
// Using Realtime Database
//firebaseAdmin.database.ServerValue.TIMESTAMP

//FireBase Create Data Sample
// doc_id create by self
// var docRef = db.collection("test").doc("doc_id");
// docRef.set(
//   {
//     title: "second11111",
//   },
//   {
//     merge: true,
//   }
// );

// doc_id create by auto
// docRef = db
//   .collection("test")
//   .add({
//     title: "fifth",
//     content: "contents",
//   })
//   .then((ref) => {
//     console.log("Added document with ID: ", ref.id);
//   });

// For Test
app.get("/api/customers", (req, res) => {
  // Select Data
  //   connection.query("select * from table_name where isDeleted = 0", (err, rows, fields) => {
  //        res.send(rows);
  //   });
  //All data

  db.collection("test")
    .get()
    .then((snapshot) => {
      const response = [];
      snapshot.forEach((doc) => {
        response.push(doc.data());
      });
      res.send(response);
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  // for test
  // res.send([
  //   {
  //     id: 1,
  //     imageUrl: "https://placeimg.com/64/64/1",
  //     name: "customer1",
  //     birthday: "19900101",
  //     gender: "man1",
  //     job: "student1",
  //   },
  //   {
  //     id: 2,
  //     imageUrl: "https://placeimg.com/64/64/2",
  //     name: "customer2",
  //     birthday: "19900102",
  //     gender: "man2",
  //     job: "student2",
  //   },
  //   {
  //     id: 3,
  //     imageUrl: "https://placeimg.com/64/64/3",
  //     name: "customer3",
  //     birthday: "19900103",
  //     gender: "man3",
  //     job: "student3",
  //   },
  // ]);
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

  const name = req.body.name;
  const birthday = req.body.birthday;
  const gender = req.body.gender;
  const job = req.body.job;
  const image = req.file ? "/image/" + req.file.filename : null;
  const date = Date.now();

  var docRef = db.collection("test").doc(name);
  docRef.set({
    name,
    birthday,
    gender,
    job,
    imageUrl: image,
    date,
  });
  // only doc is equal name
  // const ref = db.collection("test").doc(name);
  // const doc = ref
  //   .get()
  //   .then((doc) => {
  //     console.log("single document", doc.data().name);
  //   })
  //   .catch((err) => {
  //     console.log("Error getting documents", err);
  //   });

  //All data

  //need await
  setTimeout(() => {
    db.collection("test")
      .get()
      .then((snapshot) => {
        const response = [];
        snapshot.forEach((doc) => {
          response.push(doc.data());
        });
        res.send(response);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }, 1000);

  //for test
  // res.send([
  //   {
  //     id: 1,
  //     imageUrl: "https://placeimg.com/64/64/1",
  //     name: "customer1",
  //     birthday: "19900101",
  //     gender: "man1",
  //     job: "student1",
  //   },
  //   {
  //     id: 2,
  //     imageUrl: "https://placeimg.com/64/64/2",
  //     name: "customer2",
  //     birthday: "19900102",
  //     gender: "man2",
  //     job: "student2",
  //   },
  //   {
  //     id: 3,
  //     imageUrl: "https://placeimg.com/64/64/3",
  //     name: "customer3",
  //     birthday: "19900103",
  //     gender: "man3",
  //     job: "student3",
  //   },
  //   {
  //     id: 4,
  //     imageUrl: "https://placeimg.com/64/64/4",
  //     name: "customer4",
  //     birthday: "19900104",
  //     gender: "man4",
  //     job: "student4",
  //   },
  // ]);
});

app.delete("/api/customers/:name", (req, res) => {
  // update Data
  // const sql = "update table_name set isDelete = 1 where id = ?";
  // const params = [req.params.id];
  // connection.query(sql, params, (err,rows,fields) => {
  //   res.send(rows);
  // });

  const name = req.params.name;
  // FireBase
  db.collection("test")
    .doc(name)
    .delete()
    .then(() => console.log("Document successfully deleted!"))
    .catch((err) => console.log("Error getting documents", err));

  //All data
  setTimeout(() => {
    db.collection("test")
      .get()
      .then((snapshot) => {
        const response = [];
        snapshot.forEach((doc) => {
          response.push(doc.data());
        });
        res.send(response);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }, 1000);

  // for Test
  // const testData = [
  //   {
  //     id: 1,
  //     imageUrl: "https://placeimg.com/64/64/1",
  //     name: "customer1",
  //     birthday: "19900101",
  //     gender: "man1",
  //     job: "student1",
  //   },
  //   {
  //     id: 2,
  //     imageUrl: "https://placeimg.com/64/64/2",
  //     name: "customer2",
  //     birthday: "19900102",
  //     gender: "man2",
  //     job: "student2",
  //   },
  //   {
  //     id: 3,
  //     imageUrl: "https://placeimg.com/64/64/3",
  //     name: "customer3",
  //     birthday: "19900103",
  //     gender: "man3",
  //     job: "student3",
  //   },
  // ];

  // const filterData = testData.filter((data) => data.id != req.params.id);
  // res.send(filterData);
});

app.listen(port, () => console.log(`Listening on Port ${port}`));
