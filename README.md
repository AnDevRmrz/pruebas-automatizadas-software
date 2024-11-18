## Integrantes:

* Hector Andres Ramirez (ha.ramirezg1@uniandes.edu.co)
* Tomas Acosta Bernal (t.acosta@uniandes.edu.co)
* Felipe Suárez (f.suarezb@uniandes.edu.co)
* Hernan Dario Jimenez (hd.jimenezl1@uniandes.edu.co)

## Importante:

* La información de la wiki se encuentra en el siguiente link: https://github.com/AnDevRmrz/pruebas-automatizadas-software/wiki/Semana-6

## Instalación:

### Conceptos generales:

* Las pruebas E2E de kraken sólo funcionan correctamente en sistemas unix (Linux, Mac).
* Para las pruebas E2E de kraken se debe hacer los mismos pasos de instalación que sugiere el siguiente link -> https://thesoftwaredesignlab.github.io/AutTestingCodelabs/kraken-web-testing-tool/index.html#0
* Cada que se vaya a ejecutar las pruebas E2E, ya sea con kraken o con playwright, es importante crear nuevas instancias de ghost desde cero para cada una de las versiones. Para ello, se requiere tener instalado docker.
* A continuación se indicará los comandos docker para subir el ghost
```
docker run -d --name ghost_1 -e NODE_ENV=development -e url=http://localhost:3002 -p 3002:2368 ghost:5.96.0

docker run -d --name ghost_2 -e NODE_ENV=development -e url=http://localhost:3003 -p 3003:2368 ghost:4.5
```

* En caso de que se quiera ejecutar nuevamente las pruebas de regresión, puedes volver a crear las instancias de ghost desde cero utilizando estos comandos:

```
docker stop ghost_1 && docker rm ghost_1 && docker run -d --name ghost_1 -e NODE_ENV=development -e url=http://localhost:3002 -p 3002:2368 ghost:5.96.0

docker stop ghost_2 && docker rm ghost_2 && docker run -d --name ghost_2 -e NODE_ENV=development -e url=http://localhost:3003 -p 3003:2368 ghost:4.5
```
* La versión de NodeJs sugerida es v20.18.0

En este componente tenemos que preparar las dependencias de 5 módulos Node js. Básicamente es ejecutar el comando npm install en las siguientes rutas

- %ruta_instalacion%/rc/kraken
- %ruta_instalacion%/rc/playwright
- %ruta_instalacion%/base/kraken
- %ruta_instalacion%/base/playwright
- %ruta_instalacion%/regression_tests

### Ejecución pruebas de regresión visual

La idea de este proyecto es permitir la ejecución de todas las pruebas E2E de las versiones base (4.5) y rc (5.96.0) para posteriormente realizar las pruebas de regresión visual utilizando Resemble JS y Pixelmatcher.

Para facilitar la ejecución, desarrollamos una línea de comandos en donde se le permitirá al usuario elegir la herramienta E2E testing, la herramienta de regression testing y también el escenario de prueba en particular que se desea analizar.

![image](https://github.com/user-attachments/assets/54605dc7-bd0c-4185-903c-639c0fa353db)

Para iniciar esta línea de comandos, debemos ejecutar el siguiente comando en la ruta %ruta_instalacion%/regression_tests

```
node index.js
```

Es importante resaltar que, cada vez que se vaya a ejecutar una nueva automatización, es necesario reiniciar los contenedores de Ghosts con los comandos sugeridos.

No se automatizó el reinicio de las versiones de Ghosts porque desconocemos si el usuario tenga configurado el proceso de docker con los permisos suficientes los cuales no requieran un super-usuario o root.

### Resultados 

Una vez ejecutado un escenario de pruebas, los resultados los podrá ver en la siguiente carpeta:

- %ruta_instalacion%/regression_tests/regression-results

![image](https://github.com/user-attachments/assets/411aa44f-edba-4cd5-b734-878c90cd90c1)

![image](https://github.com/user-attachments/assets/1b484d55-1e88-4b1a-ac17-2195e47e372a)

### Generalidades

Una de las principales razones que nos llevó a desarrollar esta línea de comandos fue la dificultad para identificar los resultados de las pruebas E2E de Kraken en un escenario específico. Por ello, decidimos enfocarnos en ejecutar un único escenario de prueba por cada ejecución.
