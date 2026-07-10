// DIO Banking

type TransactionType = "deposito" | "saque" | "transferencia enviada" | "transferencia recebida";

interface Transaction {
    type: TransactionType;
    value: number;
    date: Date;
}

class UserAccount {
    name: string;
    accountNumber: number;
    balance: number;
    history: Transaction[];

    constructor(name: string, accountNumber: number) {
        this.name = name;
        this.accountNumber = accountNumber;
        this.balance = 0;
        this.history = [];
    }

    deposit = (value: number) => {
        if (value <= 0) {
            console.log("O valor do deposito deve ser maior que zero.");
            return;
        }

        this.balance += value;
        this.registerTransaction("deposito", value);
        console.log(`Deposito de R$${value.toFixed(2)} realizado com sucesso!`);
    };

    withdraw = (value: number) => {
        if (value <= 0) {
            console.log("O valor do saque deve ser maior que zero.");
            return;
        }

        if (value > this.balance) {
            console.log("Saldo insuficiente para realizar o saque.");
            return;
        }

        this.balance -= value;
        this.registerTransaction("saque", value);
        console.log(`Saque de R$${value.toFixed(2)} realizado com sucesso!`);
    };

    transfer = (value: number, destination: UserAccount) => {
        if (value <= 0) {
            console.log("O valor da transferencia deve ser maior que zero.");
            return;
        }

        if (value > this.balance) {
            console.log("Saldo insuficiente para realizar a transferencia.");
            return;
        }

        this.balance -= value;
        destination.balance += value;
        this.registerTransaction("transferencia enviada", value);
        destination.registerTransaction("transferencia recebida", value);
        console.log(`Transferencia de R$${value.toFixed(2)} para ${destination.name} realizada com sucesso!`);
    };

    checkBalance = () => {
        console.log(`Saldo atual de ${this.name}: R$${this.balance.toFixed(2)}`);
    };

    showStatement = () => {
        if (this.history.length === 0) {
            console.log("Nenhuma movimentacao registrada.");
            return;
        }

        console.log(`Extrato de ${this.name}:`);
        this.history.forEach((transaction) => {
            console.log(
                `- ${transaction.date.toLocaleString()} | ${transaction.type} | R$${transaction.value.toFixed(2)}`
            );
        });
    };

    private registerTransaction = (type: TransactionType, value: number) => {
        this.history.push({ type, value, date: new Date() });
    };
}

export { UserAccount };
