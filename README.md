# NodeJs, Express.js and SQLite

Here is an demo project build upon Node.js, Express.js and SQLite. It has features like

- Authentication
    1. Login
    2. Register
- User CRUD
  1. get list of users
  2. get all users ( included deleted users )
  3. store user
  4. update user ( only authenticated user can update their of data )
  5. soft delete user
  6. restore user
  7. permanently delete user

## Installation
To Install necessary libraries:

```sh
npm install
```

## Configure
Create an .env file. Update content as per .env.example file.

after that execute below commands


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