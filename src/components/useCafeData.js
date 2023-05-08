import { useState, useEffect } from 'react';

const useCafeData = (currentLocation) => {
    const [cafeData, setCafeData] = useState([]);
    const [nearbyCafeData, setNearbyCafeData] = useState([]);

    useEffect(() => {
        fetch('https://172.22.0.1:8001/api/v1/cafe/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cafe data');
                }
                return response.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.data)) {
                    setCafeData(data.data);
                } else {
                    console.error('API response is not an array');
                }
            })
            .catch((error) => {
                console.error('Error fetching cafe data:', error);
            });
    }, []);

    useEffect(() => {
        if (currentLocation) {
            fetch('https://172.22.0.1:8001/api/v1/cafe/nearby/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch nearby cafe data');
                    }
                    return response.json();
                })
                .then((data) => {
                    setNearbyCafeData(data);
                })
                .catch((error) => {
                    console.error('Error fetching nearby cafe data:', error);
                });
        }
    }, [currentLocation]);

    return { cafeData, nearbyCafeData };
};

export default useCafeData;