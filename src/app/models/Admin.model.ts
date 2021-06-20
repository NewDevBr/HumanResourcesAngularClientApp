export interface Admin {
    access_token : string;
    data: {
        name: string;
        email: string;
        post: string;
        created_by_admin: number;
        pathPhoto: string;
        updated_at: Date;
        created_at: Date;
        deleted_at?: Date;
        id: number;
    }
}