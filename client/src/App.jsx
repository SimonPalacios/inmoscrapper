import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import TablaInmobiliaria from './components/TablaInmobiliaria';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TablaInmobiliaria />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
