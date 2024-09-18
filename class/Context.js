import React, {createContext, useContext, useRef} from 'react';

const MyContext = createContext();

export const MyProvider = ({children}) => {
  const childRef = useRef();

  return <MyContext.Provider value={{childRef}}>{children}</MyContext.Provider>;
};

export const useMyContext = () => useContext(MyContext);
