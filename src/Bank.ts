// DIO Banking

import { UserAccount } from "./UserAccount";

class Bank {
    accounts: UserAccount[];
    private nextAccountNumber: number;

    constructor() {
        this.accounts = [];
        this.nextAccountNumber = 1;
    }

    createAccount = (name: string): UserAccount => {
        const account = new UserAccount(name, this.nextAccountNumber++);
        this.accounts.push(account);
        return account;
    };

    findAccount = (accountNumber: number): UserAccount | undefined => {
        return this.accounts.find((account) => account.accountNumber === accountNumber);
    };

    listAccounts = () => {
        if (this.accounts.length === 0) {
            console.log("Nenhuma conta cadastrada.");
            return;
        }

        this.accounts.forEach((account) => console.log(`${account.accountNumber} - ${account.name}`));
    };
}

export { Bank };
