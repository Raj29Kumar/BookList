import React, { useState, useEffect } from 'react';
import '../App.css';
import BookListComponent from '../components/BookListComponent'; // Import the BookListComponent

const BookSearch = () => {
    const [title, setTitle] = useState('');   // State to store the search query
    const [books, setBooks] = useState([]);    // State to store the API response
    const [loading, setLoading] = useState(false); // State to track loading status
    const [debouncedTitle, setDebouncedTitle] = useState(''); // State to store the debounced value

    // Debounce the input to wait before making the API request
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedTitle(title);
        }, 500); // 500ms delay before triggering the API request after user stops typing

        // Clean up timeout on each render
        return () => clearTimeout(timeoutId);
    }, [title]);

    // Function to fetch books from the API based on the title search
    useEffect(() => {
        if (debouncedTitle.trim() === '') {
            setBooks([]);
            return;
        }

        const fetchBooks = async () => {
            setLoading(true);  // Start loading before fetching data

            try {
                const response = await fetch(`http://64.227.142.191:8080/application-test-v1.1/books?title=${debouncedTitle}`);
                const data = await response.json();  // Parse the response JSON
                setBooks(data.data);  // Use data.data to set the books state (extract the array of books)
            } catch (error) {
                console.error('Error fetching data:', error);
                setBooks([]);  // Set books to empty array on error
            } finally {
                setLoading(false);  // Stop loading after request finishes
            }
        };

        if (debouncedTitle) {
            fetchBooks();
        }

    }, [debouncedTitle]); // Only trigger fetch when debouncedTitle changes

    // Handle the Enter key press for search
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setDebouncedTitle(title); // Trigger the debounce mechanism
        }
    };

    const openEditModal = (book) => {
        // If you want to implement the edit functionality, you can define this here.
        console.log('Edit Book:', book);
    };

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Update title as user types
                onKeyDown={handleKeyPress} // Detect Enter key press
                placeholder="Search by book title"
            />

            {loading && <p>Loading...</p>}  {/* Show loading text while fetching data */}

            <div>
                {books.length === 0 && !loading && <p>No books found</p>}
                {/* Use BookListComponent to display the list of books */}
                <BookListComponent currentBooks={books} openEditModal={openEditModal} />
            </div>
        </div>
    );
};

export default BookSearch;
