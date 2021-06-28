const copyCodeButton = document.querySelector("#copy-code")

copyCodeButton.addEventListener('click', () => {
    const roomCode = document.querySelector("#copy-code").dataset.id
    navigator.clipboard.writeText(roomCode)
})