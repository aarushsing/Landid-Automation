
# Land.ID Automation with Playwright

This Node.js automation project uses [Playwright](https://playwright.dev/) to log in to [Land.ID](https://id.land) and fetch parcel data based on provided coordinates. By automating this process, it allows users to retrieve detailed land data for multiple locations using login credentials and coordinates stored in environment variables.

## Features

- **Automated Login**: Logs in to Land.ID with user credentials.
- **Data Fetching**: Retrieves land parcel data for multiple coordinates by querying Land.ID APIs.
- **Environment Variables**: Stores sensitive data securely in a `.env` file.

## Requirements

- Node.js 
- Playwright
- dotenv

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aarushsing/Landid-Automation.git
   cd your-repo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install dotenv**:
   ```bash
   npm install dotenv
   ```

4. **Set up Playwright:**
   ```bash
   npm init playwright@latest
   ```
Run the install command and select the following to get started:

Choose between TypeScript or JavaScript (default is TypeScript)
Name of your Tests folder (default is tests or e2e if you already have a tests folder in your project)
Install Playwright browsers (default is true)

5. **Create a `.env` file**: Copy the sample below into your `.env` file and replace with your actual values.

   ```dotenv
   EMAIL=Your_email
   PASSWORD=Your_password
   COORDINATES=[{"id":3071,"lat":29.1489,"lng":-82.174222},{"id":3072,"lat":42.696799,"lng":-84.43616},{"id":3073,"lat":42.681351,"lng":-84.438764},{"id":3074,"lat":29.2039,"lng":-82.082178},{"id":3075,"lat":29.167645,"lng":-82.116866},{"id":3076,"lat":29.18853,"lng":-82.11497},{"id":3077,"lat":29.165995,"lng":-82.17293},{"id":3078,"lat":29.170519,"lng":-82.175797},{"id":3079,"lat":26.200383,"lng":-80.13317}]
   ```

## Usage

1. **Run the test:**
   ```bash
   npx playwright test
   ```
  or 

  ```bash
   npx playwright test --project=chromium coordinates.tests.spec.js
  ```

2. **Output**:
   The script will:
   - Log in to Land.ID using the credentials provided in `.env`.
   - For each coordinate, it will fetch and display the corresponding land parcel data.

## Code Structure

- **`index.js`**: Main script where Playwright automates the login and data retrieval process.
- **`.env`**: Stores email, password, and coordinates as environment variables.

## Environment Variables

- `EMAIL`: Your Land.ID login email.
- `PASSWORD`: Your Land.ID password.
- `COORDINATES`: Array of objects with `id`, `lat`, and `lng` for each location.

## License

This project is licensed under the MIT License.
