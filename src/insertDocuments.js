const fs = require('fs')

const promisify = require('es6-promisify')

const modelDir = `${__dirname}/model`

const documents = fs.readdirSync(modelDir)
    .map((f) => JSON.parse(fs.readFileSync(`${modelDir}/${f}`, {encoding: 'utf8'})))

const client = require('./client')

module.exports = () =>
    Promise.all(documents.map((Item) => client.put({TableName: 'family_member', Item}).promise()))

