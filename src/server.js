const express = require('express')
const app = express()
// const allMembers = require('./allMembers')
const family = require('./family')

app.get('/families/:familyId', ({params: {familyId}}, res, next) => {
    family(familyId)
        .then((result) => result ? res.json(result) : res.status(404).send(`no such family: ${familyId}`))
        .catch(next)
})

const port = parseInt(process.env.PORT, 10) || 3000

// production error handler
// no stacktraces leaked to user
app.use((error, req, res, next) => {
    if (error) {
        console.error(error.stack)
        res.json(error)
    } else {
        next()
    }
})

app.listen(port, () => console.log(`listening on port ${port}`))
