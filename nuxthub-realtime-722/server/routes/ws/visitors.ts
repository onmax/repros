const peers = new Set<any>()

function broadcast() {
  const message = JSON.stringify({ type: 'visitors', count: peers.size })
  for (const peer of peers) {
    peer.send(message)
  }
}

export default defineWebSocketHandler({
  open(peer) {
    peers.add(peer)
    broadcast()
  },
  close(peer) {
    peers.delete(peer)
    broadcast()
  }
})
