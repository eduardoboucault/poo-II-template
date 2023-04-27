import { BaseDataBase } from "./BaseDataBase";
import { TUserDB } from "../types";

//* ATRIBUIR RESPONSABILIDADES PARA CADA ENTIDADE;

//* PARA CADA ENTIDADE DO BANCO DE DADOS TEMOS QUE REFERENCIAR UM ARQUIVO QUE CONECTA AS INFORMAÇÕES DA CLASSE PAI QUE RECEBE TODAS AS INFORMAÇÕES DO BANCO;

export class UserDataBase extends BaseDataBase {
  public static TABLE_USERS = "users";

  //* PARA CADA MÉTODO CRIADO QUE FAZ A LÓGICA DE BUSCA DAS INFORMAÇÕES DO BANCO DE DADOS É NECESSÁRIO TIPAR O PARÂMETRO RECEBEDIDO E O RETORNO DENTRO DE UMA PROMISSE;

  public async findUsers(q: string): Promise<TUserDB[]> {
    let usersDB;

    if (q) {
      const result: TUserDB[] = await UserDataBase.conection(
        UserDataBase.TABLE_USERS
      ).where("name", "LIKE", `%${q}%`);

      usersDB = result;
    } else {
      const result: TUserDB[] = await UserDataBase.conection(
        UserDataBase.TABLE_USERS
      );
      usersDB = result;
    }

    return usersDB;
  }

  public async findUserById(
    id: string | undefined
  ): Promise<TUserDB | undefined> {
    const [userDBExists]: TUserDB[] | undefined[] =
      await UserDataBase.conection("users").where({
        id,
      });
    return userDBExists;
  }

  //* MÉTODO QUE NÃO TEM NECESSIDADE DE UM RETORNO, ENTÃO ELA É UMA PROMISE VOID

  public async insertUser(newUserDB: TUserDB): Promise<void> {
    await UserDataBase.conection(UserDataBase.TABLE_USERS).insert(newUserDB);
  }
}
