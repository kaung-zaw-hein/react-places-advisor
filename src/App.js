import React, {useState, useEffect} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
 
import {  getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import './App.css';

function App() {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [ coordinates, setCoordinates] = useState({});
  const [ bounds, setBounds ] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data));

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [bounds, type]);





  return (
    <>
      <CssBaseline />
      <Header  />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            places={ places}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
