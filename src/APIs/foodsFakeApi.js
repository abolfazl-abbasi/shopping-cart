import axios from "axios";

const groups = [
  { id: "", name: "All" },
  { id: "51314b59-b502-cd1b88dc3245", name: "Pizzas" },
  { id: "d655a065-0081-ae96bc7aa3ab", name: "Burgers" },
  { id: "312871ee-158a1768bd286da6S", name: "Steaks" },
  { id: "722c9fea-34076b719ea88f91", name: "Pastas" },
];

export async function getProducts() {
  const { data } = axios.get("/cartItems");
  return [...data];
}

export function getGroups() {
  return groups;
}
