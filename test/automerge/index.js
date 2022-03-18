//https://automerge.org/docs/quickstart/
/*    It is treated as immutable, so all changes must go through Automerge.change().
Every object has a unique ID, which you can get by passing the object to the Automerge.getObjectId() function.
This ID is used by Automerge to track which object is which.
Objects also have information about conflicts,
which is used when several users make changes to the same property concurrently (see conflicts).
*/

import * as Automerge from 'automerge'

let doc1 = Automerge.init()

doc1 = Automerge.change(doc1, 'Add card', doc => {
  doc.cards = []
  doc.cards.push({ title: 'Rewrite everything in Clojure', done: false })
  doc.cards.push({ title: 'Rewrite everything in Haskell', done: false })
})

console.log(doc1)

let doc2 = Automerge.init()
doc2 = Automerge.merge(doc2, doc1)

console.log(doc2)

doc1 = Automerge.change(doc1, 'Mark card as done', doc => {
  doc.cards[0].done = true
})
doc2 = Automerge.change(doc2, 'Delete card', doc => {
  delete doc.cards[1]
})

let finalDoc = Automerge.merge(doc1, doc2)

console.log(finalDoc)

let history = Automerge.getHistory(finalDoc).map(state => [state.change.message, state.snapshot.cards.length])
console.log(history)
