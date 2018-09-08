export class User{
    constructor(
        public email: string = '',
        public username: string = '',
        public firstname: string = '',
        public lastname: string = '',
        public password: string = '',
        public password_confirmation: string = '',
        public photoSrc: string = 'assets/user-photo.jpg'
    ){}
}