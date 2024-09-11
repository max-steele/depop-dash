import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const SliderContainer = styled('div')({
  width: '80%',
  margin: '0 auto',
  paddingTop: '20px',
  position: 'relative',
  '& .slick-prev:before': {
    color: '#141414',
  },
  '& .slick-next:before': {
    color: '#141414',
  },
  '& .slick-dots li button:before': {
    color: '#141414',
  },
  '& .slick-dots li.slick-active button:before': {
    color: '#141414',
    opacity: 1,
  },
});

const Filter1: React.FC = () => {
    const images = [
      '/images/ex2/img1.png',
      '/images/ex2/img2.png',
      '/images/ex2/img3.png',
      '/images/ex2/img4.png',
      '/images/ex2/img5.png',
      '/images/ex2/img6.png',
      '/images/ex2/img7.png',
      '/images/ex2/img8.png',
      '/images/ex2/img9.png',
      '/images/ex2/img10.png',
    ];

    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <>
        <Box
          sx={{
            height: '850px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'left',
            padding: '0 100px 0 100px',
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'left',
              width: '50%',
              height: '100%',
            }}
          >
            <Typography variant="h6" fontSize="40px" color="text.secondary">
              Remove Background
            </Typography>
            <Typography variant="h6" fontSize="17px" color="text.secondary" sx={{ mt: 4 }}>
              Timeless and professional white background photos. Best paired with excellent lighting and a neutral backdrop.
            </Typography>
            <Typography variant="h6" fontSize="17px" color="text.secondary" sx={{ mt: 2 }}>
              Sample Images & Inspiration from <a href='https://earlgray.us/' target='_blank' rel="noreferrer">earlgray</a>
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'left',
              width: '50%',
              height: '100%',
            }}
          >
            <SliderContainer>
              <Slider {...settings}>
                {images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      style={{ width: '100%', borderRadius: '10px' }}
                    />
                  </div>
                ))}
              </Slider>
            </SliderContainer>
          </Box>
        </Box>
      </>
    );
}

export default Filter1;