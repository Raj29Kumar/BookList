import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch books from the API
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await fetch('http://64.227.142.191:8080/application-test-v1.1/books');
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  const data = await response.json();
  return data.data || []; 
});

// Add a new book via POST request
export const addBook = createAsyncThunk('books/addBook', async (bookData) => {
  const response = await fetch('http://64.227.142.191:8080/application-test-v1.1/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData), 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add book');
  }

  const data = await response.json();
  return data; 
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Handling fetchBooks
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Handling addBook
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.loading = false;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
