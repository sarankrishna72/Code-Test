export class ToastModel {
    type : string = 'success';
    position ?: string = 'top-right';
    load : boolean = false;
    context ?: any;
    delay?: number = 0;
    pause?: number = 2;
}
