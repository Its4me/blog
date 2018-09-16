export class User{
   public  photoSrc = 'assets/user-photo.jpg';
    constructor(
        public email: string = '',
        public nickname: string = '',
        public name: string = '',
        public lastname: string = '',
        public password?: string,
        public password_confirmation?: string,
    
    ){
      
    }
}