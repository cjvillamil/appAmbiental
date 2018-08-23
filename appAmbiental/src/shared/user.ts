//Lo ideal es que las interfaces se parezcan a los models que creamos
export interface Usuario{
    usuario: string;
    username: string;
    password: string;
    nombre: string;
    apellido?: string; //? se pone para los que no son obligatorios
    correo: string;
}