console.log('script chargé!')
const departureInput = document.querySelector('#departure');
const arrivalInput = document.querySelector('#arrival');
const dateInput = document.querySelector('#date');
const btnSearch = document.querySelector('#btn-search');
const resultsDiv = document.querySelector('#card-right');

//1. On lance la recherche
btnSearch.addEventListener('click', async () => {
    const departure = departureInput.value.trim();
    const arrival = arrivalInput.value.trim();
    const date = dateInput.value.trim();

    if (!departure || !arrival || !date){
        console.log('Rempli tous les champs');
        return;
    }

    //2. Requête vers le backend
    const res = await fetch (`/trips?departure=${departure}&arrival=${arrival}&date={date}`);
    const data = await res.json();

    //3. Envoyer la réponse
    if (data.result){
        data.trips.forEach(trip => {
            document.querySelector('#trip').innerHTML += `
            <span class="route">${trip.departure} > ${trip.arrival}</span>
            <span class="time">${new Date(trip.date).toLocaleString()}</span>
            <span class="price">${trip.price}€</span>
            <button class="book-button">Book</button>
            `;
        
    //4. Vider les values
    departureInput.value = '';
    arrivalInput.value = '';
    dateInput.value = '';    

        })
    }

})