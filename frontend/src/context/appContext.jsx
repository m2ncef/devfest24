import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [isNavMenuClose, setIsNavMenuClose] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  const navMenu = {
    collapse: () => setIsNavMenuClose(!isNavMenuClose),
  };

  const value = {
    state: {
      isNavMenuClose,
      isUploadModalVisible,
    },
    appContextAction: {
      navMenu,
      setIsUploadModalVisible,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
