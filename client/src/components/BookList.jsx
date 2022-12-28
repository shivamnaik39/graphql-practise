import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import { getAllBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';



const BookList = () => {
    const { loading, error, data } = useQuery(getAllBooksQuery)

    const [selectedBook, setSelectedBook] = useState(null)

    const displayBooks = () => {
        if (loading) return <div>Loading...</div>

        else if (data) {
            return (
                <div id="books">
                    <ul>
                        {data.books.map(book => <li key={book.id} onClick={() => setSelectedBook(book.id)}>{book.name}</li>)}
                    </ul>
                </div>
            )
        }

        else if (error) return <div>Something went wrong...</div>
    }

    return (
        <div id="book-list" >
            {displayBooks()}
            <BookDetails bookId={selectedBook} />
        </div>
    )
}

export default BookList