import BookList from "./components/BookList";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Axiom's Reading List</h1>
        <BookList />
        <AddBook />

      </div>
    </ApolloProvider>
  );
}

export default App;
