const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { default: mongoose } = require('mongoose')
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()

// cross origin requests
app.use(cors())

mongoose.connect("mongodb://localhost:27017/bookstore")
mongoose.connection.once('open', () => console.log("Database connected..."))
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT = process.env.PORT | 5000

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}...`)
})