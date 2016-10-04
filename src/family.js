const client = require('./client')

const buildFamily = (rootDocument) => findMembers(rootDocument)
    .then((membersById))

const family = (id) => client.get({TableName: 'family', Key: {id}})
    .then(({Item}) => Item && buildFamily(Item))