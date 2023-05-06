import NearCafeCard from "../NearCafe";
import React from "react";
import { Box, Grid, Typography } from '@mui/material';

const NearbyCafeList = ({ nearbyCafeData }) => {
    return (
        <>
            <Box p={2} textAlign="center">
                <Typography variant="h5">🔥가장 가까운 카페 List</Typography>
            </Box>
            <Box py={3} minHeight="80vh">
                <Grid container spacing={2} sx={{ padding: { xs: '5%', sm: '10%', md: '20%', lg: '30%' } }}>
                    {nearbyCafeData.map((cafe, index) => (
                        <Grid key={index} item xs={6} sm={6} md={6} lg={6}>
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
        </>
    );
};

export default NearbyCafeList;
