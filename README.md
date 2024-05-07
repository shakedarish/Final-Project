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

```bash
# open AI #
OPEN_AI_KEY=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
OPEN_AI_MODEL=gpt-3.5-turbo
OPEN_AI_BASE_URL=https://api.openai.com/v1/chat/completions

# Azure TTS #
TTS_API_KEY=9b601e0af2fc4d28978f51c8cc806131
TTS_URL=https://westeurope.tts.speech.microsoft.com/cognitiveservices/v1
SPEECH_KEY=f0783c1886cb41faa22f7ac2e78dead1
SPEECH_REGION=westeurope

# Pexels #
PEXELS_API_KEY=jHgJSbaa9699DoWyktxPQb4p4v9MCYlv5dT8fSBvZpEzEtalBYzSTpEv
PEXELS_BASE_URL=https://api.pexels.com/videos/search

# email #
EMAIL_PASS=hrei ryzo pzvy csyo
EMAIL_ACCOUNT=vidwizardweb@gmail.com
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
