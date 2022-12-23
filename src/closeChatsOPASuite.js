/**** Script todos os chats do OPA com uma mensagem de finalização
***** Utilizar alguma extensão para injeção de código JS no navegador, criar uma Bookmarklet ou colar no devtools console F12.
***** https://www.tampermonkey.net/ | https://en.wikipedia.org/wiki/Bookmarklet ****/

let message;
const selectMotivoCode = "5f68dc9283525d222d61b88c";

setInterval(() => {
    function Main() {
        //sendMessage(); //enviar mensagem de finalização *** em desenvolvimento ***
        selectNextClient(); //função para selecionar o próximo cliente. Bug encontrado - não é possível listar todos os clientes.
        changeToFinished(); //mudar os status da conversa para finalizado

        setTimeout(() => {
            endConversation();
        }, 800); //aguardar 800ms para encerrar conversa

    }

    function sendMessage() {
        if (!message) {
            message = window.prompt("Mensagem de finalização: ");
        }

        const textField = document.getElementById("input_envio_msg");
        textField.innerText = message;

        const keyboardEvent = new KeyboardEvent('keydown', {
            code: 'Enter',
            key: 'Enter',
            charCode: 13,
            keyCode: 13,
            view: window,
            bubbles: true
        });

        textField.dispatchEvent(keyboardEvent);
    }

    function selectNextClient() {
        document.querySelector("#container > div.list > div.list_dados > div:nth-child(2)").click();
    }

    function changeToFinished() {
        const selectMotivo = document.getElementById("select_motivos");
        selectMotivo.value = selectMotivoCode;
        selectMotivo.dispatchEvent(new Event('change'));
    }

    function endConversation() {
        document.querySelector("#container > div.dialog.chat > div.dialog_panel > div:nth-child(20) > button.blue.darken-1").click();

        setTimeout(() => {
            document.querySelector("body > div.jconfirm.jconfirm-light.jconfirm-open > div.jconfirm-scrollpane > div > div > div > div > div > div > div > div.jconfirm-buttons > button.btn.btn-blue").click()
        }, 500); //aguardar 500ms para fechar modal
    }

    Main();
}, 2000);