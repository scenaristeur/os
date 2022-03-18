
let docId = window.location.hash.replace(/^#/, '')
let binary = await localforage.getItem(docId)

let doc = Automerge.init()
// Call when the app starts up
loadFromRemote(docId)
let channel = new BroadcastChannel(docId)

channel.onmessage = (ev) => {
  let newDoc = Automerge.merge(doc, Automerge.load(ev.data))
  doc = newDoc
  render(newDoc)
}

if (binary) {
  doc = Automerge.load(binary)
  render(doc)
}
console.log(doc)

let actorId = Automerge.getActorId(doc)
console.log(actorId)


let form = document.querySelector("form")
let input = document.querySelector("#new-todo")


form.onsubmit = (ev) => {
  ev.preventDefault()
  addItem(input.value)
  input.value = null
}

function addItem(text) {
  let newDoc = Automerge.change(doc, doc => {
    if (!doc.items) doc.items = []
    doc.items.push({ text, done: false })
  })
  updateDoc(newDoc)
}

function updateDoc(newDoc) {
  doc = newDoc
  render(newDoc)
  let binary = Automerge.save(newDoc)
  localforage.setItem(docId, binary).catch(err => console.log(err))
  channel.postMessage(binary)
  saveToRemote(docId, binary)
}

function toggle(element) {
  let id = element.target.id
  console.log(id)
  let newDoc = Automerge.change(doc, (doc) => {
    delete doc.items[id]
  })
  updateDoc(newDoc)
}

function render(doc) {
  let list = document.querySelector("#todo-list")
  list.innerHTML = ''
  doc.items && doc.items.forEach((item, index) => {
    let itemEl = document.createElement('li')
    itemEl.innerText = item.text
    itemEl.id = index
    itemEl.style = item.done ? 'text-decoration: line-through' : ''
    itemEl.onclick = toggle
    list.appendChild(itemEl)
  })
}


// remote
function saveToRemote(docId, binary) {
  fetch(`http://localhost:5000/${docId}`, {
    body: binary,
    method: "post",
    headers: {
      "Content-Type": "application/octet-stream",
    }
  }).catch(err => console.log(err))
}

async function loadFromRemote(docId) {
  const response = await fetch(`http://localhost:5000/${docId}`)
  if (response.status !== 200) throw new Error('No saved draft for doc with id=' + docId)
  const respbuffer = await response.arrayBuffer()
  if (respbuffer.byteLength === 0) throw new Error('No saved draft for doc with id=' + docId)
  const view = new Uint8Array(respbuffer)
  let newDoc = Automerge.merge(doc, Automerge.load(view))
  doc = newDoc
  render(newDoc)
}
