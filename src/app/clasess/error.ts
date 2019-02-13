export class myError {
    public showError: boolean = false;
    public textError: string;
    private time: number = 4000;

    constructor(
       
    ){}

    public togleError(text?: string){
        this.showError = true;

        this.textError = text;
        
        setTimeout(()=>this.clearError(),this.time);
    }
    private clearError(){
        this.showError = false;
        this.textError = '';
    }

}
