interface String {
    replaceAll(oldChar: string, newChar: string): string
}

String.prototype.replaceAll = function(oldChar: string, newChar: string): string {
    return this.replace(new RegExp(oldChar, 'g'), newChar)
}
