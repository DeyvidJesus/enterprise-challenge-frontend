import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import "./styles/global.css"
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <main className='h-screen w-screen max-w-full flex-col flex items-center bg-cover bg-[url(/background.jpg)]'>
        <h1 className='text-7xl text-white font-bold mt-6 mb-10'>New Player</h1>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/dashboard" Component={Dashboard} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
