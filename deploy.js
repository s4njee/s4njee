{
      "name": "my-project",
          "version": "0.0.0",
          "description": "My awesome project!",
          "main": "app/main.js",
        "scripts": {
                "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build",
                "deploy": "NODE_ENV=production webpack -p --config webpack.production.config.js"
              
        },
          "author": "",
          "license": "ISC",
        "devDependencies": {
                "webpack": "^1.4.13",
                "webpack-dev-server": "^1.6.6"
              
        },
          "dependencies": {}

}
