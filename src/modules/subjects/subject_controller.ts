import { Request, Response } from 'express';
import {
    createSubject,
    deleteSubject,
    getAllSubjects,
    getSubject,
    updateSubject,
    getSubjectStudents,
    getSubjectsByTeacher,
    getSubjectsByStudent,
    renameSubject,
    enrollStudent,
    dropSubject
} from './subject_service.js';

// Crear nueva asignatura
export const createSubjectHandler = async (req: Request, res: Response) => {
    try {
        const data = await createSubject(req.body);
        res.status(201).json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las asignaturas
export const getAllSubjectsHandler = async (req: Request, res: Response) => {
    try {
        const data = await getAllSubjects();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener asignatura por ID
export const getSubjectByIdHandler = async (req: Request, res: Response) => {
    try {
        const data = await getSubject(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar información de asignatura
export const updateSubjectHandler = async (req: Request, res: Response) => {
    try {
        const data = await updateSubject(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar asignatura
export const deleteSubjectHandler = async (req: Request, res: Response) => {
    try {
        const data = await deleteSubject(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        res.json({ message: 'Asignatura eliminada exitosamente' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener estudiantes de una asignatura
export const getSubjectStudentsHandler = async (req: Request, res: Response) => {
    try {
        const students = await getSubjectStudents(req.params.id);
        res.json(students);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener asignaturas por profesor
export const getSubjectsByTeacherHandler = async (req: Request, res: Response) => {
    try {
        const subjects = await getSubjectsByTeacher(req.params.teacher);
        res.json(subjects);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener asignaturas de un estudiante
export const getSubjectsByStudentHandler = async (req: Request, res: Response) => {
    try {
        const subjects = await getSubjectsByStudent(req.params.studentId);
        res.json(subjects);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Renombrar asignatura
export const renameSubjectHandler = async (req: Request, res: Response) => {
    try {
        const { newName } = req.body;
        if (!newName) {
            return res.status(400).json({ message: 'Se requiere un nuevo nombre' });
        }
        
        const data = await renameSubject(req.params.id, newName);
        if (!data) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Matricular estudiante en asignatura
export const enrollStudentHandler = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.body;
        if (!studentId) {
            return res.status(400).json({ message: 'Se requiere ID de estudiante' });
        }
        
        const data = await enrollStudent(req.params.id, studentId);
        if (!data) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Dar de baja a estudiante de asignatura
export const dropSubjectHandler = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.body;
        if (!studentId) {
            return res.status(400).json({ message: 'Se requiere ID de estudiante' });
        }
        
        const data = await dropSubject(req.params.id, studentId);
        if (!data) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};