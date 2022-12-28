import React from 'react'
import { useQuery } from '@apollo/client/react'
import { getBookQuery } from '../queries/queries'

const BookDetails = ({ bookId }) => {

    const { data: BookDetails, error: BookDetailsError, loading: BookDetailsLoading } = useQuery(getBookQuery, { variables: { id: bookId } })

    const displayBookDetails = () => {
        if (BookDetailsLoading) return <div>Loading...</div>

        else if (BookDetails && bookId) {
            return (
                <div id="book-details">
                    <h4>{BookDetails.book.name}  </h4>
                    <p>{BookDetails.book.genre} </p>
                    <p>{BookDetails.book.author.name} </p>
                    <br />
                    <p>Other Books written by the same author</p>
                    <ul>
                        {BookDetails.book.author.books.filter(book => book.id !== bookId).map(book => <li key={book.id}>{book.name}</li>)}
                    </ul>
                </div>
            )
        }

        else if (BookDetailsError) return <div>Something went wrong...</div>

        else {
            return null
        }
    }

    return (
        <div>
            <h3>Book Details</h3>
            {displayBookDetails()}
        </div>
    )
}

export default BookDetails