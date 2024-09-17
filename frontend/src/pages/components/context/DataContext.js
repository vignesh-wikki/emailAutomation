
import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState('');
 
  const setSharedData = (newData) => {
    setData(newData);
  };
   

  return (
    <DataContext.Provider value={{ data, setSharedData}}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
