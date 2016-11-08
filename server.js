// Libraries
var express = require('express') // the webserver, prewritten
var nunjucks = require('nunjucks')
var bodyParser = require('body-parser') // parses out the body on your fetch
var multer = require('multer')  // can take in file uploads

// Setup
var port = process.env.PORT || 8080
var app = express() // this starts the server
var upload = multer({ dest: 'public/uploads/' }) // uses multer on file upload

// Middleware
app.use(bodyParser.json()) // this is running a parse script for text
app.use(bodyParser.urlencoded({ extended: true }))  // this is running a script to parse formData, like image.

nunjucks.configure('views', {  // telling nunjucks to attach itself to app using views folder
    autoescape: true, // prevents hacking?
    express: app
})
// Request
app.post('/photos', upload.single('photo'), (req, res) => {
    res.json(req.body)
})

app.get('/', (req, res) => {  // Route: This routes the site routing.
    // console.log(req)
    if (req.query.api_token === '12345' && req.query.username ==='joel') {
        res.render('loggedin.html', {
            // username: req.query.username,
            queryStuff: req.query,
            users: ['Joel', 'Jeff', 'Katie']
        })
    }
    else {
        res.render('loggedout.html')

    }

})
app.get('/api', (req, res) => {  // Route: This routes the site routing.
    res.send('API would be here!')
})
app.get('/api/users', (req, res) => {  // Route: This routes the site routing.
    var users = [
        {
            id: 'joe',
            last: 'londo'
        },
        {
            id: 'joe',
            last: 'londo'
        },
    ]
    res.json(users)
})

// Response
app.use(express.static('public'))

app.listen(port) // specifies the port to listen on.  Defined up top
console.log('Public Server http://localhost:' + port)
console.log('Press Ctrl+C to Exit')
