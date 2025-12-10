# WatchLedger

## Overview
WatchLedger stands as an ultra-minimal Single Page Application for the dedicated cinephile. This project re-imagines movie tracking as a purely cinematic experience. The interface presents a seamless dark void where movie posters command full attention. Users interact directly with distinct movie cards to rate, like, or watchlist titles without navigating away.

## Core Philosophy
The design pursues absolute utility. Every element serves a specific purpose to enhance the visual journey. Interactions remain silky smooth and immediate. We bring the focus entirely to the art of film.

## Features
Experience a curated set of capabilities designed for the modern movie enthusiast.

### Instant Interactions
Hover over any movie card to reveal essential actions. Like, watchlist, or rate titles immediately. The interface eliminates unnecessary clicks and navigation.

### Continuous Discovery
An infinite scroll grid presents an endless stream of cinema. The journey through film history remains uninterrupted.

### Unified Validation
Robust data consistency exists across the full stack. Zod schemas enforce strict validation for both client and server interactions.

## Technical Architecture
The application relies on a modern MERN stack to deliver performance and reliability.

### Frontend
*   **React (Vite):** Delivers a high-performance, component-based user interface.
*   **Tailwind CSS:** Crafts the bespoke, borderless aesthetic with precision.
*   **Framer Motion:** Orchestrates fluid animations and card lifts.
*   **Redux Toolkit & RTK Query:** Manages application state and caches API responses effectively.
*   **Lucide React:** Provides clean, consistent iconography.

### Backend
*   **Node.js & Express:** Powers the robust and scalable server logic.
*   **MongoDB & Mongoose:** Stores application data in a flexible, document-oriented structure.
*   **Zod:** Enforces strict data validation for both client and server interactions.
*   **JWT & Bcrypt:** Secures user authentication and data protection.

## Deployment Protocols
Initiate the application by configuring both environments.

### 1. Repository Initialization
Clone the codebase to your local machine.
```bash
git clone <repository-url>
```

### 2. Backend Configuration
Navigate to the server directory. Install the necessary dependencies.
```bash
cd server
npm install
```

Start the server process.
```bash
npm run dev
```

### 3. Frontend Configuration
Open a new terminal. Navigate to the client directory. Install the client dependencies.
```bash
cd client
npm install
```

Launch the interface.
```bash
npm run dev
```

The system will synchronize. The backend listens for requests. The frontend engages the user.
