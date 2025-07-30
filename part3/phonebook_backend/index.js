require('dotenv').config()
const express = require('express')
const app = express()
const Phonebook = require('./models/phonebook')


//allows to serve static content
app.use(express.static('dist'))



app.use(express.json())



const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}



app.get('/api/persons', (request, response) => {
  console.log('params:', request.params.id)
  Phonebook.find({})
    .then(contacts => {
      response.json(contacts)
      response.status(200).end()
    })

})


app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phonebook.findById(id)
    .then(contact => {
      response.json(contact)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phonebook.findByIdAndDelete(id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch((error) => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'content missing' })
  }

  const contact = new Phonebook({
    name: body.name,
    number: body.number,
  })


  contact.save()
    .then(savedContact => {
      response.json(savedContact)
    })

    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.put('api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  const id = request.params.id

  Phonebook.findById(id)
    .then((contact) => {
      if (!contact) {
        return response.status(404).end()
      }

      contact.name = name
      contact.number = number

      return contact.save()
        .then((updatedContact) => {
          response.json(updatedContact)
        })
    })

    .catch((error) => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// const cors = require('cors')
// app.use(cors())

// app.post('/api/persons', (request, response) => {
//   const body = request.body
//   const rand = Math.floor(Math.random() * 1000) + 1
//   const id = String(rand)
//   const nameExist = persons.some(person => person.name === body.name)

//   if (!(body.name && body.number)) {
//     return response.status(404).send({Error: "name or number is missing"}).end
//   } else if (nameExist) {
//     console.log(nameExist)
//     return response.status(404).send({Error: "name must be unique"}).end
//   } else {
//     const person = {
//     name: body.name,
//     number: body.number,
//     id: id,
//   }

//   persons = persons.concat(person)

//   response.json(person)
//   }

// })


// let persons = [
//     {
//       "id": "1",
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": "2",
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": "3",
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": "4",
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]





// const totalPeople = () => {

//     return persons.length
// }

// app.get('/info', (request, response) => {
//     let currentDate = new Date()
//     let totalPeople = persons.length
//     response.send(
//         `
//         <p>Phonebook has info for ${totalPeople} people</p>
//         <p>${currentDate}</p>
//         `
//     )

// })





