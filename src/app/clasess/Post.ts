export class Post{
    public id: string = '';
    public likes_count: number = 0;

    constructor(
        public photo_src?: string,
        public description?: string
    ){}
}  