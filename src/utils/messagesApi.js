const domains = [
  "http://dev.kandrusyak.ru",
]
window.addEventListener("message", messageHandler, false);
function messageHandler(event) {
  if (!domains.includes(event.origin))
    return;
  const { action, key, value } = event.data
  if (action === 'save'){
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}