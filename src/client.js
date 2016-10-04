const AWS = require('aws-sdk')


module.exports = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})
