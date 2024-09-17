import React, { useState } from 'react';
import './App.css';
import PageContainer from './container/PageContainer';
import Header from './components/Header';
import RouterConfig from './config/RouterConfig';
import Loading from './components/Loading';
import BasketDrawer from './components/BasketDrawer';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <PageContainer>
        <Loading />
        <Header toggleDrawer={toggleDrawer} />
        <BasketDrawer open={drawerOpen} onClose={toggleDrawer} />
        <RouterConfig />
      </PageContainer>
    </div>
  );
}

export default App;
