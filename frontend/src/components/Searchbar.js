import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TableRow({ rowData, addToMeal }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleButtons = () => {
    setIsOpen(!isOpen);
  };

  return (
    <tr>
      <td>{rowData["name"]}</td>
      <td>{rowData["calories_100g"]}</td>
      <td>{rowData["proteins"]}</td>
      <td>{rowData["carbohydrates"]}</td>
      <td>{rowData["fats"]}</td>
      <td>
        <button className="btn btn-dark" onClick={toggleButtons}>
          Add to a Meal
        </button>
        {isOpen && (
          <div>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => addToMeal(rowData, "breakfast")}
            >
              Breakfast
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => addToMeal(rowData, "lunch")}
            >
              Lunch
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => addToMeal(rowData, "dinner")}
            >
              Dinner
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

function FoodTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      try {
        const response = await fetch(
          `http://localhost:8000/food/${searchTermLower}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const addToMeal = async (food, meal) => {
    const requestData = {
      mealBase: { type: meal },
      foodItem: {
        name: food["name"],
        calories_100g: food["calories_100g"],
        proteins: food["proteins"],
        carbohydrates: food["carbohydrates"],
        fats: food["fats"],
      },
      food_name: food["name"],
    };
    console.log(JSON.stringify(requestData)); // for debugging.

    try {
      const response = await fetch(
        `http://localhost:8000/meals/food/${food["name"]}?quantity=100`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (response.ok) {
        console.log("Food added to meal successfully");
      } else {
        console.error("Failed to add food to meal");
      }
    } catch (error) {
      console.error("Error adding food to meal:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for foods"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-dark" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Calories (100g)</th>
              <th>Proteins (100g)</th>
              <th>Carbs (100g)</th>
              <th>Fats (100g)</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((food, index) => (
              <TableRow key={index} rowData={food} addToMeal={addToMeal} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FoodTable;