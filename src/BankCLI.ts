// DIO Banking

import readline from "node:readline/promises";
import { Bank } from "./Bank";
import { UserAccount } from "./UserAccount";

const MENU = `
=== DIO Banking ===
1 - Criar conta
2 - Depositar
3 - Sacar
4 - Transferir
5 - Ver saldo
6 - Ver extrato
7 - Listar contas
0 - Sair
Escolha uma opcao: `;

class BankCLI {
    private bank: Bank;
    private rl: readline.Interface;

    constructor() {
        this.bank = new Bank();
        this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    }

    run = async () => {
        let running = true;

        while (running) {
            const option = await this.rl.question(MENU);
            running = await this.handleOption(option.trim());
        }

        console.log("Ate logo!");
        this.rl.close();
    };

    private handleOption = async (option: string): Promise<boolean> => {
        switch (option) {
            case "1":
                await this.createAccount();
                break;
            case "2":
                await this.deposit();
                break;
            case "3":
                await this.withdraw();
                break;
            case "4":
                await this.transfer();
                break;
            case "5":
                await this.checkBalance();
                break;
            case "6":
                await this.showStatement();
                break;
            case "7":
                this.bank.listAccounts();
                break;
            case "0":
                return false;
            default:
                console.log("Opcao invalida.");
        }

        return true;
    };

    private chooseAccount = async (prompt: string): Promise<UserAccount | undefined> => {
        if (this.bank.accounts.length === 0) {
            console.log("Nenhuma conta cadastrada. Crie uma conta primeiro.");
            return undefined;
        }

        this.bank.listAccounts();
        const answer = await this.rl.question(prompt);
        const account = this.bank.findAccount(Number(answer));

        if (!account) {
            console.log("Conta nao encontrada.");
        }

        return account;
    };

    private createAccount = async () => {
        const name = await this.rl.question("Nome do titular: ");
        const account = this.bank.createAccount(name);
        console.log(`Conta criada! Numero: ${account.accountNumber}`);
    };

    private deposit = async () => {
        const account = await this.chooseAccount("Numero da conta para deposito: ");
        if (!account) return;

        const value = Number(await this.rl.question("Valor do deposito: "));
        account.deposit(value);
    };

    private withdraw = async () => {
        const account = await this.chooseAccount("Numero da conta para saque: ");
        if (!account) return;

        const value = Number(await this.rl.question("Valor do saque: "));
        account.withdraw(value);
    };

    private transfer = async () => {
        const origin = await this.chooseAccount("Numero da conta de origem: ");
        if (!origin) return;

        const destination = await this.chooseAccount("Numero da conta de destino: ");
        if (!destination) return;

        const value = Number(await this.rl.question("Valor da transferencia: "));
        origin.transfer(value, destination);
    };

    private checkBalance = async () => {
        const account = await this.chooseAccount("Numero da conta: ");
        account?.checkBalance();
    };

    private showStatement = async () => {
        const account = await this.chooseAccount("Numero da conta: ");
        account?.showStatement();
    };
}

export { BankCLI };
