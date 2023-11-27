# Repository - Mostpros Project

## Purpose

This repository contains the code for the Mostpros project. The following instructions guide you through setting up and running the project locally.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

### 1. Clone the Repository

```
git clone [https://github.com/mostpros1/repository.git]
cd repository
```

### Backend Setup

Navigate to the backend directory and install the necessary packages:

```
cd Backend
npm install
```

To download and configure AWS amplify on your device:

```
amplify pull --appId d2j290dx5bs7ht --envName staging
```
This will give you a few prompts.
- Choose your default edditor: This speaks for itself just select whichever edditor you use.
- Choose the type of app that you're building: Javascript.
- What type of javascript framework are you using: Pick react if you are working on the web version and pick react-native if you are working on the app version.
- Source directory path: For the web version just make sure the filepath of the terminal ends with /Frontend and for the app version it should end with /app you can do this by checking what path you are on, for example if you are on path C:\Users\[username]\Desktop\ProjectFolder\repository\App just type app here in the same way you would use cd app if you wanted to move to the app folder from the same path
- Distribution Directory Path: For the web version type /dist and for the app version leave it blank
- Build Command: Just press enter
- Start Command: Just press enter
- Do you plan on modifying  this backend: Yes



To start the backend locally:

```
npm start
```

### 3. Frontend Setup

Navigate to the frontend directory and install the necessary packages:

```
cd ../Frontend
npm install
```

To start the frontend locally:

```
npm run dev
```

## Getting Started

Both the frontend and backend should now be running locally. Open your browser and navigate to http://localhost:3000 (or the relevant port if it differs) to view the frontend of the application.
