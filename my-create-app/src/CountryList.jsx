import React, { useEffect, useState } from 'react';

function CountryList() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('http://backend_app:3001/countries')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    return (
        <div>
            <h2>Country List</h2>
            <ul>
                {countries.map((country) => (
                    <li key={country.country_id}>{country.country_name}</li>
                ))}
            </ul>
        </div>
    );
}

export default CountryList;
