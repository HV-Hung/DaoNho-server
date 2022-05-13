# DaoNho socail web app


## Key Features
- Create and login account, multiple user registration.
- Create and post status
- Follow and unfollow peple
- Like and unlike post
- Home page, new feed and profile page


## Technologies used
This project was created using the following technologies.

#### Client

- React JS
- React-router-dom (To handle routing)
- Axios (for making api calls)
- Material UI & CSS Module (for User Interface)

#### Server

- Express
- Mongoose
- bcrypt (for password encryption)

#### Database
MongoDB (MongoDB Atlas)

## Configuration and Setup
In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine. 
- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal
- cd client and create a .env file in the root of your client directory and copy below scrip in this file.
```
REACT_APP_PUBLIC_FORDER = http://localhost:3000/assets/

```

- Run client: 
```
$ cd client
$ npm install (to install client-side dependencies)
$ npm start (to start the client)
```
In the second terminal
- cd server and create a .env file in the root of your client directory and copy below scrip in this file.
```
MONGO_URL = mongodb+srv://hung:Hung2711@cluster0.l06gy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

```

- Run server: 
```
$ cd server
$ npm install (to install server-side dependencies)
& npm start (to start the server)
```



