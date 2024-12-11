import React from 'react';

const EditBookModal = ({ editBookData, setEditBookData, handleEditSubmit, closeEditModal }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '10px',
                    width: '90%',
                    maxWidth: '400px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
                    Edit Book
                </h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEditSubmit(editBookData);
                    }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: 'bold', color: '#555' }}>Title</label>
                        <input
                            type="text"
                            value={editBookData?.title || ''}
                            onChange={(e) => setEditBookData({ ...editBookData, title: e.target.value })}
                            style={{
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                fontSize: '14px',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: 'bold', color: '#555' }}>Author</label>
                        <input
                            type="text"
                            value={editBookData?.author || ''}
                            onChange={(e) => setEditBookData({ ...editBookData, author: e.target.value })}
                            style={{
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                fontSize: '14px',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: 'bold', color: '#555' }}>Year</label>
                        <input
                            type="text"
                            value={editBookData?.year || ''}
                            onChange={(e) => setEditBookData({ ...editBookData, year: e.target.value })}
                            style={{
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                fontSize: '14px',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '20px',
                        }}
                    >
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={closeEditModal}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#f44336',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBookModal;
