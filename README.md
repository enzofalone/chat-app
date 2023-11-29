# chat-app

This is a chat app heavily inspired in both **Discord** and the **Slack** application.

It forces users to create their accounts

## Technologies Used

### Frontend

- Socket.io
- TypeScript
- Vite
- React.js
- Mantine

### Backend

- Socket.io
- JavaScript
- Express.js
- Passport

## Features

- Real-time messaging using WebSockets
- Delivery system (to check whether your message was received by the server)
- Google OAuth 2.0
- Toasts
- Drag & Drop order of channels and workspaces

Live preview: **soon**

## How to Run

1. run `git clone`

```
git clone https://github.com/enzofalone/chat-app.git
```

2. install npm packages using pnpm in both `/api` and `/ui` directories

```
cd /api && pnpm i
cd /ui && pnpm i
```

3. create `.env` file using `.env.template` in `/api` and insert your own Google OAuth `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

4. run two terminals to start both `api` and `ui` local servers

```
cd /api && pnpm run dev
cd /ui && pnpm run dev
```
