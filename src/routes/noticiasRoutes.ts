import { Router } from 'express'

import { noticiasController } from '../controllers/noticias-controllers'

import multer from '../libs/multer'

class NoticiasRoutes {
    public router: Router = Router();

    constructor(){
        this.config()
    }
    
    config(): void {
        this.router.get('/', noticiasController.list)
        this.router.get('/cuatro-noticias', noticiasController.listde4)
        this.router.get('/ultima-noticias', noticiasController.ultimaNoticia)
        this.router.get('/:id', noticiasController.getOne)
        this.router.post('/', multer.single('imagen'), noticiasController.create)
        this.router.delete('/:id', noticiasController.delete)
        this.router.put('/:id', multer.single('imagen'), noticiasController.update)
    }
}

const noticiasRoutes = new NoticiasRoutes()
export default noticiasRoutes.router;
