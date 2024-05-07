# VidWizard Project README

[GitHub Repository](https://github.com/shakedarish/Final-Project)

This repository contains the source code for the VidWizard project.

## Local Run

### Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/shakedarish/Final-Project.git
cd <project_directory>
```

### Install Node.js and npm

Ensure you have Node.js installed (version 20 or later) along with npm (Node Package Manager) to manage project dependencies. Check the version and install if needed:

```bash
node --version
npm --version
```

Download the installer from the [Node.js website.](https://nodejs.org/en)

### Run the Client

Navigate to the client directory and install required dependencies listed in package.json for the React client:

```bash
npm install
```

Start the client:

```bash
npm start
```

If the browser does not open automatically, you can access the application locally by opening the following URL in your preferred web browser: [http://localhost:3000](http://localhost:3000)

### Run the Server

Assuming you are in the main project directory root, change into the server directory:

```bash
cd server
```

Create a **.env** file under the server directory containing necessary secrets:

```
Refer to the 'User Guide' for the .env file content.
```

Install required dependencies listed in package.json for the server:

```bash
npm install
```

Start the server:

```bash
node server.js
```

## Deployment Run

If you prefer to access the deployed version of the application hosted on Render, you can visit this link to access the website:
[https://vidwizard-oxvo.onrender.com/](https://vidwizard-oxvo.onrender.com/)
