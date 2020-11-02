import React, { useState, useEffect } from "react";

import dataService from "./services/data";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d = dataService.getAll();
    setData(d);
  }, []);

  return (
    <div>
      <p>Hello world</p>
    </div>
  );
};

export default App;
