# Frontend of HFI Assignment

Heroku deployment: https://hfi-data-viewer.herokuapp.com/

Backend repo: https://github.com/xyloid/hfi_backend

This repo is the front end of HFI data viewer. A producrion build will be created and copied to the backend repo.
Then the backend repo will be deployed to Heroku as a whole application.

## Technologies

- React.js
- Redux

## Dependencies

- `npm install axios` for http requests to fetch data
- `npm install react-bootstrap` for bootstrap ui
- `npm install react-bootstrap-table-next --save` for expandable row
- `npm install redux` for state management
- `npm install react-redux` forward state to various components
- `npm install redux-thunk` for asynchronous actions
- `npm install react-router-dom` for navigation
- `npm install react-bootstrap` for boostrap UI
- `npm install react-bootstrap-table-next` for **expandable rows**

## How to Start

- run `npm start` in the project root dir

## Production Build

- `npm run build`
- `cp -r build ../backend/`

## Snapshots

### Home Page Before Loggin

![Home page before loggin](https://github.com/xyloid/hfi_frontend/blob/main/snapshots/home_page.png)

### Login Page
username/password: admin/admin 

![Login Page](https://github.com/xyloid/hfi_frontend/blob/main/snapshots/login.png)

### Login Page After Logged In

![Login Page After Logged In](https://github.com/xyloid/hfi_frontend/blob/main/snapshots/loggedin.png)

### Home Page After Logged In
![Home Page After Logged In](https://github.com/xyloid/hfi_frontend/blob/main/snapshots/list_data.png)

### Expand One Row
expand row by click the row directly, click the row again, the content will collapse
![Expand One Row](https://github.com/xyloid/hfi_frontend/blob/main/snapshots/expand_row.png)

### Expand More Rows
expand multiple rows at sametime
![Expand More Rows](https://github.com/xyloid/hfi_frontend/blob/main/snapshots/expand_rows.png)
