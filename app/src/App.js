import React from 'react';
import './App.css';
import Header from './components/Header';
import Uploader from './pages/Uploader';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header></Header>
        <main>
          <Uploader></Uploader>
        </main>
      </div>
    );
  }
}

export default App;
