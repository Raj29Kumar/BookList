import React, { useState, useEffect } from 'react';

const EditBook = ({ book, closeModal, onBookUpdated }) => {
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

  useEffect(() => {
    if (book) {
      setFormData({
        author: book.author || '',
        country: book.country || '',
        language: book.language || '',
        link: book.link || '',
        pages: book.pages || '',
        title: book.title || '',
        year: book.year || '',
        id: book.id || '',
      });
    }
  }, [book]);

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
      const response = await fetch(`http://64.227.142.191:8080/application-test-v1.1/books/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedBook = await response.json();  // Get the updated book data from the response
        onBookUpdated(updatedBook); 
        alert('Book edited'); // Call the parent function to update the list
        closeModal();  // Close the modal after submitting
      } else {
        console.error('Error updating book');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit Book</h2>
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
                placeholder="Enter Link"
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
                disabled // ID should not be edited directly
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

export default EditBook;
