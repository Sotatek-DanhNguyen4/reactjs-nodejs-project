import logo from './logo.svg';
import './App.css';
import CountryList from './CountryList';
import React from 'react';

function App() {
    return (
        <div className="App">
            <CountryList /> {/* <- This renders your component */}
        </div>
    );
}

export default App;
