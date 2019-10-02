import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import './App.css';
import Background from './assets/background-blur-clean-531880.jpg';
import Titles from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';


const APT_KEY = "7d82f601ba01d35bfcce10cc66e36d7d"

class App extends React.Component {

  state = {
    // temperature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: '',
    icons: '',
    temp_max: '',
    temp_min: '',
    celsius: ''
  }

  weatherIcon = {
    Thunderstorm: 'wi-thunderstorm',
    Drizzle: 'wi-sleet',
    Rain: 'wi-storm-showers',
    Snow: 'wi-snow',
    Atmosphere: 'wi-fog',
    Clear: 'wi-day-sunny',
    Clouds: 'wi-day-fog'
  };

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_weatherIcon(icons, rangeId) {
    switch(true){
      case rangeId>= 200 && rangeId <= 232:
        this.setState({icons: this.weatherIcon.Thunderstorm});
        break;
      case rangeId>= 300 && rangeId <= 321:
        this.setState({icons: this.weatherIcon.Drizzle});
        break;
      case rangeId>= 500 && rangeId <= 531:
        this.setState({icons: this.weatherIcon.Rain});
        break;
      case rangeId>= 600 && rangeId <= 622:
        this.setState({icons: this.weatherIcon.Snow});
        break;
      case rangeId>= 700 && rangeId <= 781:
        this.setState({icons: this.weatherIcon.Atmosphere});
        break;
      case rangeId === 800:
        this.setState({icons: this.weatherIcon.Clear});
        break;
      case rangeId>= 801 && rangeId <= 804:
        this.setState({icons: this.weatherIcon.Clouds});
        break;
        default:
          this.setState({icons: this.weatherIcon.Clouds});
    }
  };

  getWeather = async(e) => {
    e.preventDefault();
    const city = e.target.city.value;
    const country = e.target.country.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APT_KEY}`;
    const api_call = await fetch(url);
    const data = await api_call.json();
    console.log(data);
    if (city && country) {
      this.setState({
        // temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: '',
        celsius: this.calCelsius(data.main.temp),
        temp_max: this.calCelsius(data.main.temp_max),
        temp_min: this.calCelsius(data.main.temp_min),
      }); 
      this.get_weatherIcon(this.weatherIcon, data.weather[0].id);
    } else {
      this.setState({
        temperature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        error: 'please enter a city and a country.',
        celsius: '',
        temp_max: '',
        temp_min: ''
      });
    }
  }

  // componentWillMount(){
  //   this.getWeather();
  // }
  render () {
  return (
    <div className="App" style={ sectionStyle }>
      <Titles />
      <Form  getWeather={this.getWeather}/>
      <Weather 
        // temperature={this.state.temperature}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}
        celsius={this.state.celsius}
        temp_min={this.state.temp_min}
        temp_max={this.state.temp_max}
        weatherIcon={this.state.icons}
      />
    </div>
  );
  }
}

var sectionStyle = {
  backgroundSize: 'cover',
  backgroundImage: "url(" + { Background } + ")"
  
};

export default App;
