import {Box, Grid, IconButton, InputBase} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";


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
export default renderSearchBar;