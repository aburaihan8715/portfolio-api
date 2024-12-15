# Project : asgmt9_multi_vendor_e_commerce_api

## Live link server:

https://asgmt9-multi-vendor-e-commerce-api.vercel.app

## Github link server:

https://github.com/aburaihan8715/asgmt9_multi_vendor_e_commerce_api

## Live link client:

https://asgmt9-multi-vendor-e-commerce.netlify.app

## Github link client:

https://github.com/aburaihan8715/asgmt9_multi_vendor_e_commerce_ui

## Admin

- email: aadmin@gmail.com
- password: test1234

## Vendor

- email: avendor@gmail.com
- password: test1234

## Customer

- email: acustomer@gmail.com
- password: test1234

## Technologies used:

1. Typescript
2. Node js
3. Express js
4. Mongodb
5. Stripe

## Packages used:

1. cors
2. mongoose
3. zod
4. jwt
5. eslint
6. stripe
7. multer
8. cloudinary
9. node mailer

## Deploy

- vercel

## Features

- authentication

1. register user
2. login user
3. update profile
4. change password
5. forget and reset password

## API Endpoints

## Auth:

- /api/v1/auth/login(POST)
- /api/v1/auth/register(POST)
- /api/v1/auth/change-password(PATCH)
- /api/v1/auth/refresh-token(POST)
- /api/v1/auth/forget-password(POST)
- /api/v1/auth/reset-password(PATCH)
- /api/v1/auth/update-profile(PATCH)

## Category:

## Comment:

## Payment:

## Scripts

```js
    "start": "node ./dist/server.js",
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "prod": "NODE_ENV=production node ./dist/server.js",
    "build": "tsc",
    "lint": "eslint .",
    "format": "prettier --write ."
```

<p>======end=======</p>
