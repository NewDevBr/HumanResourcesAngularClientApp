export interface Candidate {
    access_token : string,
    token_type: string,
    data: {
        id: number,
        birthDate: Date,
        created_at: Date,
        deleted_at?: Date,
        email: string,
        email_verified_at?: Date,
        github: string,
        linkedin: string,
        name: string,
        notify_email: boolean,
        pathPhoto: string,
        titration: string,
        updated_at: Date
    }
}