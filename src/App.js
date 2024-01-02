import React, { useState } from "react";

import Routing from "./Routes";
import { AuthContext, UserContext } from "./context";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(false);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Routing />
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
