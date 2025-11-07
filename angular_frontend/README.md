# UPSTDC Angular Frontend

This is the Angular-based frontend for the Uttar Pradesh Tourism Infrastructure Management System.

## Scripts

- start: Launches the dev server on 0.0.0.0:3000
- dev: Alias for start
- build: Builds the production bundle
- preview: Serves the production build on 0.0.0.0:3000

## Environment Variables

The frontend can run independently of the backend. To enable backend calls:

- VITE_ENABLE_BACKEND=true
- VITE_BACKEND_URL=http://localhost:8080 (or your backend URL)

If VITE_ENABLE_BACKEND is not `true`, the app shows placeholder data and does not fail if the backend is unavailable.

## Run

- npm install
- npm run start

The app binds to 0.0.0.0:3000 for container-based previews.
