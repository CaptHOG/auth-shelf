import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage(event) {
  const updateItem = () => {
    event.preventDefault();
  }

  return (
    <div className="container">
      <p>Info Page</p>
      <input
        placeholder="New Name"
      />
      <input
        placeholder="New Image URL"
      />
      <button onClick={updateItem}>Update Item</button>
    </div>
  );
}

export default InfoPage;
