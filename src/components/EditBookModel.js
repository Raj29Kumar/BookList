import React from 'react';

const EditBookModal = ({ bookData, setBookData, handleSubmit, closeModal }) => {
    return (
        <div className="edit-modal">
            <h2>Edit Book</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(bookData);
                }}
            >
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={bookData?.title || ''}
                        onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                    />
                </div>
                <div>
                    <label>Author</label>
                    <input
                        type="text"
                        value={bookData?.author || ''}
                        onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                    />
                </div>
                <div>
                    <label>Year</label>
                    <input
                        type="text"
                        value={bookData?.year || ''}
                        onChange={(e) => setBookData({ ...bookData, year: e.target.value })}
                    />
                </div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeModal}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditBookModal;
