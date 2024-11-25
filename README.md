## Integrantes:

* Hector Andres Ramirez (ha.ramirezg1@uniandes.edu.co)
* Tomas Acosta Bernal (t.acosta@uniandes.edu.co)
* Felipe Suárez (f.suarezb@uniandes.edu.co)
* Hernan Dario Jimenez (hd.jimenezl1@uniandes.edu.co)

## Importante:

* La información de la wiki se encuentra en el siguiente link: https://github.com/AnDevRmrz/pruebas-automatizadas-software/wiki/Semana-7

## Instalación:

### Conceptos generales:

* Cada que se vaya a ejecutar las pruebas E2E con playwright, es importante crear una nueva instancia de ghost desde cero. Para ello, se requiere tener instalado docker.

* A continuación se indicará el comando docker para subir el ghost
```
docker run -d --name ghost_1 -e NODE_ENV=development -e url=http://localhost:3002 -p 3002:2368 ghost:5.96.0

```

* En caso de que se quiera ejecutar nuevamente las pruebas E2E, puedes volver a crear la instancia de ghost desde cero utilizando este comando:

```
docker stop ghost_1 && docker rm ghost_1 && docker run -d --name ghost_1 -e NODE_ENV=development -e url=http://localhost:3002 -p 3002:2368 ghost:5.96.0
```

* La versión de NodeJs sugerida es v20.18.0

En este componente tenemos que preparar las dependencias de 1 módulo Node js. Básicamente es ejecutar el comando npm install en la siguiente ruta

- %ruta_instalacion%/playwright

### Ejecución 120 pruebas E2E

Se debe ejecutar el comando node index.js en la siguiente ruta

- %ruta_instalacion%/playwright

### Evidencia 120 Pruebas Exitosas

