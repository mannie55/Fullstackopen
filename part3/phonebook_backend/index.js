const express = require('express')
const morgan = require('morgan')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(express.json())

morgan.token('type', (request, response) => {
  return request.headers['content-type']
} )

app.use(morgan(':url :status :response-time ms '))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]





const totalPeople = () => {
    
    return persons.length
}

app.get('/info', (request, response) => {
    let currentDate = new Date()
    let totalPeople = persons.length
    response.send(
        `
        <p>Phonebook has info for ${totalPeople} people</p>
        <p>${currentDate}</p>
        `
    )

})

app.get('/api/persons', (request, response) => {
    response.json(persons)
    response.status(200).end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})


app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})



app.post('/api/persons', (request, response) => {
  const body = request.body
  const rand = Math.floor(Math.random() * 1000) + 1
  const id = String(rand)
  const nameExist = persons.some(person => person.name === body.name)

  if (!(body.name && body.number)) {
    return response.status(404).send({Error: "name or number is missing"}).end
  } else if (nameExist) {
    console.log(nameExist)
    return response.status(404).send({Error: "name must be unique"}).end
  } else {
    const person = {
    name: body.name,
    number: body.number,
    id: id,
  }

  persons = persons.concat(person)

  response.json(person)
  }

})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
