# supermegaawesomestore.

## Description

The supermegaawesomestore. is a fictional e-commerce store as part of the upleveled.io web developement bootcamp. The company is not real and no purchases can be made.

## Functionalities

This next.js-project includes the following functionalities:

- landing page
- products page displaying all available products
- a single page for each product with more information about the product
  - toggle the counter and add items to the cart with the button below
  - the quantity will be shown in the header next to the cart symbol
- cart page
  - displaying all products in the cart with the correct quantity and price for each
  - displaying the total count of items and the total sum of the cart
  - adjust the quantities of items before proceeding to checkout
- checkout page
- thank you page

## List of technologies used

- Next.js
- React.js
- Postgres.js
- Emotion (CSS-in-JS)
- Jest (Unit tests)
- Playwright (E2E tests)
- Typescript
- GitHub Actions

## Setup instructions

- Clone the repository with `git clone <repo>`
- Setup the database by downloading and installing PostgreSQL
- Create a user and a database
- Create a new file `.env`
- Copy the environment variables from `.env-example` into `.env`
- Replace the placeholders xxxxx with your username, password and name of database
- Install dotenv-cli with `yarn add dotenv-cli`
- Run `yarn install` in your command line
- Run the migrations with `yarn migrate up`
- Start the server by running `yarn dev`

## Deploy on Heroku

- Sign up at Heroku: https://www.heroku.com/.
- Create a new App
- Choose a name and select the "Europe" Region
- Click "Connect to GitHub"
- Search for your repository and click on "Connect". Click on "Enable Automatic Deploys"
- Go to the Overview tab and click "Configure Add-On"
- Search for "Postgres" and select "Heroku Postgres"
- Trigger a deploy by pushing your repo to GitHub
<!--

# Next.js Example - Spring 2022

## Database Setup

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.

Follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Then, connect to the built-in `postgres` database as administrator in order to create the database:

**Windows**

If it asks for a password, use `postgres`.

```bash
psql -U postgres
```

**macOS**

```bash
psql postgres
```

**Linux**

```bash
sudo -u postgres psql
```

Once you have connected, run the following to create the database:

```sql
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

Quit `psql` using the following command:

```bash
\q
```

On Linux, you will also need to create a Linux system user with a name matching the user name you used in the database. It will prompt you to create a password for the user - choose the same password as for the database above.

```bash
sudo adduser <user name>
```

Once you're ready to use the new user, reconnect using the following command.

**Windows and macOS:**

```bash
psql -U <user name> <database name>
```

**Linux:**

```bash
sudo -u <user name> psql -U <user name> <database name>
```

### Running the migrations

To set up the structure and the content of the database, run the migrations using Ley:

```bash
yarn migrate up
```

To reverse the last single migration, run:

```bash
yarn migrate down
```

## API Design

Base URL (development): http://localhost:3000/api/

1. Reading all users: `GET /users`
2. Reading a single user: `GET /users/:id`
3. Creating a new user: `POST /users`
4. Deleting a user: `DELETE /users/:id`
5. Updating a user: `PUT /users/:id` -->
