import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CafeCard from './CafeCard';

const HotCafeList = ({ cafeData }) => {
    return (
        <>
            <Box p={2} textAlign="center">
                <Typography variant="h5">지금 가장 HOT🔥한 방문지 TOP 10</Typography>
            </Box>
            <Box py={3} minHeight="80vh">
                <Grid container spacing={2} sx={{ padding: { xs: '5%', sm: '10%', md: '20%', lg: '30%' } }}>
                    {cafeData.map((cafe, index) => (
                        <Grid key={index} item xs={6} sm={6} md={6} lg={6}>
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
        </>
    );
};
export default HotCafeList;