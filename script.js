function resetErrorStyles() {
    const inputs = document.querySelectorAll('.calculator input');
    const errorSpans = document.querySelectorAll('.error');
  
    inputs.forEach((input) => {
      input.classList.remove('error');
      const errorSpan = input.nextElementSibling;
      if (errorSpan && errorSpan.classList.contains('error-message')) {
        errorSpan.innerText = '';
        errorSpan.style.display = 'none';
      }
    });
  }
  
  function showError(inputName, errorMessage) {
    const input = document.getElementById(inputName);
    const errorSpan = input.nextElementSibling;
  
    input.classList.add('error');
    if (errorSpan && errorSpan.classList.contains('error-message')) {
      errorSpan.innerText = errorMessage;
      errorSpan.style.display = 'block';
    }
  }
  
  function enviarFormulario() {
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const resultsContainer = document.querySelector('.results');
  
    // Reiniciar los estilos de error
    resetErrorStyles();
  
    // Validar campos obligatorios
    if (!dayInput.value || !monthInput.value || !yearInput.value) {
      if (!dayInput.value) {
        showError('day', 'Day is required');
      }
      if (!monthInput.value) {
        showError('month', 'Month is required');
      }
      if (!yearInput.value) {
        showError('year', 'Year is required');
      }
      return; // Detener el envío del formulario si hay campos vacíos
    }
  
    // Validar la selección del día según el mes
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
  
    if (
      (month === 2 && (day < 1 || day > 29)) || // Febrero tiene máximo 29 días
      ((month === 4 || month === 6 || month === 9 || month === 11) && (day < 1 || day > 30)) || // Meses con 30 días
      (day < 1 || day > 31) // Días fuera del rango de 1 a 31
    ) {
      showError('day', 'Invalid day');
      return; // Detener el envío del formulario si el día es inválido
    }
  
    // Validar que el año sea pasado
    const currentYear = new Date().getFullYear();
    const year = parseInt(yearInput.value);
  
    if (year >= currentYear) {
      showError('year', 'Year must be in the past');
      return; // Detener el envío del formulario si el año no es pasado
    }
  
    // Calcular y mostrar los resultados
    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day);
    let yearsDiff = currentDate.getFullYear() - inputDate.getFullYear();
    let monthsDiff = currentDate.getMonth() - inputDate.getMonth();
    let daysDiff = currentDate.getDate() - inputDate.getDate();
  
    if (monthsDiff < 0) {
      yearsDiff--;
      monthsDiff += 12;
    }
  
    resultsContainer.innerHTML = `
      <span id="years"><span class="number">${yearsDiff}</span> years</span><br>
      <span id="months"><span class="number">${monthsDiff}</span> months</span><br>
      <span id="days"><span class="number">${daysDiff}</span> days</span><br>
    `;
  }
  