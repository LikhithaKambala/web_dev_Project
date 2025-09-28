const registrationForm = document.getElementById("registrationForm");
const afterRegistration = document.getElementById("afterRegistration");
const welcomeMessage = document.getElementById("welcomeMessage");

const fetchBtn = document.getElementById("btn");
const resultBox = document.getElementById("pokemonDisplay");
const loading = document.getElementById("loading");          
const searchInput = document.getElementById("searchPokemon");
const searchBtn = document.getElementById("searchBtn");
const typeFilter = document.getElementById("typeFilter");

function showLoading() { loading.style.display = "block"; }
function hideLoading() { loading.style.display = "none"; }

function displayPokemons(pokemons) {
    resultBox.innerHTML = ""; 
    pokemons.forEach(p => {
        resultBox.innerHTML += `
            <div class="pokemon-card">
                <h3>${p.name.toUpperCase()}</h3>
                <img src="${p.sprites.front_default}" alt="${p.name}">
                <p>Height: ${p.height}</p>
                <p>Weight: ${p.weight}</p>
                <button class="favBtn" data-name="${p.name}">❤️ Favorite</button>
            </div>
        `;
    });
}

// ------------------ Registration ------------------
registrationForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    console.log("Registered:", name, email);

    registrationForm.style.display = "none"; 
    afterRegistration.style.display = "block"; 
    welcomeMessage.textContent = `Hi ${name}, here are some Pokémon for you!`;
});

// ------------------ Fetch first Pokémon ------------------
fetchBtn.addEventListener("click", async () => {
    try {
        showLoading();
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
        const data = await res.json();
        const allPromises = data.results.map(p => fetch(p.url).then(r => r.json()));
        const allPokemons = await Promise.all(allPromises);
        displayPokemons(allPokemons);
    } catch (err) {
        console.error("Error fetching Pokémon:", err);
    } finally {
        hideLoading();
    }
});

// ------------------ Search Pokémon ------------------
searchBtn.addEventListener("click", async () => {
    const name = searchInput.value.trim().toLowerCase();
    if (!name) return;

    try {
        showLoading();
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error("Pokémon not found");
        const p = await res.json();
        displayPokemons([p]);
    } catch (err) {
        console.error(err);
        resultBox.innerHTML = `<p>${err.message}</p>`;
    } finally {
        hideLoading();
    }
});

// ------------------ Filter by Type ------------------
typeFilter.addEventListener("change", async () => {
    const type = typeFilter.value;
    if (!type) return;

    try {
        showLoading();
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await res.json();
        const allPromises = data.pokemon.slice(0, 12).map(p => fetch(p.pokemon.url).then(r => r.json()));
        const allPokemons = await Promise.all(allPromises);
        displayPokemons(allPokemons);
    } catch (err) {
        console.error(err);
    } finally {
        hideLoading();
    }
});
