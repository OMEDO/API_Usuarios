import express from 'express'
import { addUser, eliminaUsuario, login, updateAfiliado, usuarioById } from '../controller/auth.controller';
import { validaUsuario } from '../middlewares/valida_usuario.middleware';
import { actualizaUsuario } from '../middlewares/actualiza_usuario.middleware';

const router = express.Router()

router.post('/', validaUsuario, addUser)
router.post('/login', login)
router.get('/usuario', usuarioById);
router.patch('/actualiza', actualizaUsuario, updateAfiliado)
router.delete('/elimina', eliminaUsuario)

export default router;