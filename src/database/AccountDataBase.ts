import { BaseDataBase } from "./BaseDataBase";
import { TAccountDB } from "../types";

export class AccountDataBase extends BaseDataBase {
  public static TABLE_ACCOUNTS = "accounts";

  public async findAccounts(): Promise<TAccountDB[]> {
    const accountsDB: TAccountDB[] = await AccountDataBase.conection(
      AccountDataBase.TABLE_ACCOUNTS
    );

    return accountsDB;
  }

  public async findAccountById(
    id: string | undefined
  ): Promise<TAccountDB | undefined> {
    const [accountDB]: TAccountDB[] | undefined[] =
      await AccountDataBase.conection(AccountDataBase.TABLE_ACCOUNTS).where({
        id,
      });
    return accountDB;
  }

  public async insertAccount(newAccountDB: TAccountDB): Promise<void> {
    await AccountDataBase.conection(AccountDataBase.TABLE_ACCOUNTS).insert(
      newAccountDB
    );
  }

  public async updateAccountBalance(
    newBalance: number,
    id: string
  ): Promise<void> {
    await AccountDataBase.conection(AccountDataBase.TABLE_ACCOUNTS)
      .update({ balance: newBalance })
      .where({ id });
  }
}
