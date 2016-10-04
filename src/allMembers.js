const AWS = require('aws-sdk')
const client = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

const allMembers = () =>
    client.get({
        TableName: 'family_member',
        Key: {id: 'bridget'}
    }).promise().then(({Item}) => Item)

module.exports = allMembers