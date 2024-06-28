import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stateList, setStateList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [userText, setUserText] = useState('');
  


  async function fetchData(url) {
    try{
      const response = await fetch(url);
      const data =   await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    fetchData('https://crio-location-selector.onrender.com/countries').then((data) => {
      setCountryList(data);
    }).catch(() => null);
    
  },[]);

  const handleCountry = (e) => {
    setSelectedCountry(e.target.value);
    fetchData(`https://crio-location-selector.onrender.com/country=${e.target.value}/states`).then((data) => {
        setStateList(data);
        setCityList([]);
    }).catch(() => null);
  }
  const handleState = (e) => {
    setSelectedState(e.target.value);
    fetchData(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${e.target.value}/cities`).then((data) => {
        setCityList(data);
    }).catch(() => null);
  }
  const handleCity = (e) => {
    setSelectedCity(e.target.value);
    setUserText(`You selected ${e.target.value}, ${selectedState}, ${selectedCountry}`);
  }

  return (
    <div className='container'>
      <h1>Select Location</h1>
      <form>
        <select name='country' onChange={handleCountry} >
          <option value='Select Country' selected >Select Country</option>
          {countryList.map((country, idx)=><option key={idx} value={country} >{country}</option>)}
        </select>
        <select name='states' onChange={handleState} >
          <option value='Select State' selected >Select State</option>
          {stateList.map((state, idx)=><option key={idx} value={state} >{state}</option>)}
        </select>
        <select name='cities' onChange={handleCity} >
          <option value='Select City' selected >Select City</option>
          {cityList.map((city, idx)=><option key={idx} value={city} >{city}</option>)}
        </select>
      </form>
      <div>{userText}</div>
    </div>
  );
}

export default App;