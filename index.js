const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// Inicializa la aplicación Express
dotenv.config();
const app = express();
app.use(cors())
// Inicializa Firebase


admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
  }),
  databaseURL: "https://formulariocliente-2947d-default-rtdb.firebaseio.com/"
});

// Crea una ruta GET
app.get('/api/data', (req, res) => {
  // Obtiene una referencia a tu base de datos
  var db = admin.database();
  var ref = db.ref("/");

  // Obtiene los datos de la base de datos
  ref.once("value", function(snapshot) {
    // Envía los datos como respuesta
    res.json(snapshot.val());
  });
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});