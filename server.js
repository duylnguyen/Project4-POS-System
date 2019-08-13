const express = require('express')
const app = express()
const { userRouter } = require('./controllers/user.js')
const { checkRouter } = require('./controllers/check.js')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(`${__dirname}/client/build`))
app.use('/api/user', userRouter)
app.use('/api/user/:userId/check', checkRouter)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
