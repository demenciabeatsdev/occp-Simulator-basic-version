
# Documentación para Cambiar Valores de Intervalos de Porcentaje y Tiempo en startCharging

## 1. Cambiar el Rango de Incremento del SoC

### Ejemplo 1: Incremento entre 2% y 5%
```javascript
const increment = Math.floor(Math.random() * 4) + 2;
```
- Genera un incremento aleatorio entre 2% y 5%.

### Ejemplo 2: Incremento fijo de 5%
```javascript
const increment = 5;
```
- Incrementa el SoC exactamente en 5% cada vez.

### Ejemplo 3: Incremento aleatorio entre 10% y 20%
```javascript
const increment = Math.floor(Math.random() * 11) + 10;
```
- Genera un incremento aleatorio entre 10% y 20%.

### Ejemplo 4: Incremento aleatorio entre 0.5% y 1.5%
```javascript
const increment = (Math.random() * 1) + 0.5;
currentSoC = Math.min(currentSoC + increment, 100).toFixed(1);
```
- Genera un incremento aleatorio entre 0.5% y 1.5%, redondeando a un decimal.

## 2. Cambiar el Intervalo de Tiempo entre Actualizaciones

### Ejemplo 1: Intervalo fijo de 2 segundos
```javascript
setInterval(() => {
  // código
}, 2000);
```
- Actualiza el SoC cada 2 segundos.

### Ejemplo 2: Intervalo aleatorio entre 2 y 3 segundos
```javascript
setInterval(() => {
  // código
}, (Math.random() * 1000) + 2000);
```
- Genera un intervalo aleatorio entre 2 y 3 segundos.

### Ejemplo 3: Intervalo aleatorio entre 0.5 y 1 segundo
```javascript
setInterval(() => {
  // código
}, (Math.random() * 500) + 500);
```
- Genera un intervalo aleatorio entre 0.5 y 1 segundo.

### Ejemplo 4: Intervalo aleatorio entre 5 y 10 segundos
```javascript
setInterval(() => {
  // código
}, (Math.random() * 5000) + 5000);
```
- Genera un intervalo aleatorio entre 5 y 10 segundos.

## 3. Modificar el Límite Máximo del SoC

### Ejemplo 1: Límite máximo de SoC al 80%
```javascript
currentSoC = Math.min(currentSoC + increment, 80);
if (currentSoC >= 80) {
  ws.send('Carga completa.');
  stopCharging();
}
```
- Limita el SoC máximo a 80%.

### Ejemplo 2: Límite máximo de SoC al 50%
```javascript
currentSoC = Math.min(currentSoC + increment, 50);
if (currentSoC >= 50) {
  ws.send('Carga completa.');
  stopCharging();
}
```
- Limita el SoC máximo a 50%.

### Ejemplo 3: Sin límite máximo de SoC (puede exceder 100%)
```javascript
currentSoC += increment;
```
- Permite que el SoC exceda el 100%.

## Combinando Todos los Cambios
- Puedes combinar las modificaciones de incremento, intervalo de tiempo y límite máximo del SoC para crear la simulación exacta que necesitas.
