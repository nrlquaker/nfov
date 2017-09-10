export function setTitle(title: string): void {
    document.title = title
}

export function setText(text: string): void {
    const container = document.getElementById('app-container')
    container!.innerHTML = text
}
