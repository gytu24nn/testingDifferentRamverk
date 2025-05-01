export interface Post {
    id?: number;
    title: string;
    content: string;
    authorUsername: string;
    createdAt?: Date;
    updatedAt?: Date;
}
