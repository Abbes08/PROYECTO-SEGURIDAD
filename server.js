"use strict";

const express = require("express");
const session = require("express-session");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const cons = require('consolidate');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

// Inicialización de Express y HTTP
let app = express();
let server = http.createServer(app);
let io = socketIo(server);

// Globals
const OKTA_ISSUER_URI = "https://dev-67q2y0z3suia5ae2.us.auth0.com";
const OKTA_CLIENT_ID = "mlIokKRjb5CGf8FbKpDIOKE36e7BjDLA";
const OKTA_CLIENT_SECRET = "5X_6rDr0vK5AnFMe058_ds7wP4MAvf8uB4rXkJpkIaHKpvssw69sUGcp6nABl1F0";
const REDIRECT_URI = "http://localhost:3000/dashboard";
const PORT = process.env.PORT || "3000";
const SECRET = "hjsadfghjakshdfg87sd8f76s8d7f68s7f632342ug44gg423636346f"; // Dejar el secret así como está.

// Configuración de auth
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: SECRET,
  baseURL: 'http://localhost:3000',
  clientID: '1UkFzHb1LSjfJYHuEBAA61lBbXGZJ6p1',
  issuerBaseURL: 'https://dev-67q2y0z3suia5ae2.us.auth0.com',
};

let oidc = new ExpressOIDC({ // eslint-disable-line no-unused-vars
  issuer: OKTA_ISSUER_URI,
  client_id: OKTA_CLIENT_ID,
  client_secret: OKTA_CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  scope: 'openid profile',
  routes: {
    callback: {
      path: '/callback',
      defaultRedirect: "/dashboard"
    }
  },
  appBaseUrl: 'http://localhost:3000'
});
// Usa oidc.router para manejar las rutas de autenticación
app.use(oidc.router);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// MVC View Setup
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('models', path.join(__dirname, 'models'));
app.set('view engine', 'html');

// App middleware
app.use("/static", express.static("static"));

app.use(session({
  cookie: { httpOnly: true },
  secret: SECRET,
  resave: false,
  saveUninitialized: false
}));

// App routes
app.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    res.render("index");
  }
});

// Ruta inicial: página de login
app.get("/",  (req, res) => {
  res.render("index");  
});

app.get("/dashboard", requiresAuth(), (req, res) => {  
  var payload = Buffer.from(req.appSession.id_token.split('.')[1], 'base64').toString('utf-8');
  const userInfo = JSON.parse(payload);
  res.render("dashboard", { user: userInfo });
});

// Ruta protegida para acceder al chat
app.get('/dashboard', requiresAuth(), (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

// Socket.IO chat functionality
io.on('connection', function(socket){
  console.log('A user connected');
  socket.on('Evento-Mensaje-Server', function(msg){
    io.emit('Evento-Mensaje-Server', msg);
  });
  socket.on('disconnect', function(){
    console.log('User disconnected');
  });
});

// Middleware para manejar los errores
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
