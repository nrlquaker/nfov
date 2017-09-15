const container = document.getElementById('app-container')

export function setTitle(title: string): void {
    document.title = title
}

export function setText(text: string): void {
    container!.innerHTML = text
}
