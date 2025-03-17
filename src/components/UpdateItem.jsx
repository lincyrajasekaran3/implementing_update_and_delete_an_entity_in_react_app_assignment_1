import { useState, useEffect } from 'react';

const UpdateItem = () => {
  const [item, setItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState('');
  const [response, setResponse] = useState(null);
  const API_URI = 'your_api_uri_here'; // Replace with actual API URI

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const res = await fetch(`${API_URI}/item`);
      const data = await res.json();
      setItem(data);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const handleInputChange = (e) => {
    setUpdatedItem(e.target.value);
  };

  const updateItem = async () => {
    try {
      const res = await fetch(`${API_URI}/item`, {
        method: 'PUT', // or 'PATCH'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...item, updatedItem }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
      {item && (
        <div>
          <h3>Existing Item</h3>
          <p>{item.name}</p>
        </div>
      )}
      <input
        type="text"
        value={updatedItem}
        onChange={handleInputChange}
        placeholder="Update item"
      />
      <button onClick={updateItem}>Update</button>
      {response && <p>Response: {JSON.stringify(response)}</p>}
    </div>
  );
};

export default UpdateItem;
