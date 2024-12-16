import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, fetchBooks } from '../redux/booksSlice';
import '../App.css';

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
      // Dispatch the addBook action
      const newBook = await dispatch(addBook(formData)).unwrap(); 
      alert('Book added successfully!');
      
      // After adding the book, you may want to fetch the updated list of books
      dispatch(fetchBooks()); // Ensure books are updated in the state

      // Close the modal
      closeModal();
    } catch (error) {
      alert('Failed to add book: ' + error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Enter Author Name"
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="Enter Country Name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Language</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                placeholder="Enter Language"
              />
            </div>
            <div className="form-group">
              <label>Links</label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                required
                placeholder="Enter Page Count"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Pages</label>
              <input
                type="text"
                name="pages"
                value={formData.pages}
                onChange={handleChange}
                required
                placeholder="Enter Pages"
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter Title"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                placeholder="Enter Year"
              />
            </div>
            <div className="form-group">
              <label>ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                placeholder="Enter ID"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
