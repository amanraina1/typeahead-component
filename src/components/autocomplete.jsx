/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../App.css";
import SuggestionsList from "./suggestion-list";

function Autocomplete({
  placeholder = "",
  staticData,
  fetchSuggestions,
  dataKey = "",
  customLoading = "Loading...",
  onSelect = () => {},
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  customStyles = {},
}) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }
      setSuggestions(result);
    } catch (error) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : suggestion);
    onSelect(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <div className="container">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
      />

      <ul className="suggestion-list">
        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">{customLoading}</div>}
        {!suggestions.length && !loading ? (
          <div className="error">No results found !!!!</div>
        ) : (
          <SuggestionsList
            dataKey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        )}
      </ul>
    </div>
  );
}

export default Autocomplete;
