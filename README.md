# memgen-api
#Requirements: 
# -> Postgres db
# -> Node
# -> npm 

#To install App :
#First run : npm install 
#You need database server configuration -> /config/config.json
#Optional : If the database doesn't exist then run in terminal -> node_modules/.bin/sequelize db:create
#Optional : Create the db structure : node_modules/.bin/sequelize db:migrate
#Optional : Insert god in DB : node_modules/.bin/sequelize db:seed:all
#Optional : Clear all tables in DB : node_modules/.bin/sequelize db:seed:undo:all

#To start server : npm run start:server