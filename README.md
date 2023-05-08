# Meteor Reviews 🌠

Meteor Reviews is a **movie catalog application developed in the MERN stack** (MongoDB, Express, React, and Node.js) that **allows users to leave and edit reviews** depending on the logged-in user.

User login is managed on the frontend and passed as props, while reviews are stored in a MongoDB database. The catalog allows **filtering by title or rating**, as well as **functional pagination** using a cursor on the backend.

- The backend is an API for managing a [mockup movie database](https://www.mongodb.com/docs/atlas/sample-data/sample-mflix/), structured in its respective DAOs for reviews and movies, controllers, and a routing file to handle GET, POST, PUT, and DELETE requests.
- The frontend is developed in React + Vanilla JavaScript using the [Vite environment](https://vitejs.dev/). The design is 100% responsive and original, created with [Sass CSS](https://sass-lang.com/).

Visit the live preview at [meteor-reviews.vercel.app](https://meteor-reviews.vercel.app/)

## Table of Contents

- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [How to Use the Application](#how-to-use-the-application)
- [Features](#features)
- [License](#license)

## Installation

### Backend

1. Clone the repository:

```sh
git clone https://github.com/DviadFer/mern-movie-reviews.git
```

2. Navigate to the backend directory:

```sh
cd mern-movie-reviews/backend
```

3. Install the dependencies:

```sh
npm install
```

4. Create an `.env` file in the backend directory with the necessary environment variables (you need [this database](https://www.mongodb.com/docs/atlas/sample-data/sample-mflix/) deployed and accessible first).

5. Start the server with Nodemon:

```sh
nodemon server
```

### Frontend

1. Navigate to the frontend directory:

```sh
cd mern-movie-reviews/frontend
```

2. Install the dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

## How to Use the Application

1. Open your browser and visit `http://localhost:5000` (or the port where the development server is running).

2. To learn how to use the application and its features, go to the "Tutorial" tab in the navigation bar.

3. You can also visit the live preview by clicking [on this link](https://meteor-reviews.vercel.app/tutorial).

## Features

- Movie catalog with detailed information and pagination.
- Result filtering by title or rating.
- User registration and login managed on the frontend.
- Add, edit, and delete reviews associated with movies and users.
- 100% responsive, original design made with pure SCSS.
- Backend API for managing the MongoDB database of movies and reviews.

## License

Meteor Reviews is licensed under the **MIT License**.