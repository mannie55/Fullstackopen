# 📞 Phonebook Backend

This is a simple Express.js backend for managing a phonebook. It supports the following features:

- Get a list of all persons
- Get a single person by ID
- Delete a person by ID
- Add a new person
- Display phonebook info (count + timestamp)

## 🚀 Live Demo

👉 [View the deployed app](https://phonebook-api-9wpi.onrender.com)

_(Replace the link with your actual Render deployment URL)_

## 📦 API Endpoints

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| GET    | `/api/persons`    | Get all persons            |
| GET    | `/api/persons/:id`| Get a person by ID         |
| DELETE | `/api/persons/:id`| Delete a person by ID      |
| POST   | `/api/persons`    | Add a new person           |
| GET    | `/info`           | Get info about the phonebook |

## 🛠️ Local Development

### Start the server

```bash
npm install
npm run dev  # or node index.js
