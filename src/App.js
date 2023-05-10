import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { Box, Grid, Typography, InputBase, IconButton } from '@mui/material';
import theme from './style/theme';
import config from './components/config';


import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import useCafeData from './components/useCafeData';
import HotCafeList from './components/HotCafeList';
import NearbyCafeList from './components/NearbyCafeList';
import renderCategoryHeader from "./components/LocationCategory";
import renderSearchBar from "./components/SearchBar";

const geocodingClient = mbxGeocoding({ accessToken: config.mapbox.accessToken });

function App() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);
    const { cafeData, nearbyCafeData } = useCafeData(currentLocation);

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
        <ThemeProvider theme={theme}>
            <Box>
                {renderSearchBar()}
                {renderCategoryHeader()}
                {currentAddress ? (
                    <NearbyCafeList nearbyCafeData={nearbyCafeData} />
                ) : (
                    <Box p={2} textAlign="center">
                        <Typography variant="body1">현재 주소를 불러올 수 없습니다. 죄송합니다.</Typography>
                    </Box>
                )}
                <HotCafeList cafeData={cafeData} />
            </Box>
        </ThemeProvider>
    );
}

export default App;
