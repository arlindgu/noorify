declare global {
    interface String {
        exportHours(): string;
    }
}

String.prototype.exportHours = function (this: string): string {
    const date = new Date(this);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export {};
