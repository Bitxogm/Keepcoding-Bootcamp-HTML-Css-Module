import path from 'path';

export function getDemo(req, res, next) {
    //res.status(200).send({ foo: 'bar', }); // Envia Content-Type: application/json
        // res.status(200).send(new Buffer('Wooop')); // Envia Content-Type: application/octet-stream
        res.status(200).send('<p>Hola</p>') // Envia Content-Type: text/html;
}

export function getDownload(req, res, next) {
    res.status(200).download('../doc/BackendJS.pdf', 'backend.pdf');
}

export function getFile(req, res, next) {
    const dirname = import.meta.dirname; // en CommonJS es __dirname;
    // const filePath = import.meta.dirname + '../../doc/BackendJS.pdf'; No solemos hacer este tipo de joins para rutas.
    const filePath = path.join(import.meta.dirname, '../../doc/BackendJS.pdf');
    console.log(filePath);
    res.status(200).sendFile(filePath);
}

export function getRedirect(req, res, next) {
    res.redirect('/api/health');
}

export function getEnd(req, res, next) {
    res.end();
}

export function getOneParam(req, res, next) {
    const id = req.params.id;
    console.log(id);
    res.status(200).json({ id })
}

export function getOneParamOptional(req, res, next) {
    const id = req.params.id;
    console.log('params', id);
    res.status(200).json({
        status: 200,
        params: req.params.id || null,
    })
}

export function getTwoParams(req, res, next) {
    console.table(req.params);
    res.status(200).json(req.params);
}