import React, { useState } from "react";

import Routing from "./Routes";
import { AuthContext } from "./context";

const App = () => {
  const [token, setToken] = useState(false);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Routing />
    </AuthContext.Provider>
  );
};

export default App;
