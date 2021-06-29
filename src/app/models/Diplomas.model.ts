export interface Diploma{
    id?: number,
    course: string,
    institution: string,
    initial_date : Date,
    final_date: Date,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date
}