const cookieValue = document.getElementById('cookieValue');
const saveButton = document.getElementById('saveButton');
const displayArea = document.getElementById('displayArea');
 
saveButton.addEventListener('click', () => {
  const valueToSave = cookieValue.value.trim();
  if (valueToSave) {
    document.cookie = 'user_input=' + encodeURIComponent(valueToSave);
    updateDisplay();
  }
});
 
function updateDisplay() {
  const savedValue = document.cookie;
  if (savedValue) {
    displayArea.textContent = `"${savedValue}"`;
  } else {
    displayArea.textContent = '（Cookie は空か、見つかりません）';
  }
}
 
document.addEventListener('DOMContentLoaded', updateDisplay);