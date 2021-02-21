import "./App.css";
import Customer from "./components/Customer";

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
  return customers.map((data) => {
    return (
      <div>
        <Customer
          key={data.id}
          id={data.id}
          imageUrl={data.imageUrl}
          name={data.name}
          birthday={data.birthday}
          gender={data.gender}
          job={data.job}
        />
      </div>
    );
  });
}

export default App;
