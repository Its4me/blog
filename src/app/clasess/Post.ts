export class Post{
    public id: string = '';
    public date: any;

    constructor(
        public photo_src?: string,
        public description?: string,
        public back_id?: string,
        public owner_id?: string,
        public likes_count?: number
    ){}
}  