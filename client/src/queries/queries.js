import { gql } from "@apollo/client/core"

export const getAllBooksQuery = gql`
query GetAllBooks{
        books{
            id
            name
        }
}
`

export const getAllAuthorsQuery = gql`
query GetAllAuthors{
        authors{
            id
            name
        }
}
`

export const addBookMutation = gql`
mutation AddBook($name:String!, $genre:String!, $authorId:ID!){
    addBook(name:$name genre:$genre authorId:$authorId){
        name
        id
    }
}
`

export const getBookQuery = gql`
    query AddBook($id:ID){
        book(id:$id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`