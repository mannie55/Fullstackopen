import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)


  const hook = () => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled  ');
        
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    persons.some(person => person.name === newName) ? alert(`${newName} is already added to phonebook`) :
    (
      () => {
        const contactObject = {
          name: newName,
          number: newNumber,
          id: String(persons.length + 1),
        }
        personsService
          .create(contactObject)
          .then(returnedContact => {

            setMessage(`Added ${returnedContact.name}`)

            setTimeout(() =>
            setMessage(null), 4000)
            setPersons(persons.concat(returnedContact))

            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error.response.data.error)
            setMessage(`${error.response.data.error}`)
            setTimeout(() => setMessage(null), 3000)
            setNewName('')
            setNewNumber('')
    })
      }
    )()
  }
  
 const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
  
 }

 const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
 }

  const handleSearchChange = (event) => {
  setSearchTerm(event.target.value)
 }

const filteredPersons = persons.filter(person =>
  person.name.toLowerCase().includes(searchTerm.toLowerCase())
)

const deletePersonOf = (id) => {
  const getPerson = persons.find(person => person.id === id)

  if (window.confirm(`Delete ${getPerson.name}?`)) {
    personsService
      .deleteData(id)
      .then(deletedPerson => {
        alert(`${deletedPerson.name} has been deleted successfully`)
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(`${error.response.data}: the contact '${getPerson.name}' was already deleted from server`)
      })
      
  }
}



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h3>Add a new Contact</h3>
      <PersonForm nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnchange={handleNumberChange} submit={addName} />
      <h2>Numbers</h2>
        {/* {filteredPersons.map(person =>
        <Persons key={person.id} person={person}
        deletePerson={() => deletePersonOf(person.id)}
        />
        )} */}
      <Persons filteredContact={filteredPersons} deletePerson={deletePersonOf}/>
    </div>
  )
}

export default App