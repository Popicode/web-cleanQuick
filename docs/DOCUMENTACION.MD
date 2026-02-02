Dependencias instaladas:

Producción: 
express 5.2.0 "Servidor HTTP"
dotenv 17.2.3 "Permite cargar variables de entorno"
express-rate-limit 8.2.1 "Permite hacer rate limiting"
helmet 8.1.0 "Headers seguros para los navegadores"
Resend "Envío de email"

Dev: Nodemon 3.1.11. "Reinicia el sv al guardar"

# Para verificar mejor las dependencias, visitar el './package.json'

-----------

El servicio de email será reemplazado por el siguiente motivo:
- En hosting como Render-Railway los servicios gratuitos bloquean SMTP, por temas de spam, etc.