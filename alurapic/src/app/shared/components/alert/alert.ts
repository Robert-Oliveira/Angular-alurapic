export class Alert {
  constructor(
    //readonly: classe pública, porém somente leitura para que não tenhamos que escrever métodos acessadores caso fossem privadas
    public readonly alertType: AlertType,
    public readonly _message: string
  ) {}
}

export enum AlertType {
  SUCESS,
  WARNING,
  DANGER,
  INFO,
}
