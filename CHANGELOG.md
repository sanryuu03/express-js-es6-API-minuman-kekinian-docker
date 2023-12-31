# Release Notes


## v1.0.28 (2023-10-25)

- get All Transactions => query Raw INNER JOIN

## v1.0.27 (2023-10-19)

- postShopAddToCart

## v1.0.26 (2023-10-19)

- shopRoutes
- getShopProduct
- getShopProductPrice

## v1.0.25 (2023-10-16)

- get All Product Price => query Raw INNER JOIN

## v1.0.24 (2023-10-14)

- get All Product Price
- edit Product Price
- delete  Product Price by product_price_id and user id

## v1.0.23 (2023-10-13)

- edit Master size
- delete  Master size by size_id and user id

## v1.0.22 (2023-10-12)

- path image folder public

## v1.0.21 (2023-10-12)

- edit Master_Product by master_product_id and user id

## v1.0.20 (2023-10-11)

- setup docker
- docker exec -i -t express-js-es6-api-minuman-kekinian-docker /bin/sh
- Error: @prisma/client did not initialize yet. Please run "prisma generate" and try to import it again. solusi => npx prisma generate

## v1.0.19 (2023-09-30)

- auth signIn

## v1.0.18 (2023-09-30)

- revisi createUser => password

## v1.0.17 (2023-09-29)

- CRUD Transactions

## v1.0.16 (2023-09-29)

- CRUD product price
- validasi checkProductPrice when  create

## v1.0.15 (2023-09-29)

- update Master_Product with or without upload gambar/image by master_product_id and user id
- delete Master_Product by master_product_id and user id

## v1.0.14 (2023-09-29)

- npm i multer
- create Master_Product with upload gambar/image
- read Master_Product by user id
- fix ReferenceError: __dirname is not defined in ES module scope

## v1.0.13 (2023-09-20)

- CRUD master size

## v1.0.12 (2023-09-20)

- npx prisma migrate dev --name product_price
- npx prisma migrate dev --name transactions

## v1.0.11 (2023-09-20)

- npx prisma migrate dev --name master_product
- npx prisma migrate dev --name master_size
- npx prisma migrate reset --force atau npx prisma db seed

## v1.0.10 (2023-09-20)

- Soft delete
- npx prisma migrate dev --name add_soft_delete_user
- deleteUser

## v1.0.9 (2023-09-20)

- deleteUser

## v1.0.8 (2023-09-20)

- updateUser

## v1.0.7 (2023-09-20)

- transaction

## v1.0.6 (2023-09-20)

- uuid
- npm i nanoid
- npx prisma migrate dev --name user
- createUser

## v1.0.5 (2023-09-20)

- connect db to xampp
- getUsers


## v1.0.4 (2023-09-18)

- npm install prisma --save-dev
- npx prisma
- npx prisma init
- npx prisma migrate dev --name init

## v1.0.3 (2023-09-18)

- API minuman kekinian

## v1.0.2 (2023-08-07)

- docker compose change container_name

## v1.0.1 (2023-08-03)

- docker compose

## v1.0.0 (2023-07-07)

node js v18.12.1.

- npm install express
- npm install helmet dotenv cors bcryptjs jsonwebtoken
- npm i -D eslint prettier
- npm install eslint-plugin-prettier@latest --save-dev
- npm install --save-dev eslint-config-prettier
