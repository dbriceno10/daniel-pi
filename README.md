<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - WikiDex

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

## Enunciado 🚀

Se trata de una Single Page Aplication (SPA) en la cual se pueden listar a todos los distintos pokemones existentes actualmente así como distinta información relacionada a ellos a través de la api externa [PokeApi](https://pokeapi.co/) y a partir de ella poder, entre otras cosas:
  
  - Cargar una lista inicial de pokemones (40 por defecto)
  - Buscar pokemones
  - Crear tu propio pokemón
  - Filtrar a los pokemones de la API o creados por el usuario
  - Filtrar por tipos de pokemones
  - Ordenarlos en orden ascendente/descendente alfabéticamente
  - Ver los detalles de cada pokemón

## Tecnologías Utilizadas 🛠️
* __HTML__
* __CSS__
* __JavaScript__
* __React__
* __Redux__
* __NodeJs__
* __Express__
* __Sequelize - Postgres__

### Pre-requisitos 📋
 Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

 * __Node__: 12.18.3 o mayor
 * __NPM__: 6.14.16 o mayor

Para verificar que versión tienen instalada:

> node -v
>
> npm -v
## Instrucciones 🔧

 1. Clonar el repositorio
 2. Crear una base de datos en postgres llamada dogs
 3. El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente. 
 4. En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres.

 5. Ejecutar los siguientes comandos en las carpetas `/api` y `/client`

npm install


npm start


6. Por ultimo abra http://localhost:3000

## Despliegue 📦

La app tiene desplegado el backend y la base de datos en [Render](https://render.com/) y el frontend en [Vercel](https://vercel.com/).

Puedes visitar la app desplegada [Acá](https://daniel-pi.vercel.app/)

Puedes ver el video de prensentación en LinkedIn [Acá](https://www.linkedin.com/feed/update/urn:li:activity:6877424908440260608/)

<img src="./client/public/miniatura.png"/>

⌨️ con ❤️ por [dbriceno10](https://github.com/dbriceno10) 😊
