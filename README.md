
# NoteCraft

NoteCraft is a simple note-taking application built with Node.js, Express, Sequelize, and MySQL.

## Features

- User authentication using JWT (JSON Web Tokens)
- Create, read, update, and delete (CRUD) notes
- Pagination for listing notes
- Secure password hashing using bcryptjs


## Installation

1. Clone the repository:

```bash
 git clone https://github.com/siddhishah109/NoteCraft.git
```
2. Install dependencies:
```bash
 cd notecraft
 npm install
```
3. Set up environment variables:
   Create .env file in root dir
```bash
 DB_PASSWORD= yourpassword
 PORT= 3000
 SECRET_KEY= yoursecretkey
```
4. Create Database in MySQL
```bash
 CREATE DATABASE notecraft;
```
5. Start the Application: 
```bash
 npm start
```
## Postman Collection

Checkout Doc in postman

```bash
  https://www.postman.com/crimson-meadow-34095/workspace/notecraft
```
## API Reference

#### Register a new user

```http
 POST /register    
```
***Bearer token require***

#### Login with existing credentials to obtain a JWT token.

```http
 POST /login
```
#### Retrieve a specific note by ID.

```http
 GET /notes/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of item to fetch |

#### Retrieve a specific note by ID.

```http
 GET /notes?page=0&limit=3
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page` `limit`      | `int` | **Default** page=1  limit=10 |

#### Create a new note.

```http
 POST /notes
```
#### Update a specific note by ID.

```http
 PUT /notes/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of item to fetch |

#### Delete a specific note by ID.

```http
 DELETE /notes/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of item to fetch |




