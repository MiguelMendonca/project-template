var server = require('./../index.js')
var resources = require('./../resources')


server.route({
  method: 'GET',
  path: '/hello',
  handler: resources.hello.get
})

server.route({
  method: 'POST',
  path: '/hello',
  handler: resources.hello.post
})

server.route({
	method:'POST',
	path: '/login',
	handler: resources.hello.login
})

server.route({
	method:'POST',
	path: '/reqs',
	handler: resources.hello.reqs
})

server.route({
	method:'POST',
	path: '/pats',
	handler: resources.hello.pats
})

server.route({
	method:'POST',
	path: '/selpat',
	handler: resources.hello.selpat
})

server.route({
	method:'GET',
	path: '/acts',
	handler: resources.hello.acts
})

server.route({
	method:'POST',
	path: '/reimburse',
	handler: resources.hello.reimburse
})