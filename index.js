const $global = {
  history: document.querySelector('#history'),
  baseURL: 'http://localhost:3000/calculations',
  deleteButton: document.querySelector('#delete-button')
}

$global.deleteButton.addEventListener('click', () => deleteAllCalculations())

fetch($global.baseURL)
  .then(response => response.json())
  .then(displayCalculations)

  function displayCalculations(calculations) {
    calculations.forEach(calculation => {
      const calculationCard = createCalculationCard(calculation)
    })
  }

function createCalculationCard(calculation) {
  const calculationCard = document.createElement('div')
  calculationCard.classList.add('calculation-card')
  $global.history.append(calculationCard)
  createDeleteButton(calculation, calculationCard)
  createCardText(calculation, calculationCard)
  return calculationCard
}

function createCardText(calculation, calculationCard) {
  const principal = document.createElement('p')
  const interest = document.createElement('p')
  const years = document.createElement('p')
  const total = document.createElement('p')
  principal.textContent = `Principal: ${calculation.principal}`
  interest.textContent = `Interest Rate: ${calculation.interest}`
  years.textContent = `Years: ${calculation.years}`
  total.textContent = `Total Cost (USD): ${calculation.total}`
  calculationCard.append(principal, interest, years, total)
}

function createDeleteButton(calculation, calculationCard) {
  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'X'
  calculationCard.append(deleteButton)
  deleteButton.addEventListener('click', () => deleteCalculation(calculationCard, calculation))
}

function deleteCalculation(calculationCard, calculation) {
  calculationCard.remove()
  fetch(`${$global.baseURL}/${calculation.id}`, {
    method: 'DELETE'
  }).then(response => response.json())
  console.log('calculation deleted :)')
}

function submitForm(event) {
  event.preventDefault()
  const formData = new FormData(form)
  const principal = formData.get('principal')
  const interest = formData.get('interest')
  const years = formData.get('years')
  const calculation = { principal, interest, years }
  fetch(`${$global.baseURL}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(calculation)
  }).then(response => response.json())
    .then(createCalculationCard(result))
  createCalculationCard(result)
}

function deleteAllCalculations() {
  const calculationCards = document.querySelectorAll('.calculation-card')
  calculationCards.remove()
  fetch(`${$global.baseURL}/${calculation.id}`, {
    method: 'DELETE'
  }).then(response => response.json())
  console.log('calculation deleted :)')
}



