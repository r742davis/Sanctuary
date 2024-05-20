# Sanctuary 

**Site URL:** https://sanctuary-flax.vercel.app/

[Sanctuary]([url](https://sanctuary-flax.vercel.app/)) is a simple "Notes" taking app that allows anyone to index, create, update, and delete notes on a public home page. The project was coded using React, TypeScript and NextJS on the frontend and supported by a NodeJS server connected to a MongoDB database.

## How to Launch the App Locally

### Prerequisites
- Node.js installed
- MongoDB instance running (as of May 20th, 2024)
- Git installed

### Steps

#### Frontend
1. **Clone the repository using your Terminal of choice**:
    ```bash
    git clone https://github.com/r742davis/Sanctuary.git
    cd Sanctuary
    ```

2. **Install dependencies for the frontend and backend**:
    ```bash
    yarn install
    ```

3. **Set up environment variables**:
   - Create a `.env` file in the top level directory with the following variables:
     ```plaintext
     NEXT_PUBLIC_HEROKU_API_URI=[found in the "Notes" section of the AshbyHQ submission]
     ```

5. **Run the NextJS app**:
    ```bash
    yarn dev
    ```

6. **Access the app**:
   Open your browser and navigate to `http://localhost:3000`

#### Backend
1. **Clone the repository using your Terminal of choice**:
    ```bash
    git clone https://github.com/r742davis/sanctuary-solace
    cd sanctuary-solace
    ```

2. **Install dependencies for the frontend and backend**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory with the following variables:
     ```plaintext
     PORT=3001
     MONGO_URI=[found in the "Notes" section of the AshbyHQ submission]
     ```

4. **Run the backend server**:
    ```bash
    npm run start
    ```

6. **Access the app**:
   Open your browser and navigate to `http://localhost:3001`. You should see a JSON list of notes displayed in the browser.

## Implementation Notes

### Design Decisions
My design decisions were based on familiarity with the technology and what kinds of problems I was trying to solve. Since this is a fairly straightforward application, I focused on technologies that abstracted some of the bigger pain points of full-stack development while still providing some room for demonstrating my proficiency in the fundamentals. For example, I used React Query because it massively simplifies fecthing and provides great developer tools for data visualization. On the other hand, I decided to build custom components and CSS modules instead of using a component libary because it showcases my code quality and ability to problem-solve.

The biggest tradeoff when deciding to build custom solutions is time. Since this project did not have a strict time limit, I took the liberty of demonstrating my competency over producing the app within a day. Considering the basic level of work required to design the UX, design the API, and then code both a frontend and backend, I do not think it is realistic to expect this work to be done within a day. However if there was a clear time limit I would've definitely made more decisions based on ease-of-use and developer speed. For example, I'd have used an older "Pages" directory version of NextJS (of which I'm more familiar), used a component library, used a hook form library, and generally focused on API functionality and testing.

#### List of Decisions:
- **React Query**: Simplifies fetching and caching, background refreshing, error handling, and retry logic. Provides devtoools that support data visualization.
- **Hosting + Database**: Server on Heroku, database on MongoDB. Chosen for familiarity with setup and developing in these technologies.
- **Mongoose**: Chosen for easier data structure enforcement and validation across models
- **TypeScript**: Used for data integrity and ease of use for complex prop sharing
- **CSS**: Hand-rolled CSS for simplicity, more customization, and less setup with SCSS or CSS-in-JS implementations
- **Component Structure**: Co-locating React Query files for future usage and separating frontend and backend repos for clarity
- **Custom Components**: Built instead of using pre-built libraries to demonstrate proficiency and code quality, showcase problem-solving skills and design knowledge, and use as a learning opportunity

#### Technologies Used

- **Frontend**:
  - <img src="https://reactjs.org/favicon.ico" alt="React" width="20" height="20"> React
  - <img src="https://nextjs.org/static/favicon/favicon.ico" alt="NextJS" width="20" height="20"> NextJS
  - <img src="https://www.typescriptlang.org/favicon.ico" alt="TypeScript" width="20" height="20"> TypeScript
  - <img src="https://css-tricks.com/favicon.ico" alt="CSS Modules" width="20" height="20"> CSS Modules
  - <img src="https://tanstack.com/favicon-32x32.png" alt="React Query" width="20" height="20"> React Query
  - <img src="https://axios-http.com/assets/favicon.ico" alt="axios" width="20" height="20"> axios
  - <img src="https://eslint.org/favicon.ico" alt="ESLint" width="20" height="20"> ESLint

- **Backend**:
  - <img src="https://nodejs.org/static/favicon.ico" alt="NodeJS" width="20" height="20"> NodeJS
  - <img src="https://mongoosejs.com/docs/images/favicon/favicon-32x32.png" alt="Mongoose" width="20" height="20"> Mongoose
  - <img src="https://expressjs.com/images/favicon.png" alt="Express" width="20" height="20"> Express
  - <img src="https://www.herokucdn.com/favicons/favicon.ico" alt="Heroku" width="20" height="20"> Heroku
  - <img src="https://www.mongodb.com/assets/images/global/favicon.ico" alt="MongoDB" width="20" height="20"> MongoDB
  - <img src="https://www.postman.com/_ar-assets/images/favicon-1-32.png" alt="Postman" width="20" height="20"> Postman

### Struggles
I think the biggest struggls were re-familiarizing myself with the basic setup of projects, making efficient design decisions, and balancing personal time with the project development. Once I was able to properly setup my new computer and then plan out the design and development, I sailed through the rest of the process. When you've only developed in fairly mature applications the past few years, it's easy to forget specifics on project setup and I certainly dealt with this time around!

#### List of Pain Points:
- Initial setup and choosing to use the App Router instead of the familiar Pages Router in NextJS
- Updating GitHub authentication on a new computer I purchased this week
- Configuration specifics from previous projects causing delays
- Visual design decisions for the cards in particular
- Balancing functionality and design priorities
- Database schema design and API bugs
- Efficient rendering of custom Card components and state management
- Taking the project from design to finished product, including wireframing, API development, hosting, testing, and then frontend design and development

### Future Considerations
There's a lot that can be done to make this a more robust and individually tailored to the user. Basic authentication and user creation would be at the top of the list since currently notes can be shared to anyone who goes to the site. Then it would be database and server security by including JSON web tokens and making API routes only accessible by our domain. After that, I would focus on improving the project structure in preparation for future feature development: global state management, optimize React render cycles, improve Type safety and use of Generics, improved error handling and loading, testing components, and reduce component-state coupling for better composition.

#### List of Considerations:
- Authentication to limit notes to a specific user
- Database & server API security + testing coverage
- Context Provider and a reducer for advanced state management
- Improved routing structure for new features
- Optimize rendering cycles with useMemo
- Better error handling and loading states for React Query API routes
- Unified button component
- Split top-level components into smaller, more presentational components
- Testing for components

## Solace Assignment
Solace wants to see how you develop code and deliver a small project that would be similar to your day-to-day work at Solace. The app built here will flex both your backend and frontend skill sets.

Solace has a feature that allows advocates to create notes on both their individual client appointments and contract work they perform for the client. A simple feature that has proven very valuable for advocates to solidify all their information inside one application that they can then share with their clients as they see fit. We want you to build the first iteration of what that feature was for Solace.

### Deliverables
- A link to a Github repo
- Documentation to help users understand and run the project
- A working web app hosted publicly

### Task
Please build a very simple “Notes” Web App. An app that will allow a user to Index, Create, Update, and Delete notes.

### Acceptance Criteria
- Must be written with JavaScript or TypeScript (preferred)
- Note Form must have the following validations:
  - Must not be shorter than 20 characters
  - Must not be longer than 300 characters
- Main page must include all the notes and a way to create a new note
- Main page must include a search bar that will find based on a note's content (Client or Server query is fine)
- Must include README with steps on how to run the application(s) locally and any details around the implementation of the final product, struggles you ran into, and things you would change and return to if given more time
- Must include a working web app hosted publicly
