import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import medicine from './image/medicine.jpg';
import vitamin from './image/vitamin.jpg';
import ozmed from './image/B12.jpg';
import blood from './image/blood2.jpg';
import heart from './image/heart.jpg';
import Navbar from '../Patient/components/pages/Navbar';
import Footer from '../Footer/Footer';

const Article = () => {
  const [artType, setArtType] = useState('');
  const history = useHistory(); // Initialize useHistory

  const sendData = (type) => {
    setArtType(type);
    console.log(artType);

    // Redirect to the details page with the selected type
    history.push(`/article-details/${type}`);
  };
    return (
        <div>
           
            <div className='container'>

                <div className='row'>
                    <div className='col-sm-12 col-md-4 col-xxl-4'>
                        <Card sx={{ maxWidth: 345 }} >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={medicine}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Can drinking this 'medicine' 3 times a week reverse aging?
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        The hunt for age-defying cures has taken an interesting turn in the quest
                                        for eternal youth. These days, resveratrol - a naturally occurring substance
                                        present in some plants and known for its possible anti-aging and health-promoting
                                        qualities - is the talk of the town...
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={()=>{sendData('medicine')}}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                    <div className='col-sm-12 col-md-4 col-xxl-4'>
                        <Card sx={{ maxWidth: 345 }} onClick={sendData('B12')}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={ozmed}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Vitamin B12 deficiency signs that are mostly ignored​
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Vitamin B12 plays a crucial role in various bodily functions, including red blood cell formation, neurological health, and DNA synthesis. Since the body cannot produce B12 on its own, it must be obtained through diet or supplements...
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                    <div className='col-sm-12 col-md-4 col-xxl-4'>
                        <Card sx={{ maxWidth: 345 }} >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={vitamin}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    FDA says it's seized 'thousands of units' of counterfeit Ozempic.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        The US Food and Drug Administration warned Thursday that it's seized "thousands of units" of counterfeit versions of the type 2 diabetes drug Ozempic from the US drug supply chain, and it's urging suppliers, pharmacies...
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={()=>{sendData('ozempic')}}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-4 col-xxl-4'>
                        <Card sx={{ maxWidth: 345 }} >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={blood}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Blood, Blood Products and Products of Human Origin :
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        An insufficient or unsafe blood supply for transfusion has a negative impact on the effectiveness of key health services and programmes to provide appropriate patient care in numerous acute and chronic conditions. Ensuring access of all patients who require transfusion to safe...
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={()=>{sendData('blood')}}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                    <div className='col-12 col-md-4 col-xxl-4'>
                        <Card sx={{ maxWidth: 345 }} >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={heart}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Cardiovascular diseases
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Cardiovascular diseases (CVDs) are a group of disorders of the heart and blood vessels, including coronary heart disease, cerebrovascular disease, peripheral arterial disease, rheumatic heart disease, congenital heart disease, deep vein thrombosis...
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={()=>{sendData('heart')}}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>




            </div>
            
        </div>
    )
}

export default Article
