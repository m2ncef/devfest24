import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import AppRouter from '@/router/AppRouter';
import { AppContextProvider, useAppContext } from '@/context/appContext';
import UploadModal from '@/pages/UploadWork/UploadModal';
import '@/style/app.css';
const AppContent = () => {
  const {
    state: { isUploadModalVisible },
    appContextAction: { setIsUploadModalVisible },
  } = useAppContext();

  return (
    <>
      <AppRouter />
      <UploadModal visible={isUploadModalVisible} onCancel={() => setIsUploadModalVisible(false)} />
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <AppContent />
      </AppContextProvider>
    </Provider>
  );
}

export default App;
