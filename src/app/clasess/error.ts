export class myError {
    public showError: boolean = false;
    public text_error: string;
    private time: number = 4000;

    constructor(
       
    ){}

    public togle_error(text?: string){
        this.showError = true;

        this.text_error = text;
        
        setTimeout(()=>this.clear_error(),this.time);
    }
    private clear_error(){
        this.showError = false;
        this.text_error = '';
    }

}
