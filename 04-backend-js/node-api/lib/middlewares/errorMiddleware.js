export function serverErrorHandler(error, req, res, next) {
    console.error("[ERROR]", error.message);
    console.error(error.stack);
    if (req.headers['accept'] && req.headers['accept'].includes('text/html')) {
        res.status(500).render(
            'error.html',
            {
                title: 'Internal Server Error',
                message: 'Ha ocurrido un error inesperado :( intentalo de nuevo más tarde.'
            }
        );
    } else {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export function notFoundErrorHandler(req, res, next) {
    if (req.headers['accept'] && req.headers['accept'].includes('text/html')) {
        res.status(404).render(
            'error.html',
            {
                title: 'Resource Not Found',
                message: 'La ruta solicitada no se encuentra.'
            }
        );
    } else {
        res.status(404).json({ error: 'Resource not found' });
    }
    
}