import { getData } from "./mymodule.js ";
const dataBox=document.getElementById("dataBox");
document.getElementById("button").addEventListener("click",()=>{
    dataBox.textContent=getData();
});;
// Registration handling
const registrationForm = document.getElementById("registrationForm");
const afterRegistration = document.getElementById("afterRegistration");

registrationForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent page reload

    // Optionally, you can get the entered data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    console.log("Registered:", name, email);

    // Hide registration form
    registrationForm.style.display = "none";

    // Show Pokémon section
    afterRegistration.style.display = "block";
});
document.getElementById("btn").addEventListener("click", () => {
    const resultBox = document.getElementById("pokemonDisplay");
    resultBox.innerHTML = "Loading Pokémon...";
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
        .then(response => response.json()
        )
        .then(data => {
            resultBox.innerHTML = "";
            const pokemons = data.results;

            pokemons.forEach(p => {
                fetch(p.url)
                    .then(res => res.json())
                    .then(pokeDetails => {
                        resultBox.innerHTML += `
                            <div style="margin:10px; padding:10px; border:1px solid #ccc; border-radius:10px; width:200px; display:inline-block; text-align:center;">
                                <h3>${pokeDetails.name.toUpperCase()}</h3>
                                <img src="${pokeDetails.sprites.front_default}" alt="${pokeDetails.name}">
                                <p>Height: ${pokeDetails.height}</p>
                                <p>Weight: ${pokeDetails.weight}</p>
                            </div>
                        `;
                    });
            });
        })
        .catch(error => {
            resultBox.textContent = "An error occurred while fetching Pokémon";
            console.error("Error fetching Pokémon:", error);
        });
});