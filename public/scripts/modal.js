const modalTitleEl = document.querySelector("#modal-title")
const modalDescEl = document.querySelector("#modal-desc")
const modalActionEl = document.querySelector("#modal-action")

const checkButton = document.querySelectorAll(".check-question")
const deleteButton = document.querySelectorAll(".delete-question")

const modal = document.querySelector(".modal-overlay")
const modalClose = document.querySelector(".modal-cancel")
const modalAction = document.querySelector("#modal-action")

/* Alterações possíveis nos elementos do modal */ 

const ModalSettings = {
  check: {
    modalTitle: "Marcar como lida",
    modalDesc: "Tem certeza de que você quer marcar essa pergunta como lida?",
    modalAction: "Marcar como lida"
  },
  delete: {
    modalTitle: "Excluir",
    modalDesc: "Tem certeza de que você quer excluir essa pergunta?",
    modalAction: "Excluir"
  }
}

/* Função para lidar com o click no botão */

function handleClick(event, option) {
  event.preventDefault()

  const roomId = document.querySelector("#copy-code").dataset.id
  const slug = option === 'check' ? 'check' : 'delete'
  const questionId = event.target.dataset.id

  const form = document.querySelector(".modal form")
  form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

  modalTitleEl.innerHTML = ModalSettings[option].modalTitle
  modalDescEl.innerHTML = ModalSettings[option].modalDesc
  modalActionEl.innerHTML = ModalSettings[option].modalAction

  modal.classList.add("active")
  modal.classList.remove("hidden")
}

/* Função para fechar o modal */

function closeModal() {
  modal.classList.remove("active")
  modal.classList.add("hidden")
}

/* Função para fechar o modal */

modalClose.addEventListener('click', () => {
  closeModal()
  document.body.classList.remove("hidden")
})

/* Chamar handleClick com a option check */

checkButton.forEach(button => {
  button.addEventListener('click', () => {
    modalAction.classList.replace("red", "blue")
    document.body.classList.add("hidden")
    
    handleClick(event, 'check')
  })
})

/* Chamar handleClick com a option delete */

deleteButton.forEach(button => {
  button.addEventListener('click', () => {
    modalAction.classList.replace("blue", "red")
    document.body.classList.add("hidden")
    
    handleClick(event, 'delete')
  })

})

