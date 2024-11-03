import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { fetchItems, addItem, updateItem, deleteItem } from './redux/thunks';
import { toggleTheme } from './redux/slices';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, theme, status } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(addItem({ name: 'New Item' }));
  };

  const handleUpdate = (id: number) => {
    dispatch(updateItem({ id, name: 'Updated Item' }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteItem(id));
  };

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <h1>CRUD App with TypeScript</h1>
      <button onClick={() => dispatch(toggleTheme())}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      <button onClick={handleAdd}>Add Item</button>
      
      {status === 'loading' && <p>Loading...</p>}
      
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleUpdate(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
