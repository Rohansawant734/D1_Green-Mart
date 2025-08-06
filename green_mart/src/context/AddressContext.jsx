 
import { createContext, useContext, useState } from "react";
// export const useAddress = () => useContext(AddressContext);
const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <AddressContext.Provider value={{ selectedAddress, setSelectedAddress }}>
      {children}
    </AddressContext.Provider>
  );
};


