
//to show user feedbacks
export const setUpMessage = (message, type) => {
    const HTMLBody = document.querySelector("body");
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
  
    const messageTypeClass = `message__${type}`;
    messageContainer.classList.add(messageTypeClass);
  
    messageContainer.classList.add("message__appear");
    messageContainer.innerHTML = `
      <p class="message__text">${message}</p>
    `;
    HTMLBody.prepend(messageContainer);
  
    setTimeout(() => {
      messageContainer.classList.add("message__disappear");
    }, 4000);
  
    setTimeout(() => {
      messageContainer.remove();
    }, 4250);
  };