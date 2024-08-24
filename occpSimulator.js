// Importar la biblioteca WebSocket
const WebSocket = require('ws');
const { setWebSocketClient } = require('./server/wsClient');

// Función para inicializar el servidor WebSocket
function startOCCPWebSocketServer(port = 8080) {
  const server = new WebSocket.Server({ port });
  let chargingInterval; // Variable para almacenar el intervalo de carga
  let currentSoC = 0; // Estado inicial de la carga
  let deliveredkW = 0; // Energía entregada en kW
  let isCharging = false; // Estado para verificar si la carga está en curso

  server.on('connection', (ws) => {
    console.log('Cliente conectado via WebSocket');
    setWebSocketClient(ws);

    // Manejar los mensajes recibidos del cliente
    ws.on('message', (message) => {
      // Convertir el mensaje a una cadena de texto
      const trimmedMessage = message.toString().trim().toLowerCase();
      console.log(`Comando recibido: ${trimmedMessage}`);

      // Responder según el comando recibido
      if (trimmedMessage === 'startcharge') {
        if (!isCharging) {
          ws.send(JSON.stringify({ message: 'Cargando...'})); // Respuesta al comando StartCharge
          startCharging(ws); // Iniciar proceso de carga
        } else {
          ws.send(JSON.stringify({ message: 'La carga ya está en curso. Detén la carga antes de iniciar una nueva.' }));
        }
      } else if (trimmedMessage === 'stopcharge') {
        if (isCharging) {
          ws.send(JSON.stringify({ message: `Carga detenida en ${currentSoC}%. Total kW entregados: ${deliveredkW.toFixed(2)} kW.` })); // Respuesta al comando StopCharge con SoC actual y kW entregados
          stopCharging(); // Detener proceso de carga
        } else {
          ws.send(JSON.stringify({ message: 'No hay ninguna carga en curso para detener.' }));
        }
      } else {
        ws.send(JSON.stringify({ message: 'Comando no reconocido.'})); // Respuesta a un comando no reconocido
      }
    });

    // Manejar cuando un cliente se desconecta
    ws.on('close', () => {
      console.log('Cliente desconectado');
      stopCharging(); // Detener carga si el cliente se desconecta
    });
    console.log(`Servidor OCCP WebSocket escuchando en el puerto ${port}`);
  });

  // Función para iniciar el proceso de carga
  function startCharging(ws) {
    currentSoC = 0; // Reiniciar el estado de carga
    deliveredkW = 0; // Reiniciar los kW entregados
    isCharging = true; // Marcar que la carga está en curso
    chargingInterval = setInterval(() => {
      // Incremento entre 2% y 5%
      const increment = Math.floor(Math.random() * 4) + 2;
      currentSoC = Math.min(currentSoC + increment, 100); // Limitar el SoC al 100%

      // Calcular los kW entregados en base al SoC y el tiempo transcurrido (2 segundos por intervalo)
      const kWIncrement = (0.01 * increment); // kW entregados en relación al incremento del SoC
      deliveredkW += kWIncrement; // Acumular los kW entregados
      
      const fecha = new Date().toLocaleString(); // Obtener la fecha y hora actual
      ws.send(JSON.stringify({ message: `SoC: ${currentSoC}%. kW entregados: ${deliveredkW.toFixed(2)} kW.`, fecha })); // Enviar el estado de carga y kW entregados al cliente

      // Si la carga llega al 100%, detenerla automáticamente
      if (currentSoC >= 100) {
        ws.send(JSON.stringify({ message: `Carga completa. Energía total entregada: ${deliveredkW.toFixed(2)} kW.`, fecha }));
        stopCharging();
      }
    }, 2000); // Intervalo de 2 segundos para simular la carga
  }

  // Función para detener el proceso de carga
  function stopCharging() {
    clearInterval(chargingInterval);
    chargingInterval = null;
    isCharging = false; // Marcar que la carga ha sido detenida
  }
}

// Iniciar el servidor WebSocket
startOCCPWebSocketServer(8080);
