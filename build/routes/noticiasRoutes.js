"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noticias_controllers_1 = require("../controllers/noticias-controllers");
const multer_1 = __importDefault(require("../libs/multer"));
class NoticiasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', noticias_controllers_1.noticiasController.list);
        this.router.get('/cuatro-noticias', noticias_controllers_1.noticiasController.listde4);
        this.router.get('/ultima-noticias', noticias_controllers_1.noticiasController.ultimaNoticia);
        this.router.get('/:id', noticias_controllers_1.noticiasController.getOne);
        this.router.post('/', multer_1.default.single('imagen'), noticias_controllers_1.noticiasController.create);
        this.router.delete('/:id', noticias_controllers_1.noticiasController.delete);
        this.router.put('/:id', multer_1.default.single('imagen'), noticias_controllers_1.noticiasController.update);
    }
}
const noticiasRoutes = new NoticiasRoutes();
exports.default = noticiasRoutes.router;
