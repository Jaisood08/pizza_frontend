import { useState } from "react";

const CakeAdd = () => {
  const [cakeAdd, setCakeAdd] = useState({
    description: "",
    type: "",
    flavour: "",
    eggless: true,
    ingredients: "",
    name: "",
    price: 0,
    weight: 0,
    image: "",
  });

  const getCake = (type, value) => {
    console.log(type, value.target.value);
    switch (type) {
      case "Name":
        setCakeAdd((temp) => {
          return { ...temp, name: value.target.value };
        });
        break;
      case "Description":
        setCakeAdd((temp) => {
          return { ...temp, description: value.target.value };
        });
        break;
      case "type":
        setCakeAdd((temp) => {
          return { ...temp, type: value.target.value };
        });
        break;
      case "flavour":
        setCakeAdd((temp) => {
          return { ...temp, flavour: value.target.value };
        });
        break;
      case "eggless":
        console.log("HERE :: ", value.target.checked);
        setCakeAdd((temp) => {
          return { ...temp, eggless: value.target.checked };
        });
        break;
      case "ingredients":
        setCakeAdd((temp) => {
          return { ...temp, ingredients: value.target.value };
        });
        break;
      case "price":
        setCakeAdd((temp) => {
          return { ...temp, price: value.target.value };
        });
        break;
      case "weight":
        setCakeAdd((temp) => {
          return { ...temp, weight: value.target.value };
        });
        break;
      case "image":
        console.log("Image :: ", value);
        setCakeAdd((temp) => {
          return { ...temp, image: value.target.value };
        });
        break;

      default:
        break;
    }
  };

  const addCake = () => {
    console.log(":: ADD CAKE OBJECT ::");

    console.log(cakeAdd);
  };

  return (
    <div>
      <div class="container">
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Add Cake</h1>
          <input
            style={{ maxWidth: "400px" }}
            onChange={(e) => {
              getCake("Name", e);
            }}
            placeholder="Name"
          />
          <br />

          <input
            style={{ maxWidth: "400px" }}
            onChange={(e) => {
              getCake("Description", e);
            }}
            placeholder="Description"
          />
          <br />

          <input
            style={{ maxWidth: "400px" }}
            onChange={(e) => {
              getCake("type", e);
            }}
            placeholder="type"
          />
          <br />

          <input
            style={{ maxWidth: "400px" }}
            onChange={(e) => {
              getCake("flavour", e);
            }}
            placeholder="flavour"
          />
          <br />

          <input
            onChange={(e) => {
              getCake("eggless", e);
            }}
            type="checkbox"
            id="eggless"
            name="eggless"
          />
          <label for="eggless"> Eggless</label>
          <br />

          <input
            style={{ maxWidth: "400px" }}
            onChange={(e) => {
              getCake("ingredients", e);
            }}
            placeholder="ingredients"
          />
          <br />

          <input
            style={{ maxWidth: "400px" }}
            onChange={(e) => {
              getCake("price", e);
            }}
            placeholder="price"
          />
          <br />

          <input
            style={{ maxWidth: "400px" }}
            onChange={(e) => {
              getCake("weight", e);
            }}
            placeholder="weight"
          />
          <br />
          <label for="cakeImage">Image</label>
          <input
            onChange={(e) => {
              getCake("image", e);
            }}
            id="cakeImage"
            name="cakeImage"
            type="file"
            accept="image/*"
          />

          <br />

          <button onClick={addCake}> Submit</button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CakeAdd;
