# Repository - Mostpros Project

## Purpose

This repository contains the code for the Mostpros project. The following instructions will guide you through setting up and running the project locally.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

### Clone the Repository

To get the code onto your machine, run the following commands:

```
git clone [https://github.com/mostpros1/repository.git]
cd repository
```

### Backend Setup

Our backend is managed with AWS Amplify. To download and configure AWS Amplify on your device:

```
amplify pull --appId d2j290dx5bs7ht --envName staging
```

Running this will give you a few prompts.
- Choose your default editor: Select whichever editor you use.
- Choose the type of app that you're building: Javascript.
- What type of Javascript framework are you using: react if you are working on the web version, or react-native if you are working on the app version.
- Source directory path: Enter the path that the frontend is located at. For web this would be "/Frontend", for app this would be "/app".
- Distribution Directory Path: For the web version enter "dist", for the app version leave it as is.
- Build Command: Just press enter
- Start Command: Just press enter
- Do you plan on modifying this backend: Yes

The backend does not need to be started on a separate server. Every interaction with the backend is done through AWS.

## Getting Started

### Start the application

Navigate to the appropriate directory and install the necessary packages:

If you're working on the web app:
```
cd ./Frontend
npm install
```

If you're working on the mobile app:
```
cd ./App
npm install
```


To start the frontend locally:

```
npm run dev
```

To start the app locally:

1. Download Expo (Go) [on the Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&pcampaignid=web_share) or [on the App Store](https://apps.apple.com/us/app/expo-go/id982107779)
2. Run the following command and scan the QR code that pops up in the terminal using the Expo (Go) app:
```
npm start
```

You should now have everything set up locally. Open your browser and navigate to http://localhost:5173 (or the relevant port if it differs), to view the frontend of the application.
