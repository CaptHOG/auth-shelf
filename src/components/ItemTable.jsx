import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function ItemTable() {
  const dispatch = useDispatch();
  const shelf = useSelector(store => store.shelf)
  const history = useHistory();
  const user = useSelector(store => store.user)

  useEffect(() => {
    dispatch({ type: 'FETCH_SHELF' });
  }, []);

  const infoView = (item) => {
    console.log('item:', item)
    history.push('/info')
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

  return (
    <>
      {shelf.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.description}</td>
            <td>
              <img src={item.image_url} width="300px" height="200px"/>
            </td>
            <td>
              <button onClick={() => deleteItem(item)}>Remove Item</button>
              <button onClick={() => infoView(item)}>Edit Item</button>
            </td>
          </tr>
        )
      })}
    </>
  )
  
}

  
export default ItemTable;