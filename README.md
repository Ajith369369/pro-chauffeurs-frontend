# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Project Structure

```plaintext
.
pro-chauffeurs/
├── pro-chauffeurs-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   ├── Repair/
│   │   │   ├── Refueling/
│   │   │   ├── Towing/
│   │   │   ├── Winching/
│   │   │   └── Admin/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── Slice.js
│   │   │   │   └── Slice.js
│   │   │   └── store.js
│   │   ├── services/
    │   ├── App.js
    │   ├── index.js
    │   ├── routes.js
    │   ├── store.js
    └── package.json
├── pro-chauffeurs-backend/

```
pro-chauffeurs-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── Repair/
│   │   ├── Refueling/
│   │   ├── Towing/
│   │   ├── Winching/
│   │   ├── Admin/
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── Slice.js
│   │   │   └── Slice.js
│   │   └── store.js
│   ├── services/
│   ├── App.js
│   ├── index.js
│   ├── routes.js
│   ├── store.js
└── package.json


About.jsx
ClientRating.jsx
Footer.jsx
Header.jsx
Reasons.jsx
Services.jsx
