
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';



const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Header/>
      <HomePage/>  
    </React.StrictMode>,
  );
} else {
  console.error("No se encontró el elemento 'root'.");
}
