export class Post{
    public id: string = '';
    public photo: File = null;
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
    public get_time(){
       
        
        let year = this.date.getFullYear();
        let month = this.date.getMonth()+1 > 9? this.date.getMonth()+1 : '0' + this.date.getMonth()+1; 
        let day = this.date.getDate() > 9? this.date.getDate() : '0' + this.date.getDate(); 
        let hours = this.date.getHours();
        let minutes = this.date.getMinutes();
        return `${day}.${month}.${year} в ${hours}:${minutes}`;
    }
}  