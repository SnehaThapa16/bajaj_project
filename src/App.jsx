import React, { useState } from "react";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const backendURL = "YOUR_BACKEND_URL/bfhl"; // Replace with your actual backend URL

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput); // Validate JSON
      setError("");

      const res = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFilters((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  return (
    <div>
      <h1>JSON Input</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON: { "data": ["A","C","z"] }'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <>
          <h2>Filters</h2>
          <label>
            <input type="checkbox" value="alphabets" onChange={handleFilterChange} />
            Alphabets
          </label>
          <label>
            <input type="checkbox" value="numbers" onChange={handleFilterChange} />
            Numbers
          </label>
          <label>
            <input type="checkbox" value="highestAlphabet" onChange={handleFilterChange} />
            Highest Alphabet
          </label>

          <h2>Response</h2>
          <pre>
            {JSON.stringify(
              selectedFilters.length > 0
                ? selectedFilters.reduce((acc, key) => {
                    acc[key] = response[key];
                    return acc;
                  }, {})
                : response,
              null,
              2
            )}
          </pre>
        </>
      )}
    </div>
  );
};

export default App;
