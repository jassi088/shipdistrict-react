import { useState, useEffect, useMemo } from 'react';
import { countriesJson, statesJson, citiesJson } from '@/assets/json';

const useLocationSelector = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [, setSelectedCity] = useState<string>('');
  const [availableCountries, setAvailableCountries] = useState<{ label: string; value: string }[]>([]);
  const [availableStates, setAvailableStates] = useState<{ label: string; value: string }[]>([]);
  const [availableCities, setAvailableCities] = useState<{ label: string; value: string }[]>([]);

  // Memoize the countries data so that it only recalculates if countriesJson changes
  const memoizedCountries = useMemo(() => {
    return countriesJson.map((country) => ({
      label: country.name,
      value: country.name.toLowerCase(),
    }));
  }, [countriesJson]);

  useEffect(() => {
    setAvailableCountries(memoizedCountries);
  }, [memoizedCountries]);

  // Memoize the states data based on the selected country
  const memoizedStates = useMemo(() => {
    if (selectedCountry) {
      return statesJson
        .filter((state) => state.country_name.toLowerCase() === selectedCountry.toLowerCase())
        .map((state) => ({ label: state.name, value: state.name.toLowerCase() }));
    }
    return [];
  }, [selectedCountry, statesJson]);

  useEffect(() => {
    setAvailableStates(memoizedStates);
    setSelectedState('');
    setAvailableCities([]);
  }, [memoizedStates]);

  // Memoize the cities data based on the selected state
  const memoizedCities = useMemo(() => {
    if (selectedState) {
      return (citiesJson as any)
        .filter((city: any) => city.state_name.toLowerCase() === selectedState.toLowerCase())
        .map((city: any) => ({ label: city.name, value: city.name.toLowerCase() }));
    }
    return [];
  }, [selectedState, citiesJson]);

  useEffect(() => {
    setAvailableCities(memoizedCities);
    setSelectedCity('');
  }, [memoizedCities]);

  return {
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    availableCountries,
    availableStates,
    availableCities,
  };
};

export default useLocationSelector;
