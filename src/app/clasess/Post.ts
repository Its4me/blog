export class Post{
    public id: string = '';
    public photo: File = null;

    public activeLike: boolean = false;
    public owner_photo: string = '';
    public owner_nick: string = '';
    constructor(
        public photo_src?: string,
        public description?: string,
        public back_id?: string,
        public owner_id?: string,
        public date?: Date,
        public likes_count?: number
    ){
        this.date = new Date(date);
    }
}  