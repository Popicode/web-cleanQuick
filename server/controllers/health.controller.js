export function healthCheck(req, res) {
    res.status(200).json({
        status: 'ok',
        service: 'cleanquick-api',
        timestamp: new Date().toISOString()
    });
}

// end point de prueba que responde al navegador