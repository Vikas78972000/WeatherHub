import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "e7bd6a431c6a326bb411a1a76ab826e1";

    let getWeatherInfo = async () => {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        let jsonResponse = await response.json();

        let result = {
            city: jsonResponse.name,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description
        };

        return result;
    }

    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            setError(false);
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            console.error(err.message);
            setError(true);
        }
    }

    return (
        <div className='searchBox'>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br />
                <br />
                <Button variant="contained" type='submit'>Search</Button>
                {error && <p style={{ color: 'red' }}>No such place exists!</p>}
            </form>
        </div>
    );
}
