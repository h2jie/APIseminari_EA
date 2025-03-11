import express from 'express';
import {
    createSubjectHandler,
    deleteSubjectHandler,
    getAllSubjectsHandler,
    getSubjectByIdHandler,
    updateSubjectHandler,
    getSubjectStudentsHandler,
    getSubjectsByTeacherHandler,
    getSubjectsByStudentHandler,
    renameSubjectHandler,
    enrollStudentHandler,
    dropSubjectHandler
} from './subject_controller.js';

const router = express.Router();

// IMPORTANTE: El orden de las rutas es crítico
// Las rutas más específicas deben ir primero

/**
 * @openapi
 * /api/subjects/teacher/{teacher}:
 *   get:
 *     summary: Obtiene asignaturas por profesor
 *     description: Retorna todas las asignaturas impartidas por un profesor específico.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: teacher
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/subjects/teacher/:teacher', getSubjectsByTeacherHandler);

/**
 * @openapi
 * /api/subjects/student/{studentId}:
 *   get:
 *     summary: Obtiene asignaturas por estudiante
 *     description: Retorna todas las asignaturas que está cursando un estudiante específico.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/subjects/student/:studentId', getSubjectsByStudentHandler);

// Rutas básicas CRUD

/**
 * @openapi
 * /api/subjects:
 *   post:
 *     summary: Crea una nueva asignatura
 *     description: Añade una nueva asignatura al sistema.
 *     tags:
 *       - Subjects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               teacher:
 *                 type: string
 *               alumni:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Asignatura creada exitosamente
 */
router.post('/subjects', createSubjectHandler);

/**
 * @openapi
 * /api/subjects:
 *   get:
 *     summary: Obtiene todas las asignaturas
 *     description: Retorna una lista de todas las asignaturas.
 *     tags:
 *       - Subjects
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   teacher:
 *                     type: string
 *                   alumni:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get('/subjects', getAllSubjectsHandler);

// Rutas con parámetros ID y sus operaciones específicas

/**
 * @openapi
 * /api/subjects/{id}/students:
 *   get:
 *     summary: Obtiene todos los estudiantes de una asignatura
 *     description: Retorna un array con todos los usuarios que están cursando la asignatura.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: Asignatura no encontrada
 */
router.get('/subjects/:id/students', getSubjectStudentsHandler);

/**
 * @openapi
 * /api/subjects/{id}/rename:
 *   put:
 *     summary: Renombra una asignatura
 *     description: Cambia el nombre de una asignatura existente.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Asignatura renombrada exitosamente
 *       404:
 *         description: Asignatura no encontrada
 */
router.put('/subjects/:id/rename', renameSubjectHandler);

/**
 * @openapi
 * /api/subjects/{id}/enroll:
 *   put:
 *     summary: Matricula un estudiante en una asignatura
 *     description: Añade un estudiante a la lista de alumnos de una asignatura.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estudiante matriculado exitosamente
 *       404:
 *         description: Asignatura no encontrada
 */
router.put('/subjects/:id/enroll', enrollStudentHandler);

/**
 * @openapi
 * /api/subjects/{id}/drop:
 *   put:
 *     summary: Da de baja a un estudiante de una asignatura
 *     description: Elimina a un estudiante de la lista de alumnos de una asignatura.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estudiante dado de baja exitosamente
 *       404:
 *         description: Asignatura no encontrada
 */
router.put('/subjects/:id/drop', dropSubjectHandler);

/**
 * @openapi
 * /api/subjects/{id}:
 *   get:
 *     summary: Obtiene una asignatura por ID
 *     description: Retorna los detalles de una asignatura específica.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: Asignatura no encontrada
 */
router.get('/subjects/:id', getSubjectByIdHandler);

/**
 * @openapi
 * /api/subjects/{id}:
 *   put:
 *     summary: Actualiza una asignatura por ID
 *     description: Modifica los detalles de una asignatura específica.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               teacher:
 *                 type: string
 *               alumni:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Asignatura actualizada exitosamente
 *       404:
 *         description: Asignatura no encontrada
 */
router.put('/subjects/:id', updateSubjectHandler);

/**
 * @openapi
 * /api/subjects/{id}:
 *   delete:
 *     summary: Elimina una asignatura por ID
 *     description: Elimina una asignatura específica del sistema.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Asignatura eliminada exitosamente
 *       404:
 *         description: Asignatura no encontrada
 */
router.delete('/subjects/:id', deleteSubjectHandler);

export default router;