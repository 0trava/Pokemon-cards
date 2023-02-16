

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchForm: document.querySelector('[btn-primare]'),
};

console.log(refs.searchForm);
refs.searchForm.addEventListener('click', onSearch);



function onSearch(e) {
    e.preventDefault();

    const searchQuery = generateID();

    fetchPocemon(searchQuery)
    .then(renderPokemonCard)
    .catch(onFetchError)
}


// ----------------------------------------------- 
// Функція на catch помилку, генеруємо інше зображення

function onFetchError (error){
    generateID();
};

// Функція генерації id картки
function generateID() {
    return Math.floor(Math.random() * 150) + 1;
}


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
                    <img class="clash-card__img" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                    </div>
                </div>
                    <div class="clash-card">
                    <h2  class="clash-card__unit-name">${pokemon.name}</h2>
                    <div class="box-card-text">
                        <p class="card-text">Вага: <span>${pokemon.weight}</span></p>
                        <p class="card-text">Зріст: <span>${pokemon.height}</span></p>
                    </div>
                    <p class="card-text"><b>Вміння</b></p>     
                            <ul class="list-group">
                                <li class="list-group-item">${pokemon.abilities[0].ability.name}</li>
                                <li class="list-group-item">${pokemon.abilities[1].ability.name}</li>
                            </ul>
                </div>
            </div>`;

        refs.cardContainer.innerHTML = markup;
    };


