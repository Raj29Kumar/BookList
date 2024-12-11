import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/booksSlice';

const AddBook = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    author: '', 
    country: '',
    language: '',
    link: '',
    pages: '',
    title: '',
    year: '',
    id: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addBook(formData)).unwrap(); 
      alert('Book added successfully!');
      closeModal();
    } catch (error) {
      alert('Failed to add book: ' + error.message);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          width: '600px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ marginTop: '0' }}>Add New Book</h2>
        <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
            <div style={{ flex: "1 1 50%" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Enter Author Name"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
              />
            </div>
            <div style={{ flex: "1 1 50%" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="Enter Country Name"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
            <div style={{ flex: "1 1 50%" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Language</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                placeholder="Enter Language"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
              />
            </div>
            <div style={{ flex: "1 1 50%" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Links</label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                required
                placeholder="Enter Page Count"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
            <div style={{ flex: "1 1 50%" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Pages</label>
              <input
                type="text"
                name="pages"
                value={formData.pages}
                onChange={handleChange}
                required
                placeholder="Enter Pages"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
              />
            </div>
            <div style={{ flex: "1 1 50%" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter Title"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
            <div style={{ flex: "1 1 50%" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                placeholder="Enter Year"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
              />
            </div>
            <div style={{ flex: "1 1 50%" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                placeholder="Enter ID"
                style={{
                  width: "90%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              padding: '10px 15px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={closeModal}
            style={{
              padding: '10px 15px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
