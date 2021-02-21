const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(port, () => console.log(`Listening on Port ${port}`));
