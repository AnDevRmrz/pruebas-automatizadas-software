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

Las 120 pruebas no se pueden ejecutar de seguido ya que cada escenario estará iniciando sesión al principio. Cuando se inicia sesión más de 90 veces, Ghost tiene un mecanismo de bloqueo, por lo que no permitirá que se inicie sesión de nuevo.

Debido a lo anterior, se divide la ejecución de las 120 pruebas en dos bloques de la siguiente forma:

Los siguientes comandos deben ejecutados en la ruta

- %ruta_instalacion%/playwright

Para ejecutar las primeras 60 E2E (1 - 60) utiliza el siguiente comando:

- node index.js 1

Para ejecutar las últimas 60 E2E (61 - 120) utiliza el siguiente comando:

- node index.js 2

Cada ejecución de pruebas debe tener una instancia de Docker reiniciada (Cold Start).

### Consideraciones

- Dada la aleatoriedad de los escenarios, es posible obtener fallos cuando se quiere editar un elemento utilizando datos repetidos, los cuales no van a generar un escenario de edición. Es decir, si en un escenario de cambiar el lenguaje general de Ghost, casualmente en el escenario Random y el escenario A priori Utilizaron exactamente el mismo valor, esta prueba va a fallar porque no habrá cambios a realizar.

- Si previamente se crea un elemento y, debido a la aleatoriedad de los datos, en otro escenario se utilizan los mismos datos en una prueba de eliminación, el test podría fallar. Esto ocurriría porque se realizaría una validación que contempla que el elemento ya no debería estar presente en el listado de objetos.

- Las API utilizadas de Mockaroo tienen una quota fija de 200 peticiones. Hay 3 cuentas en uso. Esto es muy importante porque ya hemos experimentado el límite de uso y siempre retornará un código HTTP 500, rompiendo las pruebas.

### Evidencias Ejecución

![image](https://github.com/user-attachments/assets/698f24b3-6df3-4dd0-a327-8623af0ce8e8)

![image](https://github.com/user-attachments/assets/c6f57655-e161-4e41-bf7d-c07594bb567b)

![image](https://github.com/user-attachments/assets/18d17f8d-cbd1-40f2-95ee-807aa2a5a104)

![image](https://github.com/user-attachments/assets/b3d00002-e752-472d-882b-240ca36a2c52)

![image](https://github.com/user-attachments/assets/056b8357-1ed6-4209-83c9-151ff376bfa9)

![image](https://github.com/user-attachments/assets/129a39b9-d513-4b1d-a075-cda6871e4f96)

![image](https://github.com/user-attachments/assets/a3e28fd8-bdc4-4fc5-85d4-ca71d98aa155)

![image](https://github.com/user-attachments/assets/66a26512-9deb-4d88-8f0e-13263d283653)






