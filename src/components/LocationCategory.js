import React, { useState } from "react";
import {Box, Grid, Typography} from "@mui/material";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

const categories = [
    {
        name: '서울',
        icon: LocalCafeIcon,
        subCategories: ['중구', '서대문구', '마포구', '은평구', '강서구', '성동구'],
    },
    {
        name: '부산',
        icon: LocalCafeIcon,
        subCategories: ['중구', '서구', '동구', '영도구', '부산진구', '동래구'],
    },
    {
        name: '대구',
        icon: LocalCafeIcon,
        subCategories: ['중구', '서구', '동구', '영도구', '부산진구', '동래구'],
    },
    {
        name: '인천',
        icon: LocalCafeIcon,
        subCategories: ['중구', '서구', '동구', '영도구', '부산진구', '동래구'],
    },
    {
        name: '광주',
        icon: LocalCafeIcon,
        subCategories: ['중구', '서구', '동구', '영도구', '부산진구', '동래구'],
    },
    {
        name: '대전',
        icon: LocalCafeIcon,
        subCategories: ['중구', '서구', '동구', '영도구', '부산진구', '동래구'],
    },
    {
        name: '울산',
        icon: LocalCafeIcon,
        subCategories: ['중구', '서구', '동구', '영도구', '부산진구', '동래구'],
    },
    {
        name: '세종',
        icon: LocalCafeIcon,
        subCategories: ['중구', '서구', '동구', '영도구', '부산진구', '동래구'],
    },
    {
        name: '경기',
        icon: LocalCafeIcon,
        subCategories: ['중구', '서구', '동구', '영도구', '부산진구', '동래구'],
    },
    {
        name: '강원',
        icon: LocalCafeIcon,
        subCategories: ['중구', '서구', '동구', '영도구', '부산진구', '동래구'],
    },
];

const CategoryList = () => {
    const [subCategories, setSubCategories] = useState({});

    const handleCategoryClick = (categoryName) => {
        setSubCategories({
            ...subCategories,
            [categoryName]: !subCategories[categoryName],
        });
    };

    const chunks = categories.reduce((acc, category, index) => {
        const chunkIndex = Math.floor(index / 7);

        if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }

        acc[chunkIndex].push(category);

        return acc;
    }, []);

    return (
        <Box py={3} minHeight="80vh">
            <Grid container spacing={2} sx={{ padding: { xs: '5%', sm: '10%', md: '20%', lg: '30%' } }}>
        <div>
            {chunks.map((chunk, index) => (
                <div style={{ display: 'flex' }} key={index}>
                    {chunk.map((category, index) => (
                        <div style={{ marginRight: '40px' }} key={index} onClick={() => handleCategoryClick(category.name)}>
                            <LocalCafeIcon fontSize="medium" sx={{ width: "45px", height: "30px" }}/>
                            <Typography variant="subtitle1" sx={{fontSize: "0.7rem", fontWeight: "bold", margin: "8px 0 0",}}>
                                {category.name} 카페
                            </Typography>
                            {subCategories[category.name] && (
                                <div>
                                    {category.subCategories.map((subCategory, index) => (
                                        <Typography variant="subtitle2" key={index}>
                                            {subCategory}
                                        </Typography>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
            </Grid>
        </Box>
    );
};

export default CategoryList;