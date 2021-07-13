const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express:server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res) {
    const about = {
        avatar_url:"https://avatars2.githubusercontent.com/u/37086193?s=460&v=4",
        name:"José",
        role: "Aluno - Rocketseat",
        description:"progamador iniciante estudante de segurança da informaçao",
        links: [
            { name: "Github", url:"https://Github.com"},
            { name: "Twitter", url:"https://twitter.com"},
            { name: "Linkedin", url:"https://linkedin.com"}
        ]
    }

    return res.render('about', { about })
})


server.get('/portifolio', function(req, res) {
    return res.render('portifolio', {items: videos})
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
      
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", {item: video } )
})

server.listen(5000, function() {
    console.log('Server is Running...')

})