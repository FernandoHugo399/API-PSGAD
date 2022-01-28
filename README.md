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
# Add KeyFileName from google cloud Storage to src/config

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

```
