import express from 'express'
import { addUser, eliminaUsuario, login, updateAfiliado, usuarioById } from '../controller/auth.controller';
import { validaUsuario } from '../middlewares/valida_usuario.middleware';
import { actualizaUsuario } from '../middlewares/actualiza_usuario.middleware';
import { verificarToken } from '../middlewares/verifica_token.middleware';

const router = express.Router()

router.post('/', validaUsuario, addUser)
router.post('/login', login)
router.get('/usuario', verificarToken, usuarioById);
router.patch('/actualiza', verificarToken,  actualizaUsuario, updateAfiliado)
router.delete('/elimina', verificarToken,  eliminaUsuario)

export default router;