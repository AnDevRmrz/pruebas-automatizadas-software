## Integrantes:

* Hector Andres Ramirez (ha.ramirezg1@uniandes.edu.co)
* Tomas Acosta Bernal (t.acosta@uniandes.edu.co)
* Felipe Suárez (f.suarezb@uniandes.edu.co)
* Hernan Dario Jimenez (hd.jimenezl1@uniandes.edu.co)

## Importante:

* La información de la wiki se encuentra en el siguiente link: https://github.com/AnDevRmrz/pruebas-automatizadas-software/wiki/Semana-8

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

En este componente tenemos que preparar las dependencias de 1 módulo Node js. Básicamente es ejecutar el comando `npm install` en la ruta donde se descargo el repositorio.

### Ejecución pruebas E2E

Las pruebas E2E en Chromium y en Firefox no se pueden ejecutar de seguido ya que cada escenario estará iniciando sesión al principio. Cuando se inicia sesión más de 90 veces, Ghost tiene un mecanismo de bloqueo, por lo que no permitirá que se inicie sesión de nuevo.

Debido a lo anterior, se divide la ejecución dependiendo de la accion que se quiera ejecutar de la siguiente forma:

Los siguientes comandos deben ser ejecutados en la ruta donde se descargó el repositorio

Para ejecutar las pruebas E2E utilizando Chromium se debe correr el siguiente comando:

- `node index.js 1`

Para ejecutar las pruebas E2E utilizando Firefox se debe correr el siguiente comando:

- `node index.js 2`

Cada ejecución de pruebas debe tener una instancia de Docker reiniciada (Cold Start).

Para generar el reporte VRT se debe ejecutar el siguiente comando:
- `node index.js 3`

Si desea realizar una nueva ejecución de pruebas E2E con los dos navegadores, por favor elimina primero todo el contenido de la carpeta test-results.

### Consideraciones

- Si previamente se crea un elemento y, debido a la aleatoriedad de los datos, en otro escenario se utilizan los mismos datos en una prueba de eliminación, el test podría fallar. Esto ocurriría porque se realizaría una validación que contempla que el elemento ya no debería estar presente en el listado de objetos.

### Reporte VRT
Para observar el resultado de los reporte generados, por favor dirijase a la siguiente ruta `%ruta de descarga de repo%/vrt/output` y abra el archivo `index.html`. Debera observar una página web como la siguiente:

![image](https://github.com/user-attachments/assets/d38f920d-b5af-48dc-804f-b03a031fde43)
![image](https://github.com/user-attachments/assets/3a5ca39c-1140-478f-ace7-b4f6c3957230)
