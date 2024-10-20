import Autocomplete from "./components/autocomplete";

function App() {
  const staticData = [
    "apple",
    "banana",
    "berryl",
    "orange",
    "grape",
    "mango",
    "lemon",
    "melon",
    "berry",
    "cherry",
    "peach",
    "plum ",
  ];

  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipe/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes;
  };

  return (
    <div>
      <h1>TypeAhead / AutoComplete</h1>
      <Autocomplete
        placeholder={"Enter Recipe"}
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoading={<>Loading Recipes....</>}
        onSelect={(res) => console.log(res)}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}}
      />
    </div>
  );
}

export default App;
