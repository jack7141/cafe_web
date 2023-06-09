import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import './CafeCard.css';

const AnimatedCard = styled(Card)({
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.0)',
    },
});

const FlipCardBack = styled(Card)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
});
const truncateString = (str, num) => {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + "...";
};
function CafeCard({ name, address, roadAddress, latitude, longitude, tel, homePage, businessHoursStart, businessHoursEnd, thumbnails }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };
    const thumbnailUrl = (thumbnails) => {
        if (!thumbnails || thumbnails.length === 0) {
            return "https://your-image-url.jpg"; // 대체 이미지 URL
        }
        return thumbnails[0].url;
    }

    return (
        <AnimatedCard className={`flip-container ${isFlipped ? 'flipped' : ''}`}
                      onClick={handleClick}
                      sx={{ maxWidth: 400 }}
                      sx={{ maxHeight: 400 }}
        >
            <div className="flipper">
                <CardMedia
                    component="img"
                    alt={name}
                    height="160"
                    image={thumbnailUrl(thumbnails)}
                />
                <CardContent>
                    <Typography gutterBottom variant="h8" component="div">
                        {truncateString(name, 10)} {/* 이름을 25자로 제한합니다. */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        🛣️ {roadAddress}<br />
                    </Typography>
                </CardContent>
                <FlipCardBack>
                    <CardContent>
                        <Typography gutterBottom variant="h8" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            🏠 {address}
                            <br />
                            🛣️ {roadAddress}
                            <br />
                            📍 {latitude}, {longitude}
                            <br />
                            📞 {tel}
                            <br />
                            🌐 {homePage}
                            <br />
                            ⏰ {businessHoursStart} - {businessHoursEnd}
                        </Typography>
                    </CardContent>
                </FlipCardBack>
            </div>
        </AnimatedCard>
    );
}

export default CafeCard;