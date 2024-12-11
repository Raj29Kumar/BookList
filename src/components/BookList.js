import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/booksSlice';
import Pagination from './Pagination';
import AddBook from './AddBook';
import EditBookModal from './EditBookModel';

const BookList = () => {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('title');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editBookData, setEditBookData] = useState(null);

    const itemsPerPage = 5;
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const filteredBooks = books.filter((book) =>
        book.title?.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        } else if (filteredBooks.length === 0) {
            setCurrentPage(1);
        }
    }, [filteredBooks, currentPage, itemsPerPage]);

    const sortBooks = (books) => {
        return books.sort((a, b) => {
            if (a[sortField] < b[sortField]) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const sortedBooks = sortBooks(filteredBooks);

    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openEditModal = (book) => {
        setEditBookData({ ...book });
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditBookData(null);
        setEditModalOpen(false);
    };

    const handleEditSubmit = async (updatedBook) => {
        try {
            const response = await fetch(`http://64.227.142.191:8080/application-test-v1.1/books/${updatedBook.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update book');
            }

            dispatch(fetchBooks());
            closeEditModal();
        } catch (error) {
            console.error('Error updating book:', error.message);
        }
    };

    if (loading) {
        return <p style={{ display: 'flex', justifyContent: 'center' }}>Loading books...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <SearchBar query={query} setQuery={setQuery} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="sortField" style={{ marginRight: '10px' }}>Sort by: </label>
                    <select
                        id="sortField"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                    >
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                    </select>
                </div>

                <div style={{ flex: 1, textAlign: 'center' }}>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: 'gray',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {sortOrder === 'asc' ? 'Click To Descending' : 'Click To Ascending'}
                    </button>
                </div>

                <div style={{ flex: 1, textAlign: 'right' }}>
                    <button onClick={openModal} style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Add New Book
                    </button>
                </div>

                {isModalOpen && <AddBook closeModal={closeModal} />}
            </div>

            <ul>
                {currentBooks.length > 0 ? (
                    currentBooks.map((book) => (
                        <li
                            key={book.id}
                            style={{
                                listStyle: 'none',
                                margin: '10px 0',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div>
                                <strong>Title:</strong> {book.title || 'N/A'}
                                <br />
                                <strong>Author:</strong> {book.author || 'N/A'}
                                <br />
                                <strong>Year:</strong> {book.year || 'N/A'}
                            </div>

                            <div>
                                <button
                                    onClick={() => openEditModal(book)}
                                    style={{
                                        marginRight: '10px',
                                        padding: '5px 10px',
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No books found.</p>
                )}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
            />

            {isEditModalOpen && (
                <EditBookModal
                    editBookData={editBookData}
                    setEditBookData={setEditBookData}
                    handleEditSubmit={handleEditSubmit}
                    closeEditModal={closeEditModal}
                />
            )}
        </div>
    );
};

export default BookList;
