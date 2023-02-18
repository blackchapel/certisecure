import * as React from 'react';
import { Button, Typography, Box, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import hero from 'assets/images/hero.svg';
import { useTheme, styled } from '@mui/material/styles';
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative'
    // '&:after': {
    //     content: '""',
    //     position: 'absolute',
    //     width: 500,
    //     height: 500,
    //     background: `linear-gradient(210.04deg, ${theme.palette.primary.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    //     borderRadius: '50%',
    //     top: -30,
    //     left: -180
    // },
    // '&:before': {
    //     content: '""',
    //     position: 'absolute',
    //     width: 500,
    //     height: 500,
    //     background: `linear-gradient(140.9deg, ${theme.palette.primary.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    //     borderRadius: '50%',
    //     top: -160,
    //     left: -130
    // }
}));
export default function ProductHero() {
    return (
        <>
            <CardWrapper>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            p: { xs: 2, sm: 3, xl: 5 }
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 600,
                                fontSize: {
                                    xs: '2.5rem',
                                    sm: '3rem',
                                    md: '3.5rem',
                                    lg: '4rem',
                                    xl: '4.5rem'
                                },
                                color: 'secondary.dark'
                            }}
                            fontFamily="Poppins, sans-serif"
                        >
                            Certificate Security like Never Before.
                        </Typography>
                        <Typography variant="h2" sx={{ mt: 2, color: 'text.secondary', fontWeight: 400 }}>
                            The power of blockchain technology is now available to you.
                        </Typography>
                        {/* <Button
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, width: '50%' }}
                            onClick={() => {
                                window.location.href = '/sign-up';
                            }}
                        >
                            Get Started
                        </Button> */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <img src={hero} alt="hero" width="80%" />
                    </Grid>
                </Grid>
            </CardWrapper>
        </>
    );
}
