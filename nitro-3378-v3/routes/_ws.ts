export default defineWebSocketHandler({
  open(peer) { console.log('[ws] open', peer) },
  message(peer, message) { peer.send('pong: ' + message.text()) },
  close(peer) { console.log('[ws] close', peer) },
})
