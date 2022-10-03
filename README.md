# Restify-POF
Repositorio creado para guardar el codigo relacionado al POF de la materia TTADS - 2022 - UTN FRRO.


Why we should use Restify for the backend?

- Ver como responde frente a 1000 requests del mismo cliente.

    * Restify is a winner here for easier service deployments. Especially if you’re building a service that receives lots of requests from the same clients and want to move quickly.
    
Sources: 
    - Raygun.io
    - https://www.fastify.io/benchmarks/


Defs:
    - REST web services in Node JS.
    - Simple Node backEnd Framework.

Charcacteristics:
    - Map an application's architecture, monitor end-user xp and catch anomalies and performance problems via its built-in DTrace probes.
    - Manages such difficult tasks as versioning, error handling, and content negotiation.

Support:
    - MySQL and NoSQL datastore support, router introspection and robust client-side API for failed connections.




// Ver posibles ventajas de esto
Dtrace:
    - Points -> Probes -> Save and get info about a kernel or user process.
    - Probes -> Specific behavior -> Activated (firing) -> Trigger an action like save a timestamp or a function argument.

* Restify tiene una feature que permite automaticamente crear DTrace probes para cualquier ruta o handler que crees.
    var server = restify.createServer({
        name: 'helloworld',
        dtrace: true
    });
* Donde con el comando dtrace -l -p restify, se generara un listado con:
    - Modulos,provider y funcion de donde se disparo la probe.

Source: 
    - http://restify.com/docs/dtrace/
    - https://docs.oracle.com/cd/E19253-01/819-5488/gbwaz/index.html#:~:text=A%20DTrace%20user%20can%20use,into%20an%20arbitrary%20kernel%20function.
    - https://stackoverflow.com/questions/23017744/what-dtrace-script-output-means


Content negotiation:
    - Es como el cliente y el servidor establecen el formate que van a usar para intercambiar mensajes.
    - Especificar diferentes formatos segun el uso.
    - Restify:
        - Utilizara el res.contentType si estan presentes.
        - Caso que lo devuelto sea el body de un obj y no una Buffer instace content-type = app/json.
        - En caso contrario se negocia el content-type matcheandolo con los formatos permitidos con el header en accept (Sino restify responde con error content-type = app/octet-stream ).
        - El comportamiento por defecto puede cambiarse: 
                var server = restify.createServer({
                    formatters: {
                        ['application/foo'](req, res, body) {
                        if (body instanceof Error)
                            return body.stack;
                        if (Buffer.isBuffer(body))
                            return body.toString('base64');
                        return util.inspect(body);
                        }
                    }
                });
    -Sources: https://thewebdev.info/2020/08/17/restify%E2%80%8A-%E2%80%8Acontent-negotiation-and-errors/


Error handling:
    - Formatting Errors -> Es posible con restify formatear un error dado como parametro en la funcion next(err).