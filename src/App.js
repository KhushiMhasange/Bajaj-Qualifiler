import React, { useState } from "react";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const payload = JSON.parse(jsonInput);
      const res = await fetch("https://qualifier-backend.onrender.com/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert("Invalid JSON input");
    }
  };

  return (
    <div>
      <h1>Frontend for API</h1>
      <textarea
        placeholder="Enter JSON"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <select
            multiple
            onChange={(e) =>
              setSelectedOptions([...e.target.selectedOptions].map(o => o.value))
            }
          >
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>

          <div>
            {selectedOptions.map((option) => (
              <p key={option}>
                <b>{option}:</b> {JSON.stringify(response[option])}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;

