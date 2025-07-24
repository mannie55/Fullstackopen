const Persons = ({ filteredContact, deletePerson}) => {
  return (
    <div>
        {filteredContact.map(person =>
          <p key={person.id}> {person.name} {person.number} 
          <button onClick={() => deletePerson(person.id)}> delete</button>
          </p>
        )}
        
    </div>
  )
}


export default Persons


// const Persons = ({ person, deletePerson }) => {
//   console.log(person);
  
//   return (
//     <div>
//       <p key={person.id}> {person.id}{person.name} {person.number} <button onClick={deletePerson}>delete</button></p>
      
//     </div>
    
//   )
// }

// export default Persons