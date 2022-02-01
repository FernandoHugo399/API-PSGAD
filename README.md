# API TypeScript

## :mag: About: 
API for PSGAD application
<br>

## 👷 how to run it:
```bash
# clone the repository
git clone https://github.com/FernandoHugo399/API-PSGAD/

# open an IDE of your choice

# Add data to .env
# Add KeyFileName from google cloud Storage to src/config, renamed to 'service-account.json'
# Create database in postgres with dump that was made available

# run yarn to install dependencies, after that, use yarn dev to start the server
yarn
yarn dev

# If you want to use npm, you need to download sucrase and nodemon globally, after that, use npm run dev to start the server
npm install -g nodemon sucrase
npm run dev
```


## Routes:
```js
# login
Post: /auth/login

# verify
Get: /auth

# pending orders
Get: /order/pending

# completed orders
Get: /order/completed

# all products
Get: /product

# create product
Post: /product

# all categories
Get: /categories

# create category
Post: /categories

# delete category
Post: /categories/:id
```
