function comprarClicado(event) {
    event.target.textContent = "Produto adicionado ao carrinho!";
}

function sendForm(event) {
    event.preventDefault();

    let vazio = false;
    form.querySelectorAll("input").forEach(i => {
        if (i.value.trim() === "") {
            vazio = true;
        }
    });

    if (vazio) {
        alert("Preencha todos os campos.");
    }

    if (!vazio){
        console.log("Formulário enviado");
    }
}

function searchedItem(event) {
    let inpt = search_box.value.toLowerCase();

    itens.forEach(item => {
        let name = item.querySelector(".item-name").textContent.toLowerCase();
        if (!name.includes(inpt)) {
            item.classList.add("hide");
        } else {
            item.classList.remove("hide");
        }
    });
}

let buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
   button.addEventListener("click", comprarClicado); 
});

let itens = document.querySelectorAll(".produto-card");
let search_box = document.querySelector("#search-box");
search_box.addEventListener("input", searchedItem)

let form = document.querySelector("#form-one");
form.addEventListener("submit", sendForm);