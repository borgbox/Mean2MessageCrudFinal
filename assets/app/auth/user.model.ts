export class User {
    /* Adicionando-se a palavra public ou private
       não é necessário nem declarar os atributos
       e nem seta-los no construtor. O símbolo ?
       serve pra indicar que o parametro é opcional
    */
    constructor(public email: string,
        public password: string,
        public firstName?: string,
        public lastName?: string) {
    }
}