import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CafeCard from './CafeCard';
import NearCafeCard from './NearCafe';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import CafeCardWithDistance from "./NearCafe";


const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoiamFjazcxNDEiLCJhIjoiY2xoYWs5NndlMGRxcjNrbnFuNmFjeWFkdSJ9.b_6yz6omTY_LJiHZNQ_65w' });

const theme = createTheme({
    typography: {
        fontFamily: [
            'Baedal',
            'Noto Sans KR',
            'sans-serif',
        ].join(','),
    },
});

function App() {
    const [cafeData, setCafeData] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [nearbyCafeData, setNearbyCafeData] = useState([]);

    useEffect(() => {
        fetch('http://221.155.148.197:8001/api/v1/cafe/')
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
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);


    useEffect(() => {
        if (currentLocation) {
            fetch('http://221.155.148.197:8001/api/v1/cafe/nearby/', {
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
    useEffect(() => {
        if (currentLocation) {
            geocodingClient.reverseGeocode({
                query: [currentLocation.longitude, currentLocation.latitude],
                limit: 1,
                language: ['ko'],
            })
                .send()
                .then((response) => {
                    if (response && response.body && response.body.features && response.body.features.length > 0) {
                        setCurrentAddress(response.body.features[0].place_name);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [currentLocation]);

    return  (
        // currentLocation.latitude, currentLocation.longitude
        <ThemeProvider theme={theme}>
            <Box>
                {currentAddress ? (
                        <Box p={2} textAlign="center">
                            <Typography variant="h5">🔥가장 가까운 카페 List</Typography>
                        </Box>
                ) : (
                    <Box p={2} textAlign="center">
                        <Typography variant="body1">현재 주소를 불러올 수 없습니다. 죄송합니다.</Typography>
                    </Box>
                )}
                <Box py={3} minHeight="80vh">
                    <Grid container spacing={2} sx={{ padding: '0 30%' }}>
                        {nearbyCafeData.map((cafe, index) => (
                            <Grid key={index} item xs={12} sm={6}>
                                <NearCafeCard
                                    name={cafe.title}
                                    address={cafe.address}
                                    roadAddress={cafe.road_address}
                                    latitude={cafe.latitude}
                                    longitude={cafe.longitude}
                                    tel={cafe.tel}
                                    homePage={cafe.home_page}
                                    businessHoursStart={cafe.business_hours_start}
                                    businessHoursEnd={cafe.business_hours_end}
                                    thumbnails={cafe.thumbnails}
                                    distance={cafe.distance}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box p={2} textAlign="center">
                    <Typography variant="h5">지금 가장 HOT🔥한 방문지 TOP 10</Typography>
                </Box>
                <Box py={3} minHeight="80vh">
                    <Grid container spacing={2} sx={{ padding: '0 30%' }}>
                        {cafeData.map((cafe, index) => (
                            <Grid key={index} item xs={12} sm={6}>
                                <CafeCard
                                    name={cafe.title}
                                    address={cafe.address}
                                    roadAddress={cafe.road_address}
                                    latitude={cafe.latitude}
                                    longitude={cafe.longitude}
                                    tel={cafe.tel}
                                    homePage={cafe.home_page}
                                    businessHoursStart={cafe.business_hours_start}
                                    businessHoursEnd={cafe.business_hours_end}
                                    thumbnails={cafe.thumbnails}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
