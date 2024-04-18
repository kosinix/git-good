// Required packages
const fs = require('fs')
const express = require('express')
const nunjucks = require('nunjucks')

// Constants
const appDir = __dirname // Path to app directory
const dirView = appDir + '/data/view' // Path to app directory
const port = 3002

// Express initialization
const app = express()


// Setup templating engine
// Setup nunjucks loader. See https://mozilla.github.io/nunjucks/api.html#loader
let loaderFsNunjucks = new nunjucks.FileSystemLoader(dirView, {
    "noCache": true
})
// Setup nunjucks environment. See https://mozilla.github.io/nunjucks/api.html#environment
let nunjucksEnv = new nunjucks.Environment(loaderFsNunjucks)
nunjucksEnv.express(app) // Hook up express and nunjucks

// Static public files
app.use(express.static(__dirname + '/data/public'));

app.get('/', (req, res) => {
    const authors = fs.readdirSync(__dirname + '/data/public/images/authors', { withFileTypes: true })
        .filter(item => !['.gitignore'].includes(item.name) && !item.isDirectory())
        .map(item => item.name)

    const bscs3a = fs.readdirSync(__dirname + '/data/public/images/bscs3a', { withFileTypes: true })
        .filter(item => !['.gitignore'].includes(item.name) && !item.isDirectory())
        .map(item => item.name)

    const bsit3a = fs.readdirSync(__dirname + '/data/public/images/bsit3a', { withFileTypes: true })
        .filter(item => !['.gitignore'].includes(item.name) && !item.isDirectory())
        .map(item => item.name)

    const bsit3b = fs.readdirSync(__dirname + '/data/public/images/bsit3b', { withFileTypes: true })
        .filter(item => !['.gitignore'].includes(item.name) && !item.isDirectory())
        .map(item => item.name)

    const bsit3c = fs.readdirSync(__dirname + '/data/public/images/bsit3b', { withFileTypes: true })
        .filter(item => !['.gitignore'].includes(item.name) && !item.isDirectory())
        .map(item => item.name)

    res.render('index.html', {
        authors: authors,
        bscs3a: bscs3a,
        bsit3a: bsit3a,
        bsit3b: bsit3b,
        bsit3c: bsit3c,
    })
})
app.get('/branching', (req, res) => {
    res.render('branching.html')
})

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})