import React from 'react';
import './EditBookModel';

const EditBookModal = ({ editBookData, setEditBookData, handleEditSubmit, closeEditModal }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">Edit Book</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEditSubmit(editBookData);
                    }}
                    className="modal-form"
                >
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={editBookData?.title || ''}
                            onChange={(e) => setEditBookData({ ...editBookData, title: e.target.value })}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <input
                            type="text"
                            value={editBookData?.author || ''}
                            onChange={(e) => setEditBookData({ ...editBookData, author: e.target.value })}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Year</label>
                        <input
                            type="text"
                            value={editBookData?.year || ''}
                            onChange={(e) => setEditBookData({ ...editBookData, year: e.target.value })}
                            className="form-input"
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="save-button">Save Changes</button>
                        <button type="button" onClick={closeEditModal} className="cancel-button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBookModal;
