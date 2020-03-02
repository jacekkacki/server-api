# Simple express server

This project will create simple local server HTTP with get, post, put and delete methods.

## Install

`yarn add`

Or

`npm install`

## Usage

Run HTTP server write `yarn start` or `npm start`.
Starting the server with automatic refreshing option write `yarn watch` or `npm watch`.

If you want to test the server, use the `postman` program.
All data is displayed in `json` format.

When you select get method:
  - `http://localhost:8000/testimonials/` - display all data from db,
  - `http://localhost:8000/testimonials/random` - display random data from db ,
  - `http://localhost:8000/testimonials/:id` - display selected data from db,

  When you select post method:
  - `http://localhost:8000/testimonials/` - adding a new element to the db,

  When you select put method:
  - `http://localhost:8000/testimonials/:id` - changing the selected element in the db,

  When you select delete method:
  - `http://localhost:8000/testimonials/:id` - removing the selected item from the db,

  Pages not found - error page.
  


