import mongoose from 'mongoose';
import Subject, { ISubject } from './subject_models.js';
import { IUser } from '../users/user_models.js';

// CRUD - Crear
export async function createSubject(subject: Partial<ISubject>): Promise<ISubject> {
    const subjectModel = new Subject(subject);
    return subjectModel.save();
}

// CRUD - Consultar una asignatura (y rellenar datos de estudiantes)
export async function getSubject(subjectId: string): Promise<ISubject | null> {
    return Subject.findById(subjectId).populate<{students: IUser[]}>({
        path: 'alumni',
        model: 'User'
    }).exec();
}

// CRUD - Consultar todas las asignaturas (y rellenar datos de estudiantes)
export async function getAllSubjects(): Promise<ISubject[]> {
    return Subject.find().populate<{students: IUser[]}>({
        path: 'alumni',
        model: 'User'
    }).exec();
}

// Consultar asignaturas por profesor
export async function getSubjectsByTeacher(teacher: string): Promise<ISubject[]> {
    return Subject.find({teacher: teacher});
}

// Consultar todas las asignaturas de un estudiante
export async function getSubjectsByStudent(studentId: string): Promise<ISubject[]> {
    return Subject.find({alumni: {$all: [studentId]}});
}

// CRUD - Renombrar asignatura
export async function renameSubject(subjectId: string, newName: string): Promise<ISubject | null> {
    return Subject.findByIdAndUpdate(
        subjectId, 
        {name: newName}, 
        {new: true}
    );
}

// Matricular estudiante en asignatura
export async function enrollStudent(subjectId: string, studentId: string): Promise<ISubject[] | null> {
    return Subject.findByIdAndUpdate(
        subjectId,
        {$addToSet: {alumni: studentId}},
        {new: true}
    );
}

// Dar de baja a estudiante de asignatura
export async function dropSubject(subjectId: string, studentId: string): Promise<ISubject[] | null> {
    return Subject.findByIdAndUpdate(
        subjectId,
        {$pull: {alumni: studentId}},
        {new: true}
    );
}

// CRUD - Eliminar asignatura
export async function deleteSubject(subjectId: string): Promise<ISubject | null> {
    return Subject.findByIdAndDelete(subjectId);
}

// API especial: Obtener todos los estudiantes de una asignatura
export async function getSubjectStudents(subjectId: string): Promise<IUser[]> {
    const subject = await Subject.findById(subjectId).populate<{alumni: IUser[]}>('alumni');
    if (!subject) {
        throw new Error('Asignatura no encontrada');
    }
    return subject.alumni;
}

// Actualizar información de asignatura
export async function updateSubject(subjectId: string, updateData: Partial<ISubject>): Promise<ISubject | null> {
    return Subject.findByIdAndUpdate(
        subjectId,
        updateData,
        {new: true}
    );
}