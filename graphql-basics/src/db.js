const users = [{
	id: '1',
	name: 'Regi',
	email: 'regi@domain.com',
	age: 27
}, {
	id: '2',
	name: 'Jorge',
	email: 'jorge@domain.com',
}]

const posts = [    {
	id: '1',
	title: 'Udemy cource',
	body: 'Learn something cool',
	author: 2,
	published: true
}, {
	id: '2',
	title: 'Graphql 101',
	body: 'Learn how GraphQL works, this is beautifull!',
	author: 2
}]

const comments = [{
	id: 'c1',
	text: 'Awesome GraphQL course!',
	author: 1
}, {
	id: 'c2',
	text: 'My comment is here',
	author: 1
}, {
	id: 'c3',
	text: 'Something nice is happening right now!',
	author: 2
}]

const db = {
  user,
  posts,
  comments
}

export { db as default }