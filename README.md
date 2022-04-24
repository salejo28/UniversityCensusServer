# Census University

## First Step

The first step is clone the repository

```
git clone https://github.com/santi280403/UniversityCensusServer.git
```

## Second step

The second step is install depencencies

```
yarn install
```

o

```
npm install
```

## Third Step

The third step is setup the enviorment variables, create file **.env** in the index project.

```
NODE_ENV="development"

# DATABASE
DB_HOST="your host"
DB_USER="your user"
DB_PASSWORD="your password (if haven't password leave empty)"
DB_DATABASENAME="your database name"

# SECRET TOKEN AUTHORIZATION API
SECRET_TOKEN_AUTHORIZATION_API=YOUR_AUTHORIZATION_TOKEN

# SECRET TOKEN SESSION COOKIE
SECRET_TOKEN_SESSION_COOKIE=YOUR_CUSTOM_TOKEN_SESSION_FOR_COOKIE

# SECRET TOKEN MESAGGE
SECRET_TOKEN=SECRET_TOKEN_KEY

# SECRET REFRESH TOKEN
SECRET_REFRESH_TOKEN=SECRET_REFRESH_TOKEN_KEY

# SECRET KEY FOR CRYPTO
SECRET_KEY_CRYPTO=SECRET_KEY_CRYPTO

# CLOUDINARY
CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUT_CLOUDINARY_API_SECRET
```

## Third step

the third step is run the [sql script](https://github.com/santi280403/UniversityCensusServer/blob/main/db/db.sql) into **phpmyadmin** or your console

## Fourth step

The four step is run the server, if you want run this in development run:

```
yarn start:dev
```

o

```
npm run start:dev
```

Else run:

```
yarn build && yarn start
```

o

```
npm run build && npm start
```

## Fifth read the documentation api

Read the [documentation api](https://documenter.getpostman.com/view/11682119/UyrAGd1Z) for test this server
