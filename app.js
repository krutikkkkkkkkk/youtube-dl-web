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
        let downloadPage= `
        <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      </head>
      <body>
  <h2>${title}</h2>
  <div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="${file_url}" allowfullscreen></iframe>
</div>
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
            height: 80vh;
            flex-direction: column;
            background-color: #222;
            color: #fff;
            font-family: sans-serif;
        }
    
      
        h2{
            position: absolute;
            top: 3.5rem;
        }
        h2::before{
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

        @media only screen 
   and (min-width : 580px) {
   iframe{
     margin-top: 2rem;
     height: 315px;
     width: 560px;
   }
}
        </style>
    
    
    <footer>
        <p>&copy<span id="year"></span> <a href="https://telegram.me/reboot13_dev" target="_blank">reboot13_dev</a></p>
    </footer>
    
    
    <script>
        let year = new Date().getFullYear()
        document.getElementById('year').innerHTML = year 
    </script>
    </body>
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
    



