import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useReduxStore from "../../hooks/useReduxStore";

function ItemTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ADD_TO_SHELF" });
  }, [dispatch]);
}

{
  shelf.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.description}</td>
        <td>
          <img src={item.image_url} width="300px" height="200px" />
        </td>
        <td>
          <button>Remove Item</button>
        </td>
      </tr>
    );
  });
}

export default ItemTable;
