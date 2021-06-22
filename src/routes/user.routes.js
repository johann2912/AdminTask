import route from "color-convert/route";
import { Router } from "express";
const router = Router();

import * as userController from '../controllers/user.controller'

// crear
router.post('/', userController.getUser)

// Listar todos los usuarios
router.get('/', userController.getUsers)

// Buscar usuario por Id
router.get('/:userId', userController.getUserById)

// editar usuario
router.put('/:userId', userController.updateUserById)

// Elminar usuario
router.delete('/:userId', userController.deleteUserById)


export default router;