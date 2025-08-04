# 📺 API de Frases Memorables de Los Simpsons

Proyecto final del **Módulo 4 de Adalab**, centrado en el desarrollo de una **API REST** con Node.js, Express y MySQL. Esta API contiene frases memorables de los personajes de Los Simpsons, junto con la información de sus respectivos capítulos y personajes.

## 🚀 Funcionalidades

### 📥 GET

* `/frases` → Devuelve todas las frases de la API.
* `/personajes` → Devuelve todos los personajes disponibles.
* `/capitulos` → Devuelve todos los capítulos añadidos.

También puedes acceder a un recurso específico por su ID:

* `/frases/:id`
* `/personajes/:id`
* `/capitulos/:id`

---

### ✏️ PUT (Actualizar)

Puedes actualizar cualquier recurso desde **Postman**:

* `/frases/:id`
* `/personajes/:id`
* `/capitulos/:id`

📝 **Importante**:

* En el Body de la petición debes incluir **todos los campos del objeto**, aunque solo quieras modificar uno.
* En ocasiones, algunos campos mostrados no serán editables (por ejemplo, las frases que aparecen al acceder al ID de un personaje).

---

### ❌ DELETE

Desde Postman, accediendo a:

* `/frases/:id`
* `/personajes/:id`
* `/capitulos/:id`

Podrás eliminar registros específicos.

---

### ➕ POST (Crear nuevo recurso)

Puedes crear nuevos registros desde Postman en:

* `/frases`
* `/personajes`
* `/capitulos`

🛑 Asegúrate de enviar todos los campos requeridos en el **Body**. Si falta alguno, la API devolverá un error indicando que no se han completado todos los campos. 

---

## 🌐 Despliegue

* La base de datos se ha creado en **Aiven**.
* La API está desplegada en **Render** y disponible públicamente en:

🔗 [https://modulo-4-evaluacion-final-bpw-yolandatuin.onrender.com/frases](https://modulo-4-evaluacion-final-bpw-yolandatuin.onrender.com/frases)

---

## 🔐 Seguridad

* El proyecto utiliza **variables de entorno** para proteger credenciales y datos sensibles de conexión a base de datos.
* El repositorio no expone datos confidenciales ya que se ha utilizado gitignore. 

---

## 🔄 Relaciones y Consultas

* Se han utilizado **LEFT JOINs** para enriquecer los datos devueltos:

  * Al consultar un personaje (`/personajes/:id`), también se incluyen sus frases.
  * Al consultar una frase (`/frases/:id`), se incluye información del personaje y del capítulo asociado.

---

## 🌱 Próximos pasos

En el futuro, me gustaría desarrollar una **interfaz visual (Frontend)** conectada a esta API para que cualquier usuario pueda explorar de manera sencilla el contenido.

---

## 🛠️ Tecnologías utilizadas

* Node.js
* Express
* MySQL (Aiven)
* Render (deploy)
* Postman (para pruebas)
* Dotenv (para variables de entorno)