import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function ShelfPage() {
  const dispatch = useDispatch();
  const shelf = useSelector(store => store.shelf)
  const [itemInput, setItemInput] = useState('');
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    dispatch({
      type: 'FETCH_SHELF'
    })
  }, [])

  const addItem = (event) => {
    event.preventDefault();

    let newItem = {
      name: itemInput,
      url: urlInput
    }
    console.log('newItem:', newItem)

    dispatch({
      type: 'ADD_ITEM',
      payload: newItem
    })
  }

  // test URL
  // https://pngimg.com/uploads/apple/apple_PNG12405.png
  return (
    <div className="container">
      <h2>Shelf</h2>
      <br/>
      <h3>Add items to the shelf</h3>
      <form>
        <input
          placeholder="Item Name"
          type="text"
          value={itemInput}
          onChange={(event) => setItemInput(event.target.value)}
        />
        <input
          placeholder="Image URL"
          type="text"
          value={urlInput}
          onChange={(event) => setUrlInput(event.target.value)}
        />
      </form>
      <button onClick={addItem}>Add Item</button>
      <br/>
      <table className="itemTable">
        <thead>
          <tr>
            <th>Item</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shelf.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>
                  <img src={item.image_url} width="300px" height="200px"/>
                </td>
                <td>
                  <button>Remove Item</button>
                </td>
              </tr>
            )
          })}
          
        </tbody>
      </table>
    </div>
  );
}

export default ShelfPage;
