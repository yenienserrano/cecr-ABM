"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticiasController = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const database_1 = __importDefault(require("../database"));
const path_1 = __importDefault(require("path"));
class NoticiasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const noticias = yield database_1.default.query("SELECT id, titulo, descripcion, imagen, DATE_FORMAT(created_at,'%d de %M de %Y') as fecha FROM noticias ORDER BY id DESC");
            return res.status(200).send(noticias);
        });
    }
    listde4(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const noticias = yield database_1.default.query("SELECT id, titulo, descripcion, imagen, DATE_FORMAT(created_at,'%d de %M de %Y') as fecha FROM noticias ORDER BY id DESC LIMIT 4");
            return res.status(200).send(noticias);
        });
    }
    ultimaNoticia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const noticias = yield database_1.default.query("SELECT id, titulo, descripcion, imagen, DATE_FORMAT(created_at,'%d de %M de %Y') as fecha FROM noticias ORDER BY id DESC LIMIT 1");
            return res.status(200).send(noticias);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const noticias = yield database_1.default.query("SELECT id, titulo, descripcion, imagen, DATE_FORMAT(created_at,'%d de %M de %Y') as fecha FROM noticias WHERE id = ?", [id]);
            if (noticias.length > 0)
                return res.status(200).send(noticias);
            res.status(404).send({
                message: "La noticia no existe"
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { titulo, descripcion } = req.body;
            const nuevaNoticia = {
                titulo: titulo,
                descripcion: descripcion,
                imagen: req.file.path,
            };
            const result = yield database_1.default.query('INSERT INTO noticias set ?', [nuevaNoticia]);
            return res.status(200).send({
                message: 'Noticias guardadas',
                nuevaNoticia
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const photo = yield database_1.default.query('DELETE FROM noticias WHERE id = ?', [id]);
            if (photo) {
                yield fs_extra_1.default.unlink(path_1.default.resolve(photo.imagePath));
            }
            return res.status(200).send({
                message: "La noticia fue eliminada"
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { titulo, descripcion } = req.body;
            const nuevaNoticia = {
                titulo: titulo,
                descripcion: descripcion,
                imagen: req.file.path
            };
            yield database_1.default.query('UPDATE noticias set ? WHERE id = ?', [nuevaNoticia, JSON.parse(id)]);
            return res.status(200).send({
                message: "La noticia fue modificada" + JSON.stringify(nuevaNoticia),
            });
        });
    }
}
exports.noticiasController = new NoticiasController();
