import {createSignal, onMount} from "solid-js";

export default function Weather(){
    const [weather, setWeather] = createSignal<any>(null)
    const [location, setLocation] = createSignal<any>(null)

    function getLocation() {
        let locationApi = "http://ip-api.com/json/?fields=61439";
        fetch(locationApi)
            .then(response => response.json())
            .then((data) => {
                console.log(JSON.stringify(data))
                setLocation(data);
                getWeatherAPI(data.city)
            })
    }

    onMount(async () => {
        await getLocation();
    })
    function getWeatherAPI(city: string){
        if (city == undefined){
            return;
        }
        let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${import.meta.env.VITE_WEATHER_SERVICE_API_KEY}`;

        fetch(apiURL)
            .then(response => response.json())
            .then((data)=> {
                setWeather(data);
            })
    }
    return (
        <section class="container">
                <section class="result-container text-black">
                    <p>Weather: <span id="weather-description"> {weather()?.weather[0].description}</span></p>
                    <p>Temperature: <span id="temp">{weather()?.main?.temp} F</span></p>
                    <p>Wind Speed: <span id="wind-speed">{weather()?.wind?.speed} mph</span></p>
                    <p>Humdity: <span id="humidity">{weather()?.main?.humidity}%</span></p>
                </section>
        </section>
    )
}