// script.js
    let step = 0;
    let userData = { nome: "" };

    function toggleChat() {
      let chat = document.getElementById("chatBox");
      chat.style.display = (chat.style.display === "flex") ? "none" : "flex";
    }

    // Enter envia mensagem
    document.getElementById("userInput").addEventListener("keydown", function(e){
      if(e.key === "Enter") sendMessage();
    });


    function sendMessage(customMessage = null) {
      let input = document.getElementById("userInput");
      let message = customMessage || input.value.trim();
      if (!message) return;


      addMessage(message, "user");
      input.value = "";

      switch(step) {
        case 0:
          userData.nome = message;
          setTimeout(() => {
          addMessage(`Prazer, ${userData.nome}! Qual o motivo do seu contato?`, "bot");
          showQuickReplies(["Dúvidas", "Agendamento de consulta", "Outros"]);
          }, 800);
          step++; break;

        case 1:
          userData.motivo = message;
          setTimeout(() => {
            addMessage("Anotado", "bot");
            addMessage("Estou redirecionando você para o WhatsApp", "bot");

            let numero = "554499029926";
            let texto = `*Pré-Atendimento*\n\nNome: ${userData.nome}\nEmail: ${userData.email}\nTelefone: ${userData.telefone}\nTipo: ${userData.tipo}\nDocumento: ${userData.documento}\nMotivo: ${userData.motivo}`;
            let url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
            window.open(url, "_blank");
          }, 800);
          step++; break;
      }
    }

    function addMessage(text, sender) {
      let chatBody = document.getElementById("chatBody");
      let msg = document.createElement("div");
      msg.classList.add("chat-message", sender);
      msg.innerText = text;
      chatBody.appendChild(msg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showQuickReplies(options) {
      let chatBody = document.getElementById("chatBody");
      let container = document.createElement("div");
      container.classList.add("quick-replies");

      options.forEach(option => {
        let btn = document.createElement("div");
        btn.classList.add("quick-reply");
        btn.innerText = option;
        btn.onclick = () => {
          container.remove();
          sendMessage(option);
        };
        container.appendChild(btn);
      });

      chatBody.appendChild(container);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
