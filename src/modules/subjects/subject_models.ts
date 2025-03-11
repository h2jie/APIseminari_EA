import mongoose, { Schema } from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    alumni: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export interface ISubject {
    name: string;
    teacher: string;
    alumni: mongoose.Types.ObjectId[];
}

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;