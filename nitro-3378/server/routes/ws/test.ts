const peers = new Set<any>()

export default defineWebSocketHandler({
  open(peer) {
    peers.add(peer)
    broadcast()
  },
  close(peer) {
    peers.delete(peer)
    broadcast()
  },
})

function broadcast() {
  const msg = JSON.stringify({ type: 'peers', count: peers.size })
  for (const peer of peers) peer.send(msg)
}
