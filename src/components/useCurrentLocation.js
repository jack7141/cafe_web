import { useState, useEffect } from 'react';

const useCurrentLocation = () => {
    const [currentLocation, setCurrentLocation] = useState(null);

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.log(error);
                setTimeout(() => getLocation(), 3000); // 3초 후에 다시 위치 정보 요청
            }
        );
    };

    useEffect(() => {
        getLocation();
    }, []);

    return { currentLocation, setCurrentLocation };
};

export default useCurrentLocation;