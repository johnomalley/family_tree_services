const client = require('./client')
const fromPairs = require('lodash/fromPairs')
const map = require('lodash/map')
const compact = require('lodash/compact')

const mapResponses = ({Responses}) => fromPairs(Responses.family_member.map((doc) => [doc.id, doc]))

const batchArgs = (ids) => ({
    RequestItems: {
        'family_member': {
            Keys: ids.map((id) => ({id}))
        }
    }
})

const rawFamilyMembers = (ids) =>
    ids.length ? client.batchGet(batchArgs(ids)).promise().then(mapResponses) : Promise.resolve({})

const familyMembers = (ids) => rawFamilyMembers(ids).then((members) => withSpousesAndPartners(members))

const withSpousesAndPartners = (members) =>
    rawFamilyMembers(compact(map(members, ({spouse, partner}) => spouse || partner)))
        .then((spousesAndPartners) => Object.assign(members, spousesAndPartners))

module.exports = familyMembers
