export class Post{
    public back_id: string;
    public id: string = '';
    public likes_count: number = 0;

    constructor(
        public photo_src?: string,
        public description?: string
    ){}
}  