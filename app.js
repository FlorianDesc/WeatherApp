const inputVille = document.querySelector('#choix')
const searchbar = document.querySelector('.searchbar')
const container = document.querySelector('.container')
const erreur = document.querySelector('.erreur')
const header = document.querySelector(".header")
const degres = document.querySelector(".degres")
const ville = document.querySelector(".ville")
const center = document.querySelector(".center")
const pourcen = document.querySelector(".pourcen")
const kmh = document.querySelector(".kmh")
const detailsWeather = document.querySelector(".detailsWeather")
const weather = document.querySelector(".weather")


function resetInput(){
    const interval = setInterval(() => {
        if(inputVille.value.length === 0){
            erreur.style.display = "none"
            clearInterval(interval)
        }
    }, 100)
}

searchbar.addEventListener("click", () => {

    const APIKey = "54c4ca201f52617b54d99175ff1afee6"
    const city = inputVille.value

    if(city === ""){
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(rep => rep.json())
        .then(data => {
            if(data.cod === '404'){
                erreur.style.display = "block"
                resetInput()
                return;
            }
            else{

                erreur.style.display = "none"
                erreur.classList.add("erreurFullSize")

                container.style.aspectRatio = "6/8"
                header.style.height = "20%"

                degres.innerHTML = Math.round(data.main.temp)
                ville.innerHTML = data.name
                center.style.opacity = "1"

                pourcen.innerHTML = data.main.humidity + "%"
                kmh.innerHTML = data.wind.speed + "Km/h"
                detailsWeather.style.opacity = "1"

                switch (data.weather[0].main) {
                    case 'Clear':
                        weather.src = 'image/soleil.png';
                        break;
    
                    case 'Rain':
                        weather.src = 'image/pluie.png';
                        break;
    
                    case 'Snow':
                        weather.src = 'image/orage.png';
                        break;
    
                    case 'Clouds':
                        weather.src = 'image/nuage.png';
                        break;
    
                    default:
                        weather.src = 'image/nuage.png';
                }
            }
        })
        
})