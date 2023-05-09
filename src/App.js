import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, InputBase, IconButton } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import theme from './style/theme';
import config from './components/config';
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import useCafeData from './components/useCafeData';
import NearbyCafeList from './components/NearbyCafeList';
import HotCafeList from './components/HotCafeList';
import QuietIcon from '@mui/icons-material/VolumeOff';
import CozyIcon from '@mui/icons-material/Home';
import UniqueIcon from '@mui/icons-material/EmojiObjects';
import ComfortableIcon from '@mui/icons-material/Weekend';
import ModernIcon from '@mui/icons-material/Store';
import SearchIcon from '@mui/icons-material/Search';
import PetsIcon from '@mui/icons-material/Pets';

const geocodingClient = mbxGeocoding({ accessToken: config.mapbox.accessToken });

const categories = [
    { name: '조용한', icon: QuietIcon },
    { name: '아늑한', icon: CozyIcon },
    { name: '이색적인', icon: UniqueIcon },
    { name: '편안한', icon: ComfortableIcon },
    { name: '모던한', icon: ModernIcon },
    { name: '애완', icon: PetsIcon },
];

function App() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);
    const { cafeData, nearbyCafeData } = useCafeData(currentLocation);
    const renderSearchBar = () => {
        return (
            <Grid item xs={12} sm={6} md={4}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'white',
                        borderRadius: '30px',
                        padding: '8px',
                        marginTop: '10px',
                        marginLeft: '32px',
                        marginRight: '100px', // 이 부분 수정
                        boxShadow: '0 10px 10px rgba(0.3, 0.5, 10, 0.1)',
                        width: '85%',
                    }}
                >
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        placeholder="카페를 검색하세요"
                        inputProps={{ 'aria-label': 'Search Cafe' }}
                        sx={{
                            flexGrow: 10,
                            marginLeft: '8px',
                            marginRight: '32px', // 오른쪽 패딩 크기를 설정합니다.
                        }}
                    />
                </Box>
            </Grid>
        );
    };


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

    const renderCategoryHeader = () => {
        return (
            <Box my={2} sx={{ display: "flex", justifyContent: "center" }}>
                {categories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                        <Grid
                            item
                            key={index}
                            sx={{ textAlign: "center", maxWidth: "150px", mx: 2 }}
                        >
                            <IconComponent
                                fontSize="medium"
                                sx={{ width: "30px", height: "30px" }}
                            />
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: "0.7rem",
                                    fontWeight: "bold",
                                    margin: "8px 0 0",
                                }}
                            >
                                {category.name}카페
                            </Typography>
                        </Grid>
                    );
                })}
            </Box>
        );
    };

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
