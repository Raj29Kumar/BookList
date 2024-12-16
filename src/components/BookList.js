import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/booksSlice';
import Pagination from './Pagination';
import AddBook from './AddBook';
import EditBookModal from './EditBookModel';
import '../App.css';
import BookSearch from '../compo/BookSearch';
import BookListComponent from './BookListComponent';  // Import the new component

const BookList = () => {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('title');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editBookData, setEditBookData] = useState(null);

    const itemsPerPage = 4;
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
        return <p className="loading">Loading books...</p>;
    }

    if (error) {
        return <p className="error">Error: {error}</p>;
    }

    return (
        <div className="book-list-container">
            <BookSearch />

            <div className="controls">
                <div className="sort-controls">
                    <label htmlFor="sortField">Sort by: </label>
                    <select
                        id="sortField"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                    >
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                    </select>
                </div>

                <div className="sort-button">
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="toggle-sort-order-btn"
                    >
                        {sortOrder === 'asc' ? 'Click To Descending' : 'Click To Ascending'}
                    </button>
                </div>

                <div className="add-book">
                    <button onClick={openModal} className="add-book-btn">
                        Add New Book
                    </button>
                </div>

                {isModalOpen && <AddBook closeModal={closeModal} />}
            </div>

            {/* Use the BookListComponent */}
            <BookListComponent currentBooks={currentBooks} openEditModal={openEditModal} />

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
