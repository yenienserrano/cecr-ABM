import { Request, Response } from 'express'

import fs from 'fs-extra'

import pool from '../database'
import path from 'path'

class NoticiasController {

    public async list(req: Request, res: Response) {
        const noticias = await pool.query("SELECT id, titulo, descripcion, imagen, DATE_FORMAT(created_at,'%d de %M de %Y') as fecha FROM noticias ORDER BY id DESC")
        return res.status(200).send(noticias)
    }

    public async listde4(req: Request, res: Response) {
        const noticias = await pool.query("SELECT id, titulo, descripcion, imagen, DATE_FORMAT(created_at,'%d de %M de %Y') as fecha FROM noticias ORDER BY id DESC LIMIT 4")
        return res.status(200).send(noticias)
    }

    public async ultimaNoticia(req: Request, res: Response) {
        const noticias = await pool.query("SELECT id, titulo, descripcion, imagen, DATE_FORMAT(created_at,'%d de %M de %Y') as fecha FROM noticias ORDER BY id DESC LIMIT 1")
        return res.status(200).send(noticias)
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        const noticias = await pool.query("SELECT id, titulo, descripcion, imagen, DATE_FORMAT(created_at,'%d de %M de %Y') as fecha FROM noticias WHERE id = ?", [id])
        if (noticias.length > 0) return res.status(200).send(noticias)
        res.status(404).send({
            message: "La noticia no existe"
        })
    }

    public async create(req: Request, res: Response): Promise<any> {
        const { titulo, descripcion } = req.body        
        const nuevaNoticia = {
            titulo: titulo,
            descripcion: descripcion,
            imagen: req.file.path,
        }
        const result = await pool.query('INSERT INTO noticias set ?', [nuevaNoticia]);


        return res.status(200).send({
            message: 'Noticias guardadas',
            nuevaNoticia
        });
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        const photo = await pool.query('DELETE FROM noticias WHERE id = ?', [id])
        if (photo) {
            await fs.unlink(path.resolve(photo.imagePath))
        }

        return res.status(200).send({
            message: "La noticia fue eliminada"
        })
    }

    public async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        const { titulo, descripcion } = req.body    
        const nuevaNoticia = {
            titulo: titulo,
            descripcion: descripcion,
            imagen: req.file.path
        }
        
        await pool.query('UPDATE noticias set ? WHERE id = ?', [nuevaNoticia, JSON.parse(id)])

        return res.status(200).send({
            message: "La noticia fue modificada" + JSON.stringify(nuevaNoticia),
        })
    }
}

export const noticiasController = new NoticiasController()