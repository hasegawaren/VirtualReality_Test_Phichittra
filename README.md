# P2P Cryptocurrency Exchange API
> A technical assessment project by Phichittra Jeenduang.
This is the backend API for a peer-to-peer crypto exchange platform, built for a technical assessment.
Users can create advertisements to buy or sell cryptocurrencies with fiat currency, and other users can initiate trades based on these ads. The system records all transaction history.

## Features

- View all active advertisements.
- Create new advertisements.
- Initiate a trade from an existing advertisement.
- View details of a specific trade.
- Update the status of a trade (e.g., confirm payment).
  
## Technologies Used

- **Backend**: Node.js, Express.js
- **ORM**: Sequelize
- **Database**: MySQL 8.0
- **Containerization**: Docker, Docker Compose
- **Password Hashing**: bcrypt.js

## Prerequisites

- Node.js (v18.x or higher)
- Docker and Docker Compose

## ER Diagram
![ER Diagram](./docs/er_diagram.png)

## Installation & Setup

1.  **Clone the repository**
    ```sh
    git clone <Your-GitHub-Repository-URL>
    cd <project-folder-name>
    ```

2.  **Install dependencies**
    ```sh
    npm install
    ```

3.  **Setup environment file**
    Copy the `.env.example` file to a new `.env` file and fill in your database credentials.
    ```sh
    cp .env.example .env
    ```
    **Example `.env` file:**
    ```env
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=root
    DB_PASS=your_secret_password
    DB_NAME=p2p_exchange_db
    DB_DIALECT=mysql
    PORT=3000
    ```
    **Important:** The `DB_PASS` and `DB_NAME` values must match what is defined in your `docker-compose.yml` file's environment section.

## Running the Project

Follow these steps in order:

1.  **Start the database service**
    ```sh
    docker-compose up -d
    ```

2.  **Run database migrations** (This creates all tables)
    ```sh
    npx sequelize-cli db:migrate
    ```

3.  **Seed the database with test data**
    ```sh
    npx sequelize-cli db:seed:all
    ```

4.  **Start the application server**
    ```sh
    node app.js
    ```
    The server will be running at `http://localhost:3000`.

## Running Tests
1. **To run the automated tests, first set up the test database:**
```sh
npm run test:setup
```
2. **Then, run the tests:**
```sh
npm test
```

##  API Endpoints

Here are the main API endpoints available in this project.

**1. Get All Advertisements**
- **Method**: `GET`
- **URL**: `/api/advertisements`
- **Description**: Retrieves a list of all `ACTIVE` advertisements.
- **Success Response (200)**:
  ```json
  [
      {
          "id": 1,
          "type": "SELL",
          "price": "950000.00",
          "total_amount": "0.500000000000000000",
          "status": "ACTIVE",
          "User": { "username": "seller_a" },
          "crypto": { "code": "BTC" },
          "fiat": { "code": "THB" }
      }
  ]

**2. Create New Advertisement**
- **Method**: `POST`
- **URL**: `/api/advertisements`
- **Description**: Creates a new advertisement.
- **Success Response (201 Created)**: Returns the newly created advertisement object.
  ```json
  [
    {
    "type": "SELL",
    "cryptoCurrencyId": 3,
    "fiatCurrencyId": 1,
    "price": "960000.00",
    "total_amount": "0.25"
    }
  ]
  

**3. Create New Trade**
- **Method**: `POST`
- **URL**: `/api/trades`
- **Description**: Initiates a new trade from an advertisement's ID.
- **Success Response (201 Created)**: Returns the newly created trade object.
  ```json
  [
    {
    "adId": 1,
    "amount": "0.1"
    }
  ]

**4. Get Trade Details by ID**
- **Method**: `GET`
- **URL**: `/api/trades/:id`
- **Description**: Retrieves the details of a single trade.
- **URL Parameters**: id (required) - The ID of the trade to update (e.g., /api/trades/1).
- **Success Response (200)**: Returns the specified trade object with its related data.

**5. Update Trade Status**
- **Method**: `PATCH`
- **URL**: `/api/trades/:id`
- **Description**: Updates the status of a trade.
- **URL Parameters**: id (required) - The ID of the trade to update (e.g., /api/trades/1).
- **Success Response (200)**: Returns the updated trade object.
  ```json
  [
    {
    "status": "PAID"
    }
  ]
