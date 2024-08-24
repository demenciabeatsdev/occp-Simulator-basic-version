// wsClient.js
let wsClient = null;

function setWebSocketClient(ws) {
  wsClient = ws;
}

function getWebSocketClient() {
  return wsClient;
}

module.exports = {
  setWebSocketClient,
  getWebSocketClient
};
