

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchForm: document.querySelector('.form-inline'),
};

console.log(refs.searchForm);
refs.searchForm.addEventListener('submit', onSearch);



function onSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const searchQuery = document.getElementById('search-box').value;

    fetchPocemon(searchQuery)
    .then(renderPokemonCard)
    .catch(onFetchError)
    .finally(()=> form.reset());// очитска input
}


// ----------------------------------------------- 
// Функція на catch помилку 

function onFetchError (error){
    alert(`Упс, доступні значення від 1 до 715!`);
};




// ----------------------------------------------- 
// Звертаємось на сервер для завантаження данних карточки покемона
function fetchPocemon(pokemonId){
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(response => {
        return response.json();
    })
};


// ----------------Створення карточки покемона------------------------------- 

    function renderPokemonCard (pokemon){
        console.log(pokemon);
        
        const markup = `<div class="slide-container">
                <div class="wrapper">
                    <div class="clash-card__image">
                    <img class="clash-card__img" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    </div>
                </div>
                    <div class="clash-card">
                    <h2 class="card-title">Ім'я</h2>
                    <span  class="clash-card__unit-name">${pokemon.name}</span>
                    <p class="card-text">Вага: ${pokemon.weight}</p>
                    <p class="card-text">Зріст: ${pokemon.height}</p>
                    <p class="card-text"><b>Вміння:</b></p>     
                            <ul class="list-group">
                                <li class="list-group-item">${pokemon.abilities[0].ability.name}</li>
                                <li class="list-group-item">${pokemon.abilities[1].ability.name}</li>
                            </ul>
                </div>
            </div>`;
        console.log(markup);
        refs.cardContainer.innerHTML = markup;
    };


