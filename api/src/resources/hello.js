var bl = require('../../../bl/src')

exports = module.exports

exports.get = function handler (request, reply) {
  reply(bl.sayHello())
}

exports.post = function handler (request, reply) {
  reply(bl.sayHello(request.payload.name))
}

exports.login = function handler (request, reply) {
	reply(bl.login(request.payload.username, request.payload.password))
}

exports.reqs = function handler (request, reply) {
	reply(bl.postreqs(request.payload.docID))
}

exports.pats = function handler (request, reply) {
	reply(bl.postpats(request.payload.docID))
}

exports.selpat = function handler (request, reply) {
	reply(bl.selp(request.payload.policytype))
}

exports.acts = function handler (request, reply) {
	reply(bl.acts())
}

exports.reimburse = function handler (request, reply) {
	reply(bl.reimburse(request.payload.actID, request.payload.policytype))
}
