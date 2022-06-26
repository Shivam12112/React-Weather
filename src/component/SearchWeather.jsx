import { React, useEffect, useState } from 'react'
import moment from 'moment';
const SearchWeather = () => {

    const [city, setCity] = useState();
    const [search, setSearch] = useState('bengaluru');

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        const fetchApi = async () => {
            const myKey = `51b607f72aeba693771c22c6faf03aca`;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${myKey}`;
            const response = await fetch(url);
            const jsonResponse = await response.json();
            setCity(jsonResponse);
            if ((jsonResponse?.cod === '404') || (jsonResponse?.cod === '400')) {
                return setCity(null);
            }
            setCity(jsonResponse);
        };

        fetchApi();
    }, [search]);
    const weatherCondition = (city?.weather[0]?.main);
    const img = `https://source.unsplash.com/random/300*900/?cloud,${weatherCondition}`;
    const cityInfo = (`${city?.name}, ${city?.sys?.country}`);
    const temp = (city?.main?.temp - 274.15).toFixed(2);
    const temp_min = (city?.main?.temp_min - 274.15).toFixed(2);
    const temp_max = (city?.main?.temp_max - 274.15).toFixed(2);
    const feels_like = (city?.main?.feels_like - 274.15).toFixed(2);
    const humidity = (city?.main?.humidity);
    const windSpeed = (city?.wind?.speed);

    let timezone = city?.timezone;
    let srs = city?.sys?.sunrise;
    let sst = city?.sys?.sunset;
    let sunrise = moment.utc(srs, 'X').add(timezone, 'seconds').format('HH:mm');
    let sunset = moment.utc(sst, 'X').add(timezone, 'seconds').format('HH:mm');

    return (
        <div>
            <div className="row justify-content-center p-1">
                <div className="col-md-5">
                    <div className="card text-white text-center">
                        <img src={img} className="card-img" alt="..." />
                        <div className="bg-dark bg-opacity-50 card-img-overlay">
                            <form>
                                <div className="pt-1"><h1 className='display-3'>
                                    The Weather</h1>
                                    <hr />
                                </div>
                                <div className="input-group my-2 mx-auto">
                                    <div className="col">
                                        <input type="search" className="form-control"
                                            onChange={handleInputChange}
                                            placeholder="Search City.. " />
                                    </div>
                                </div>
                            </form>
                            {
                                !city ?
                                    (<p className='card-title display-4'>City not found</p>) : (
                                        <div className="py-3">
                                            <h2 className="card-title display-4">{cityInfo}</h2>
                                            <hr />
                                            <h1 className='fw-bolder '>{temp} &deg;C </h1>
                                            <p className="mb-2 text-capitalize fs-3">{weatherCondition}</p>

                                            <p className="lead">Min - {temp_min} &deg;C | Max - {temp_max}  &deg;C</p>
                                            <p className="lead">Feals Like - {feels_like} &deg;C | Humidity - {humidity}%</p>
                                            <p className='lead'> Wind Speed - {windSpeed} Km/h</p>
                                            <p className="lead text-capitalize">Sunrise - {sunrise} | Sunset - {sunset}</p>

                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchWeather
