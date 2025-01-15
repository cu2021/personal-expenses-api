# Personal Expenses API

## Overview

Personal Expenses API is a Node.js-based backend service designed to help users efficiently manage their personal finances. It provides endpoints for tracking expenses, managing income, generating financial statistics, and analyzing expense categories. The API is built with scalability, security, and simplicity in mind.

---

## Features

- **Expense Management**: Add, update, and retrieve expenses by category (e.g., food, transport, rent).
- **Income Tracking**: Record and update monthly incomes.
- **Financial Reports**: Generate monthly financial analysis, including total expenses, remaining income, and average daily expenses.
- **Expense Statistics**: Retrieve expense breakdowns by category for better budgeting insights.
- **User Authentication**: Secure access with JWT-based authentication.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Joi
- **Version Control**: Git

---

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v22 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud-based)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/cu2021/personal-expenses-api.git
   cd personal-expenses-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     DB_URI=<Your MongoDB Connection URI>
     MONGODB_DB=personal_expenses_project
     JWT_SECRET=<Your JWT Secret Key>
     ```

4. Start the server:

   ```bash
   npm start
   ```

5. Access the API:
   The server will run on `http://localhost:3000` by default.

---

## Importing the Postman Collection
To simplify API testing, a Postman collection is provided in the root of this repository:
`Personal Expenses Management.postman_collection.json`.

### Steps to Import:
1. Open Postman.
2. Click on **Import** in the top-left corner.
3. Select the file `Personal Expenses Management.postman_collection.json` from the root of this repository.
4. The collection will be imported, and you can start testing the API endpoints.

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/auth/login`        | Login and retrieve a JWT. |
| POST   | `/auth/signup`       | Register a new user.      |

### Expenses

| Method | Endpoint                   | Description                         |
| ------ | -------------------------- | ----------------------------------- |
| POST   | `/expense/add`            | Add a new expense.                  |
| GET    | `/expense/currentMonthExpenses?page=`            | Retrieve current month's expenses.  |
| GET    | `/expense/currentExpenseTypeStatistics` | Get expense statistics by category. |
| GET    | `/expense/currentMonthTotalStatistics` | Retrieve monthly financial analysis details. |

### Incomes

| Method | Endpoint       | Description                      |
| ------ | -------------- | -------------------------------- |
| POST   | `/income/add` | Add or update monthly income.    |


---

## Contributing

We welcome contributions to improve this project! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature name'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

---

## Contact

For questions or support, please open an issue on [GitHub](https://github.com/cu2021/personal-expenses-api/issues).

