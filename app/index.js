function generatePostRow(post) {
	let tr = document.createElement("tr")

	let id = document.createElement("td")
	id.innerText = post.id
	let published = document.createElement("td")
	published.innerText = post.published
	let title = document.createElement("td")
	title.innerText = post.title
	let body = document.createElement("td")
	body.innerText = post.body

	tr.appendChild(id)
	tr.appendChild(published)
	tr.appendChild(title)
	tr.appendChild(body)
	return tr
}

function insertPostSubmitHandler(e) {
	const f = document.forms["insert-post"]
	const newPost = {
		title: f.elements[0].value,
		body: f.elements[1].value
	}
	console.log("Submitting post : " + JSON.stringify(newPost))
	fetch("http://192.168.0.21:5000/new",
		{
			method: "POST",
			mode: "cors",
			headers: {"Content-Type": "application/json"}, 
			body: JSON.stringify(newPost)
		}).then(res => res.json())
		.then(newPost => {
			const showPostsTable = document.getElementById("show-posts")
			showPostsTable.appendChild(generatePostRow(newPost))
		})
}

window.onload = e => {
	const insertPostButton = document.getElementById("insert-post-button")
	const showPostsTable = document.getElementById("show-posts")

	insertPostButton.onclick = insertPostSubmitHandler

	fetch("http://192.168.0.21:5000/", {mode: "cors"})
		.then(res => res.json())
		.then(o => {
			o.map(generatePostRow)
				.forEach(tr => {
					showPostsTable.appendChild(tr)
				})
		})
}
