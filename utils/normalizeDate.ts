declare global {
    interface String {
        normalizeDate(): string
    }
}

String.prototype.normalizeDate = function (this: string): string {
    const raw = this;
    const date = new Date(raw);
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const formatted = `${days[date.getDay()]}, ${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return formatted;
} 

export {}