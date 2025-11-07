# uttar-pradesh-tourism-infrastructure-management-system-220373-220383

This workspace contains the Angular frontend container.

Frontend quickstart:
- cd angular_frontend
- npm install
- npm run start

Notes:
- The dev server binds to 0.0.0.0:3000 for preview.
- Backend calls are gated by env:
  - VITE_ENABLE_BACKEND=true enables calls
  - VITE_BACKEND_URL sets the backend base URL
- If backend is not enabled or is down, the app will display placeholder data and continue to run.