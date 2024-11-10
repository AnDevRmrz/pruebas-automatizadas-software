## Integrantes:

* Hector Andres Ramirez (ha.ramirezg1@uniandes.edu.co)
* Tomas Acosta Bernal (t.acosta@uniandes.edu.co)
* Felipe Suárez (f.suarezb@uniandes.edu.co)
* Hernan Dario Jimenez (hd.jimenezl1@uniandes.edu.co)

## Importante:

* La información de la wiki se encuentra en el siguiente link: https://github.com/AnDevRmrz/pruebas-automatizadas-software/wiki/Semana-5

## Instalación:

### Conceptos generales:

* Las pruebas E2E de kraken sólo funcionan correctamente en sistemas unix (Linux, Mac).
* Para las pruebas E2E de kraken se debe hacer los mismos pasos de instalación que sugiere el siguiente link -> https://thesoftwaredesignlab.github.io/AutTestingCodelabs/kraken-web-testing-tool/index.html#0
* Cada que se vaya a ejecutar las pruebas E2E, ya sea con kraken o con playwright, es importante crear una nueva instancia de ghost desde cero. Para ello, se requiere tener instalado docker.
* A continuación se indicará el comando docker para subir el ghost
```
docker run -d --name ghost_1 -e NODE_ENV=development -e url=http://localhost:3002 -p 3002:2368 ghost:5.96.0
```

* En caso de que se quiera ejecutar nuevamente las pruebas E2E con cualquiera de las dos herramientas, puedes volver a crear la instancia de ghost desde cero utilizando este comando:

```
docker stop ghost_1 && docker rm ghost_1 && docker run -d --name ghost_1 -e NODE_ENV=development -e url=http://localhost:3002 -p 3002:2368 ghost:5.96.0
```
* La versión de NodeJs sugerida es v20.18.0


### Kraken:

* Para iniciar, abra una terminal y ubíquese en la carpeta de kraken
* Inicie la instancia de ghost desde cero utilizando el comando sugerido
* Instala las dependencias del proyecto con el siguiente comando:
```
npm install
```

* Ejecute las pruebas de kraken con el siguiente comando:
```
./node_modules/kraken-node/bin/kraken-node run
```
* La automatización iniciará creando el administrador de ghost
* Después de inicializar el administrador, se dará inicio a la ejecución de los 20 escenarios de prueba.
* Los resultados los podrá ver en la carpeta reports.

### Playwright:

* Para iniciar, abra una terminal y ubíquese en la carpeta de playwright
* Inicie la instancia de ghost desde cero utilizando el comando sugerido
* Instala las dependencias del proyecto con el siguiente comando:
```
npm install
```
* Instala los browsers requeridos para playwright con el siguiente comando:
```
npx playwright install
```
* Ejecute las pruebas de playwright con el siguiente comando:
```
node index.js
```
* La automatización iniciará creando el administrador de ghost
* Después de inicializar el administrador, se dará inicio a la ejecución de los 20 escenarios de prueba.
* Los resultados los podrá ver en la carpeta test-results
