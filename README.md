
# Backend para Ecommerce con Microservicios

Este proyecto es el resultado de numerosas horas de trabajo y dedicación en Henry. Está desarrollado en NestJS y está diseñado para ofrecer una plataforma de compras de productos tecnológicos de alta calidad.

<img src="ecomercer.drawio.png" />

## Tecnologías Utilizadas

- **NestJS**: 🚀 Un framework de Node.js para construir aplicaciones web escalables y eficientes.
- **Kafka**: 📤 Un sistema de mensajería distribuida de alto rendimiento para la gestión de eventos.
- **Jest**: ✅ Un framework de pruebas de JavaScript con un enfoque en la simplicidad.
- **Docker**: 🐳 Una plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.
- **Kubernetes**: ☁️ Un sistema de código abierto para la automatización del despliegue, escalado y gestión de aplicaciones en contenedores.
- **Swagger**: 📝 Una herramienta para documentar APIs de manera clara y fácil de entender.
- **Cloudinary**: ☁️ Un servicio en la nube para el almacenamiento y manipulación de imágenes y videos.
- **Oracle**: 📊 Un sistema de gestión de bases de datos relacional.
- **PostgreSQL**: 🐘 Un sistema de gestión de bases de datos relacional de código abierto y potente.
- **MongoDB**: 🍃 Una base de datos NoSQL orientada a documentos.

## Instalación y Configuración

### Instalación de Contenedores

Este proyecto utiliza Docker para la gestión de contenedores. Asegúrate de tener Docker instalado en tu sistema antes de continuar.

1. Clona este repositorio en tu máquina local.
2. Ejecuta el siguiente comando en la carpeta ecommerce-cos4h del proyecto para construir y levantar los contenedores:

```docker-compose up```


# Configuración de Variables de Entorno

Antes de ejecutar los contenedores, asegúrate de configurar las siguientes variables de entorno necesarias para conectar los servicios:


```
## Configuración para la base de datos de usuarios
USERS_DB_HOST="159.223.205.238"
USERS_DB_PORT="1522"
USERS_DB_USERNAME="admin_user"
USERS_DB_PASSWORD="Admin1234"
USERS_DB_NAME="users_db"
USERS_DB_SID="users_sid"

# Configuración para la base de datos de pedidos
ORDER_DB_HOST="mongodb.example.com"
ORDER_DB_PORT="27017"
ORDER_DB_NAME="orders_db"
ORDER_DB_USERNAME="orders_user"
ORDER_DB_PASSWORD="Orders1234"

ORDER_URI_DEPLOY="mongodb+srv://username:password@cluster.example.net/DB_HENRY_ORDER_MS?retryWrites=true&w=majority&appName=ClusterApp"

# Configuración para la base de datos de productos
PRODUCT_DB_HOST="159.223.205.239"
PRODUCT_DB_PORT=5433
PRODUCT_DB_USERNAME="prod_user"
PRODUCT_DB_PASSWORD="Prod1234"
PRODUCT_DB_NAME="product_db"

# Configuración para la base de datos de autenticación
AUTH_DB_HOST="auth_db.example.com"
AUTH_DB_PORT="3366"
AUTH_DB_USER="auth_user"
AUTH_DB_PASSWORD="Auth1234"
AUTH_DB_DATABASE="auth_db"

# Configuración para Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Configuración para Kafka
KAFKA_BROKER="kafka.example.com:9092"

# Configuración para JWT
SECRET_JWT="your_jwt_secret"

# Configuración para Auth0
AUTH0_SECRET="your_auth0_secret"
AUTHO_BASE_URL="http://auth.example.com"
AUTH0_CLIENT_ID="your_auth0_client_id"
IS_USER_BASE_URL="https://auth0.example.com"
```
## Documentación de la API
La documentación de la API se encuentra disponible en Swagger. Una vez que el servidor esté en funcionamiento, puedes acceder a la documentación en http://localhost:7777/api.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto, por favor sigue estas pautas:

1. Realiza un fork del repositorio.
2. Crea una rama para tu nueva característica (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y asegúrate de que las pruebas pasen.
4. Realiza un commit de tus cambios (`git commit -am 'Agrega nueva característica'`).
5. Sube tus cambios a tu repositorio fork (`git push origin feature/nueva-caracteristica`).
6. Crea un nuevo pull request y describe tus cambios detalladamente.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).
