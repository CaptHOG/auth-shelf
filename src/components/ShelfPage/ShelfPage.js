import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function ShelfPage() {
  const dispatch = useDispatch();
  const shelf = useSelector(store => store.shelf)
  const user = useSelector(store => store.user)
  const [itemInput, setItemInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: 'FETCH_SHELF'
    })
  }, [])

  // POST
  const addItem = (event) => {
    event.preventDefault();

    let newItem = {
      description: itemInput,
      image_url: urlInput,
      user_id: user.id
    }
    console.log('newItem:', newItem)

    dispatch({
      type: 'ADD_ITEM',
      payload: newItem
    })
  }

  // DELETE
  const deleteItem = (item) => {
    let userAndItemId = {
      itemId: item.id,
      user_id: user.id
    }
    dispatch({
      type: 'SAGA_DELETE_ITEM',
      payload: userAndItemId
    })
  }

  const updateItem = (item) => {
    console.log('item:', item)
    history.push('/info')
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
                  <button onClick={() => deleteItem(item)}>Remove Item</button>
                  <button onClick={() => updateItem(item)}>Edit Item</button>
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
