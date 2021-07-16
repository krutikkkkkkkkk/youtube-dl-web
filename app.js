const express = require('express')
const path = require('path')
const app = express()
const youtubedl = require('youtube-dl');
app.use(express.static('public'));  

app.get('/index.html', (req, res)=> {
    res.sendFile(path.resolve('./index.html'));
})

app.get('/', (req, res)=> {
  res.sendFile(path.resolve('./index.html'));
})

app.get('/ytdl', function (req, res) {  
    let url = req.query.url 
    console.log(url)
    if(!url.match(/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*(?:[&\/\#].*)?$/))
    {
      res.send("Enter Valid Youtube URL <br> <a href='./index.html'> Go to home page</a>")
      return;
    }
    try{
      youtubedl.getInfo(url, function(err, info) {
        if(err){
          console.error(err)
          res.send(err)
          return;
        }
        let title = info.title;
        let file_url = info.url;
        let downloadPage= `  <h3>${title}</h3>
        <iframe width="560" height="315" src="${file_url}" title="YouTube video player" frameborder="0" allow="gyroscope; picture-in-picture; download" allowfullscreen></iframe>
    
        <style>
            *{
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            body{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 90vh;
            flex-direction: column;
            background-color: #222;
            color: #fff;
            font-family: sans-serif;
        }
    
      
        h3{
            position: absolute;
            top: 4rem;
        }
        h3::before{
            content: '▶';
            background-color: #ff0000;
            padding: .1rem .75rem;
            margin: .5rem;
            border-radius: 15px/45px;
        }
        
        footer{
            position: absolute;
            bottom: 0;
            padding: 1.75rem;
            background-color: rgb(20, 19, 19);
            width: 100%;
        }
        a{
            color: rgb(0, 132, 255);
        }
        a:visited{
            color: rgb(0, 132, 255);
        }
        </style>
    
    
    <footer>
        <p>&copy<span id="year"></span> <a href="https://telegram.me/reboot13_dev" target="_blank">reboot13_dev</a></p>
    </footer>
    
    
    <script>
        let year = new Date().getFullYear()
        document.getElementById('year').innerHTML = year 
    </script>
        `
       
        res.send(downloadPage)})
      
    }
    catch (error) {
      console.error(error);
      res.send(error)
    }
    }) 

app.listen(process.env.PORT || 3000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      });
    



