#!/usr/bin/env node
//https://nodejs.org/api/module.html#module_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const Room = require('ipfs-pubsub-room')
const IPFS = require('ipfs')

const ipfs = await IPFS.create() // { ... }
const room = Room(ipfs, 'room-name')

room.on('peer joined', (peer) => {
  console.log('Peer joined the room', peer)
})

room.on('peer left', (peer) => {
  console.log('Peer left...', peer)
})

// now started to listen to room
room.on('subscribed', () => {
  console.log('Now connected!')
})


room.on('message', (message) => {
  console.log(message)
})

room.broadcast(message)
