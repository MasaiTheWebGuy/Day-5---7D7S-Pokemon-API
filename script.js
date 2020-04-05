/*
Step 1
    -define the url in variable
    -use fetch to reach out to variable
    -next = .then
    -once found = res(sponse)
    -once found, the .json() brings the body of the API containing
    the information
    -next, display the data from the search on to screen
Step 2
Building the object from scratch, creating the display for pokemon's information
1 way

       /* const pokemon = {};
        pokemon['name'] = data.name;
        pokemon['id'] = data.id;
        pokemon['image'] = data.types.map( type => type.type.name).join(', ');
        console.log(pokemon)
        
 This way
        build a for loop and retiterate through the api list
        use Promise to bring data back at one rather than one at a time for faster results
        Build Pokemon information based off data from API       
        */



const pokedex = document.getElementById("pokedex") ;     

const fetchPokemon = () => {
    const promises = [];

    for (let i=1; i<150; i++){

        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

        Promise.all(promises).then((results) => {
            const pokemon = results.map((data) => ({
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                type: data.types.map((type) => type.type.name).join(', ')
            }));
            displayPokemon(pokemon);
            });
        };
        
 const displayPokemon = (pokemon) => {
            console.log(pokemon);
            const pokemonHTMLString = pokemon.map ( pokeman => 
                `
            <li class="card">
                <img class="card-image" src="${pokeman.image}"/>
                <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
                <p class="card-subtitle">Type: ${pokeman.type}</p>
            </li>
            `)
            .join('');
            pokedex.innerHTML = pokemonHTMLString;
        };
        
fetchPokemon();