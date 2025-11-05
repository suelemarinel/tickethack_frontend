console.log('script chargé!')
const departureInput = document.querySelector('#departure');
const arrivalInput = document.querySelector('#arrival');
const dateInput = document.querySelector('#date');
const btnSearch = document.querySelector('#btn-search');
const resultsDiv = document.querySelector('#card-right');
const btnCart = document.querySelector('#btn-cart');
const btnBookings = document.querySelector('#btn-bookings');
const btnHomePage = document.querySelector('#logo-container');

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
    const res = await fetch(`http://localhost:3000/trips?departure=${departure}&arrival=${arrival}&date=${date}`);
    const data = await res.json();

    //3. Envoyer la réponse
    if (data.result){
        let tripSection = document.querySelector('.trip');
        tripSection.innerHTML = '';
        tripSection.style.overflow='scroll';
        data.trips.forEach(trip => {
            document.querySelector('.trip').innerHTML += `
            <div class='search-result'>
                <span class="route">${trip.departure} > ${trip.arrival}</span>
                <span class="time">${moment(trip.date).format('HH:mm')}</span>
                <span class="price">${trip.price}€</span>
                <button class="book-button">Book</button>
            </div>
            `; 
        
    //4. Vider les values
    departureInput.value = '';
    arrivalInput.value = '';
    dateInput.value = '';    

        })}

    else {
        let tripSection = document.querySelector('.trip');
        tripSection.innerHTML = '';
        document.querySelector('.trip').innerHTML += `
                    <img id = 'notfoundimg' src='./images/notfound.png'>
                    <p id='notfound'> No trip found.</p>`
                }
        departureInput.value = '';
        arrivalInput.value = '';
        dateInput.value = '';    
    }) 

btnCart.addEventListener('click', () => {window.location.href = 'cart.html'}) 

btnBookings.addEventListener('click', () => {window.location.href = 'bookings.html'})

btnHomePage.addEventListener('click', () => {window.location.href = 'index.html'})