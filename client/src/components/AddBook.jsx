import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';
import { addBookMutation, getAllAuthorsQuery, getAllBooksQuery } from '../queries/queries';



const AddBook = () => {
    const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(getAllAuthorsQuery)

    const [BookData, setBookData] = useState({
        bookName: "",
        genre: "",
        authorId: ""
    })

    const [addBook, { data: addBookData, loading: addBookLoading, error: addBookError }] = useMutation(addBookMutation)


    const displayAuthors = () => {
        if (authorsLoading) <option disabled>Loading...</option>

        else if (authorsData) {
            return authorsData.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
        }

        else if (authorsError) return <option>Something went wrong...</option>
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(BookData);
        addBook({
            variables: {
                name: BookData.bookName,
                genre: BookData.genre,
                authorId: BookData.authorId
            },
            refetchQueries: [{ query: getAllBooksQuery }]
        })

        if (addBookData) {
            console.log(addBookData);
            return alert("Book added successfully!")
        }
        else if (addBookError) alert("Something went wrong!")

        setBookData({
            bookName: "",
            genre: "",
            authorId: ""
        })

    }

    return (
        <form id="add-book" onSubmit={onSubmit}>

            <div className="field">
                <label>Book name:</label>
                <input type="text" value={BookData.bookName} onChange={(e) => setBookData({ ...BookData, bookName: e.target.value })} />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" value={BookData.genre} onChange={(e) => setBookData({ ...BookData, genre: e.target.value })} />
            </div>

            <div className="field">
                <label>Author:</label>
                <select value={BookData.authorId} onChange={(e) => setBookData({ ...BookData, authorId: e.target.value })}>
                    <option value={null}>Select Author</option>
                    {displayAuthors()}
                </select>
            </div>

            <button>+</button>

        </form>
    )
}

export default AddBook