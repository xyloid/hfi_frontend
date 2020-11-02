import React, { useState, useEffect } from "react";

import dataService from "./services/data";

const App = () => {
  const [data, setData] = useState([]);

  useEffect( async () => {
    const d = await dataService.getAll();
    setData(d);
  }, []);

  console.log(data);

  return (
    <div>
      <p>HFI Assessment</p>

      <h2>Data</h2>
      <ol>
        {data.map((d) => (
          <li key={d.id}>
            {" "}
            {d.name}, {d.gender}, {d.age}{" "}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
