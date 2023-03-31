 const express = require('express');
 const mysql = require('./routers/connectionMySQL');
 
 const path = require('path');
 const bodyParser = require('body-parser');
 const fileUpload = require('express-fileupload');
 const dotenv = require('dotenv').config();
 //const pages = require('./routers/');
 //const controller = require('./controller/');

 const PORT = process.env.PORT || 3000;

 const app = express();


 const startServer = async function()
 {
    try 
    {
        //await mysql.authenticate();
        await mysql.connect(function(error)
        {
            if(error)
                console.log('Unable to connect to the db: ',error);   
            else
                console.log('Connection has been established successfully.'); 
        });

        app.listen(PORT,() => console.log(`Server has been started on the port ${process.env.PORT} and env=${process.env.NODE_ENV}` ));    
    } catch (error) 
    {
        console.log(error);
        console.error(`Unable to connect to the server: ${error}`);    
    }
 }

 startServer();