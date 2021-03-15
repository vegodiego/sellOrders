# SELL ORDERS

Este proyecto responde a la prueba de evaluación técnica para la vacante de desarrollador full stack en la empresa Melonn.


### Instalación 🚀

_Una vez se tiene el repositorio en la maquina local abrir una terminal y navegar en ella hasta el directorio sell-orders-backend, estando allí ejecutar el comando:_ 

```
npm i
```
_De esta forma quedan instaladas las dependencias del backend y ahora se puede ejecutar el comando:_ 

```
npm start
```
_Siendo así el backend se ejecutará localmente en localhost 4000. Ahora para el frontend usar otra terminal con ubicación en el directorio sell-orders-frontend y ejecutar de nuevo el comand:_ 

```
npm i
```
_De esta forma se instalan las dependencias del frontend y ahora podemos ejecutar el comando:_ 

```
npm start
```
_Ahora el frontend se ejecutará localmente en localhost 3000 y se puede probar la aplicación desde el navegador querido._


## Construido con 🛠️

* React.js
* Express.js
* Node.js


## Inconsistencia encontrada

En la prueba encontré una inconsistencia en el diagrama usado para calcular las promesas. Para lo cual adjunto dos imagenes que permiten dar mayor claridad a ello, en la imagen1 se muestra la parte donde hay una inconsistencia en el diagrama y en la imagen2 se muestra el valor que tendría maxDeltaBussinesDays en elshipping method con id 4 (consulta a la API usando postman)

La inconsistencia de la que hablo se puede ver claramente con el siguiente ejemplo:

En el caso que se cree una orden que use el único case que existe para el shipping method con id 4 y dicha orden cumpla los requisitos horarios y de peso exigidos, maxDeltaBussinesDays tendría un valor de 0 que generaría mas adelante nextBusinessDays[-1] como se muestra en la imagen1, situación imposible que generaría un error en el backend.