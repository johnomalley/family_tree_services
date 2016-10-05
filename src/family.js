const keys = require('lodash/keys')
const client = require('./client')
const familyMembers = require('./familyMembers')

const include = (id) => id ? {[id]: true} : null

const allMemberIds = ({id, children}) =>
    Object.assign(include(id), allMemberIdsForChildren(children))

const allMemberIdsForChildren = (children = []) =>
    children.length ? Object.assign(allMemberIds(children[0]), allMemberIdsForChildren(children.slice(1))) : {}

const memberIds = ({members}) => keys(allMemberIdsForChildren(members)).sort()

const resolve = ({id, children}, membersById) => {
    const member = membersById[id]
    const childrenProperty = children ? {children: resolveMembers(children, membersById)} : null

    const resolveProperty = (propertyName) =>
        member[propertyName] ? {[propertyName] : membersById[member[propertyName]]} : null

    return Object.assign({}, member, childrenProperty, resolveProperty('spouse'), resolveProperty('partner'))
}

const resolveMembers = (children = [], membersById) => children.map((child) => resolve(child, membersById))

const buildFamily = (rootDocument) =>
    familyMembers(memberIds(rootDocument)).then((membersById) => ({
         id: rootDocument.id,
         members: resolveMembers(rootDocument.members, membersById)
    }))

const family = (id) => client.get({TableName: 'family', Key: {id}}).promise()
        .then(({Item}) => Item && buildFamily(Item))

module.exports = family
