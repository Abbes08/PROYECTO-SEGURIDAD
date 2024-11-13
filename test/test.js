var unalib = require('../unalib/index');
var assert = require('assert');


describe('unalib', function() {
    // Pruebas para la función is_valid_phone
    describe('función is_valid_phone', function() {
        it('debería devolver true para 8297-8547', function() {
            assert.equal(unalib.is_valid_phone('8297-8547'), true);
        });
    });

    // Pruebas para la validación de URLs de imágenes
    describe('función validateMessage - imágenes', function() {
        it('debería devolver un tag de <img> cuando se le pasa una URL de imagen', function() {
            var mensaje = JSON.stringify({ mensaje: "https://example.com/image.jpg" });
            var result = unalib.validateMessage(mensaje);
            var obj = JSON.parse(result);
            assert.equal(obj.mensaje.includes('<img src="https://example.com/image.jpg"'), true);
        });
    });

    // Pruebas para la validación de URLs de videos
    describe('función validateMessage - videos', function() {
        it('debería devolver un tag de <video> cuando se le pasa una URL de video', function() {
            var mensaje = JSON.stringify({ mensaje: "https://example.com/video.mp4" });
            var result = unalib.validateMessage(mensaje);
            var obj = JSON.parse(result);
            assert.equal(obj.mensaje.includes('<video'), true);
        });
    });

    // Pruebas para la prevención de inyección de scripts
    describe('función validateMessage - prevención de inyección de scripts', function() {
        it('debería prevenir inyecciones de scripts sanitizando el mensaje', function() {
            var mensaje = JSON.stringify({ mensaje: "<script>alert('XSS')</script>" });
            var result = unalib.validateMessage(mensaje);
            var obj = JSON.parse(result);
            assert.equal(obj.mensaje.includes("&lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;"), true);
        });
    });
});
