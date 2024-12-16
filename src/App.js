import React from 'react';
import BookList from './components/BookList';
import './App.css'; // Assuming the CSS file is named App.css
import BookSearch from './compo/BookSearch';

const App = () => {
  return (
    <div>
      <h1 className="app-header">Book List</h1>
      <BookList />

      {/* <BookSearch /> */}
    </div>
  );
};

export default App;
