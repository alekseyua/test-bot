import https from 'https';
import fs from 'fs'
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();
const PORT = 3333;

var options = {
    key:fs.readFileSync(path.join(__dirname,'./key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'./cert.pem'))
    
};

var server = https.createServer(options, app).listen(PORT, function(){
  console.log("Express server listening on port " + PORT);
});



app.get('/get-data-razborka', async (req, res)=>{

    const url = 'https://botrazbor.ru/telegram/api_get_filters/';
    
    const options = {
        method: 'GET',
    };
    const response = await fetch(url, options)
    const data = await response.json();
    // console.log({response: data})
    // res.status(200)
    // res.send({data})
    return res.json(data);
});

app.get('/', async (req, res)=>{
   console.log('query / ')
    return res.end(fs.readFileSync(path.join(__dirname, '/html', '/for_bot.html')));
})

// app.listen( PORT, () => console.log('start server', PORT) )