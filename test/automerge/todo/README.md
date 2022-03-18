# todo tuto app

 https://automerge.org/docs/tutorial/setup/

```
npx http-server
```
et lancer le server dans fileserver


```
import * as Automerge from 'automerge'

let doc = Automerge.init()
console.log(doc)
```

- exemple http://localhost:8080/#groceries
 ou http://localhost:8080/#pat

 sont des documents différents enregistrés dans le navigateur

 -- dans le todo, on envoi tout le doc , mais pour plus d'efficience https://automerge.org/docs/cookbook/real-time/

!!!
 Exercise​

In this implementation, the server does not push any updates to clients; if the file changes on the server, clients don't find out until they next run loadFromRemote(). As an exercise, you can replace the HTTP server with a WebSocket server, and when one client sends an update to the server, it is pushed to all other connected clients.

Moreover, there is a bug in our implementation. There is a race condition: if two devices are uploading the document in rapid succession, they could override each other's files in the remote storage server, resulting in the server copy containing one or the other's edits, but not the merged set of both users' edits.

Modify the server to remove this race condition. Before overriding a local file, the server should check the local filesystem for an existing copy. Use Automerge.merge on the incoming and local file before saving it to disk.

Hints

There are multiple ways to solve this problem, and it's very open ended. You could also solve this on the client, by fetching files and merging with them before saving to the server.

In this experimental React demo, you can see how a Python file server can be used to store Automerge files. You could also use a Cloud service like Amazon S3 or Digital Ocean Spaces as a remote storage location.



--------------------

Here are a few demos that you can use if you'd prefer to see a full working implementation.

    https://github.com/pvh/automerge-demo/ uses Svelte and BroadcastChannel for the network.
    https://github.com/okdistribute/automerge-chat-demo uses React and Websockets for the network.
