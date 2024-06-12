// frontend/src/App.js
import React from 'react';
import Header from './components/Header'; 
import CustomerProfile from './components/CustomerProfile';



const App = () => {
  return (
    <div className="App">
      <Header title="Customer Profile Management" />
      <CustomerProfile />
    </div>
  );
};

export default App;
