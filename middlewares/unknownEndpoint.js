// ruta desconocida responder con un 404
//todo: No se utiliza next para que terminen los middleware
export const unknowEndpoint = (req,res,next) => {
    
    res.status(404).json({
        error: 'unknow endpoint'
    })
}