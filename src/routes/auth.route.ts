import express from 'express'
import { addUser, eliminaUsuario, login, updateAfiliado, usuarioById } from '../controller/auth.controller';
import { validaUsuario } from '../middlewares/valida_usuario.middleware';
import { actualizaUsuario } from '../middlewares/actualiza_usuario.middleware';
import { verificarToken } from '../middlewares/verifica_token.middleware';

const router = express.Router()


/**
 * @swagger
 * /api/v1/authRoutes:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Agrega un usuario a la base de datos después de validar su información.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Omar"
 *               apellido:
 *                 type: string
 *                 example: "Mendoza"
 *               telefono:
 *                  type: string
 *                  example: "925555555"
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: "omar@example.com"
 *               password:
 *                 type: string
 *                 example: "#Pruebas0009"
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error en la solicitud (datos inválidos)
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', validaUsuario, addUser)

/**
 * @swagger
 * /api/v1/authRoutes/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a un usuario autenticarse con su correo y contraseña.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - password
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: "omar1@hotmail.com"
 *               password:
 *                 type: string
 *                 example: "#Dominguez91"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: "Inicio de sesión éxitoso"
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 20
 *                     nombre:
 *                       type: string
 *                       example: "omar"
 *                     correo:
 *                       type: string
 *                       format: email
 *                       example: "omar1@hotmail.com"
 *                     telefono:
 *                       type: string
 *                       example: "256254125"
 *                     fecha_registro:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-16T05:12:48.213Z"
 *                     fecha_actualizacion:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-16T07:19:54.913Z"
 *                     activo:
 *                       type: boolean
 *                       example: true
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     sesiones:  
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 14
 *                           fecha_evento:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-02-16T05:12:48.247Z"
 *       400:
 *         description: Error en la solicitud (datos faltantes o credenciales incorrectas)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: "Usuario y contraseña son requeridos"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: "Algo salio mal, contacte al administrador"
 */
router.post('/login', login);

/**
 * @swagger
 * /api/v1/authRoutes/usuario:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Devuelve la información de un usuario a partir de su ID. Se requiere autenticación con token.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 19
 *         description: ID del usuario a consultar
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: "Usuario encontrado"
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 19
 *                     nombre:
 *                       type: string
 *                       example: "Omar"
 *                     apellido:
 *                       type: string
 *                       example: "Domínguez"
 *                     telefono:
 *                       type: string
 *                       example: "999999999"
 *                     correo:
 *                       type: string
 *                       format: email
 *                       example: "omar1@hotmail.com"
 *                     fecha_registro:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-16T05:12:48.213Z"
 *                     fecha_actualizacion:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-16T07:19:54.913Z"
 *                     activo:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: El ID del usuario es requerido o no es válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: "El ID del usuario es requerido"
 *       404:
 *         description: No se encontró un usuario con el ID especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontró un usuario con el ID especificado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: "Algo salió mal, contacte al administrador"
 */
router.get('/usuario', verificarToken, usuarioById);

/**
 * @swagger
 * /api/v1/authRoutes/actualiza:
 *   patch:
 *     summary: Actualizar información de un usuario
 *     description: Permite actualizar el nombre, apellido y teléfono de un usuario autenticado.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 20
 *                 description: ID del usuario a actualizar
 *               nombre:
 *                 type: string
 *                 example: "Omar"
 *               apellido:
 *                 type: string
 *                 example: "Domínguez"
 *               telefono:
 *                 type: string
 *                 example: "9999999999"
 *     responses:
 *       201:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: "Usuario actualizado correctamente"
 *       400:
 *         description: Datos inválidos o incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: "El ID del usuario es requerido"
 *       401:
 *         description: No autorizado, token faltante o inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: "Token inválido o expirado"
 *       404:
 *         description: No se encontró un usuario con el ID especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontró un usuario con el ID especificado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: "Algo salió mal, contacte al administrador"
 */
router.patch('/actualiza', verificarToken, actualizaUsuario, updateAfiliado);

/**
 * @swagger
 * api/v1/authRoutes/elimina:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario por ID.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del usuario a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Usuario eliminado correctamente
 *       400:
 *         description: El ID del usuario es requerido o inválido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

router.delete('/elimina', verificarToken,  eliminaUsuario)

export default router;