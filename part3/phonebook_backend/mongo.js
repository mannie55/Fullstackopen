const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give complete credentials')
    process.exit(1) 
} else if (process.argv.length === 5) {
    const password = process.argv[2]
    const personName = process.argv[3]
    const personNumber = Number(process.argv[4])


    const url = `mongodb+srv://mannnie55:${password}@cluster0.nylhhhy.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number,
    })

    const Phonebook = mongoose.model('Phonebook', phonebookSchema)

    const phoneBook = new Phonebook({
    name: personName,
    number: personNumber,
    })

    phoneBook.save()
        .then(result => {
        console.log(`added ${personName} number ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
} else if (process.argv.length === 3) {
    const password = process.argv[2]

    const url = `mongodb+srv://mannnie55:${password}@cluster0.nylhhhy.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number,
    })

    const Phonebook = mongoose.model('Phonebook', phonebookSchema)

    Phonebook.find({})
        .then(result => {
        console.log("phonebook:");
        
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
            
        })
        mongoose.connection.close()
    })
        .catch(err => {
            console.error("Error fetching phonebook:", err);
            mongoose.connection.close()
        })

} else {
    console.log('usage is either with password or password and data');
    
}


