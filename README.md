# Person Management System

A full-stack application for managing person records, built with Angular (frontend) and Node.js/Express/MongoDB (backend).

## Features

- List all persons
- Create new person records
- Edit existing person records
- Delete person records
- Responsive design with Tailwind CSS
- RESTful API backend

## Tech Stack

### Frontend
- Angular 19
- Tailwind CSS
- TypeScript
- Angular Router
- Angular HttpClient

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- Body Parser

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Angular CLI (v19 or higher)

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB service on your machine

4. Start the backend server:
```bash
node index.js
```
The server will run on http://localhost:3000

### Frontend Setup

1. Navigate to the project root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```
The application will be available at http://localhost:4200

## API Documentation

### Person Endpoints

#### GET /person
- Returns a list of all persons
- Response: Array of person objects

#### GET /person/:id
- Returns a single person by ID
- Response: Person object

#### POST /person
- Creates a new person
- Request Body:
  ```json
  {
    "Name": "string",
    "Age": "number",
    "Gender": "Male" | "Female",
    "Mobile number": "string"
  }
  ```
- Response: Created person object

#### PUT /person/:id
- Updates an existing person
- Request Body: Same as POST
- Response: Updated person object

#### DELETE /person/:id
- Deletes a person
- Response: Success message

## Data Model

### Person Schema
```javascript
{
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Age: {
    type: Number,
    required: true,
    min: 0
  },
  Gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
    trim: true
  },
  "Mobile number": {
    type: String,
    required: true,
    trim: true
  }
}
```

## Error Handling

The application includes comprehensive error handling:
- Validation errors (400 Bad Request)
- Not found errors (404 Not Found)
- Server errors (500 Internal Server Error)
- Database connection errors

## Development

### Backend Development
- The backend uses Express.js for routing
- MongoDB with Mongoose for data persistence
- CORS enabled for cross-origin requests
- Body parser for JSON request handling

### Frontend Development
- Angular components for UI
- Reactive forms for data input
- Tailwind CSS for styling
- Angular Router for navigation
- HTTP Client for API communication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
