# NodeJs, Express.js and SQLite

Here is an demo project build upon Node.js, Express.js and SQLite. It has features like

- Authentication
    1. Login
    2. Register
- User CRUD
  1. Get list of users
  2. Get all users ( included deleted users )
  3. Store user
  4. Update user ( only authenticated user can update their of data )
  5. Soft delete user
  6. Restore user
  7. Permanently delete user

## Installation
To Install necessary libraries:

```sh
npm install
```

## Configure
Create an .env file. Update content as per .env.example file.

After that execute below commands


To generate artifacts based on schema
```sh
npx prisma generate
```

To migrate database
```sh
npx prisma db push
```

(Optional) To browse your data with Prisma Studio
```sh
npx prisma studio
```


## To run project

To start project
```sh
npm run start
```


# Additional

To test api you can import postman collection. You can find postman collection file named "node-express-sqlite.postman_collection.json" in the root directory