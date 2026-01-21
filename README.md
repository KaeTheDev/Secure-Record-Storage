#  Lab 2: Secure Record Storage

##  Overview
This lab enhances a pre-existing Notes API by adding authorization logic to ensure data ownership and privacy. While the API already supports authentication and full CRUD functionality, it initially allows any authenticated user to access any note. Your task is to fix this security flaw by restricting note access to the user who created it.

##  Workplace Context
In real-world applications, authentication alone is not enough. Applications must also enforce authorization rules to ensure users can only access resources they own. This lab simulates a common backend security requirement: protecting user-generated content from unauthorized access or modification.

##  Learning Objectives
By completing this lab, you will be able to:

* Associate database records with authenticated users.
* Implement ownership-based authorization using MongoDB and Mongoose.
* Secure API routes to prevent unauthorized access.
* Return appropriate HTTP status codes for forbidden actions.
* Apply real-world security best practices to an existing codebase.

##  Description

This lab focuses on securing a Notes API by ensuring that users can only create, view, update, and delete their own notes.
Key improvements include:

* Associating each note with the user who created it.
* Filtering queries so users only see their own data.
* Preventing users from modifying or deleting notes they do not own.
* Returning meaningful error responses when authorization fails.


##  Resources

*  Express Documentation - https://expressjs.com
*  Mongoose Documentation - https://mongoosejs.com/docs/guide.html
*  bcrypt Documentation - https://www.npmjs.com/package/bcrypt
*  jsonwebtoken Documentation - https://www.npmjs.com/package/jsonwebtoken
*  dotenv Documentation - https://www.npmjs.com/package/dotenv


##  Getting Started

##  Requirements

*  Node.js v24+
*  npm
*  Git
*  A code editor (VS Code recommended)
*  MongoDB (local or cloud instance)
*  Postman or any API client for testing

##  OS Compatibility

This lab works on:

*  Windows
*  macOS
*  Linux

##  Installation

1. Clone the repository:

git clone [<repository-url>](https://github.com/KaeTheDev/Secure-Record-Storage.git)

2. Navigate into the project folder:

cd secure-record-storage

##  Setup

1. Install dependencies:

npm install

2. Run the project:

npm run dev


## Setup

1. Create a .env file in the root directory and add the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

2. Run the server in development mode:
node server.js

3. The server should now be running on http://localhost:3000

##  Project Structure

secure-record-storage/
├── config/
│   └── db.js               # MongoDB connection
├── middleware/
│   └── authMiddleware.js   # Authentication middleware
├── models/
│   ├── User.js             # User model
│   └── Note.js             # Note model with user ownership
├── routes/
│   └── api/
│       └── notes.js        # Secured CRUD routes for notes
├── .env                    # Environment variables (ignored)
├── server.js               # Express server entry point
├── package.json
└── README.md

## Authorization Rules

## Note Ownership
Each note includes a required user field that references the authenticated user who created it.

## Protected Behavior
* Users can only view their own notes
* Users cannot update or delete notes they do not own
* Unauthorized actions return a 403 Forbidden response

## Endpoints (Authenticated)
## Create Note
## POST /api/notes
* Automatically associates the note with req.user._id

## Get All Notes
## GET /api/notes
* Returns only notes owned by the logged-in user

## Update Note
## PUT /api/notes/:id
* Allowed only if the authenticated user owns the note
* Returns 403 Forbidden if the user is not the owner

## Delete Note
## DELETE /api/notes/:id
* Allowed only if the authenticated user owns the note
* Returns 403 Forbidden if the user is not the owner

## (Optional) Get Single Note
* GET /api/notes/:id
* Applies the same ownership check as update and delete

## Acceptance Criteria
* The Note model includes a required user field referencing the User model.
* Newly created notes are associated with the authenticated user.
* Users can only retrieve notes they personally created.
* Unauthorized update or delete attempts return a 403 Forbidden status.
* The API functions correctly for all valid and invalid authorization scenarios.