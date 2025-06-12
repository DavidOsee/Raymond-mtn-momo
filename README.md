# PREREQUISITE
NODE VERSION - 14 or later 


# PACKAGES TO INSTALL 
- express


# NPM COMMANDS 
```bash
  npm init -y 
  npm install express axios
  npm i | npm install 
  npm start
```
 


# FOLDERS TO BE CREATED 
- routes 
- controllers
- middlewares


# FILES TO BE CREATED 
- server.js
- .env 
- routes > app-routes.js
- controllers > app-controllers.js
- middlewares > ErrorHandler.js, NotFound.js


# CONFIGS
- package.json > add "type": "module" in the json tree
- /package.json > add the following in the script object
"start": "node --watch --env-file=.env server"