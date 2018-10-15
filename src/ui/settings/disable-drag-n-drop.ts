document.addEventListener('drop', (e) => {
    e.preventDefault()
    e.stopPropagation()
})
document.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer!.dropEffect = 'none'
})
