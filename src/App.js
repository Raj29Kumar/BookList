import React from 'react';
import BookList from './components/BookList';

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Book List</h1>
      <BookList />
    </div>
  );
};

export default App;

