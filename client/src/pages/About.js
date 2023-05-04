import React from "react";
import TopNav from "../components/Navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";


const About = () => {
    
    return (
        <>  
        
        <TopNav />

        <div className="hero-image"></div>

        <Container className="d-flex justify-content-center align-items-center flex-column">
            <h1 className="mb-4">About Us</h1>
            <Row>
                <Col md={4}>
                    <Card className="about-card">
                        <Card.Body>
                            <Card.Title>What we do</Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Donec mattis pretium massa. Aliquam erat volutpat. 
                                Nulla facilisi. Donec vulputate interdum sollicitudin. 
                            </Card.Text>
                            <Button variant="primary">Learn More</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="about-card">
                        <Card.Body>
                            <Card.Title>Our history</Card.Title>
                            <Card.Text>
                            <p>Los Angeles has a vibrant street vendor culture that is deeply embedded in the city's history and identity. Street vending has long been an integral part of the city's culinary landscape, offering a diverse array of foods and goods to residents and visitors alike.</p>

                            <p>The street vendor culture in Los Angeles is known for its diverse range of cuisines, from Mexican tacos and elotes to Filipino skewers and Thai papaya salad. Many of these vendors operate in designated areas such as food truck parks or street fairs, but some also operate illegally on sidewalks and street corners.</p>

                            <p>In recent years, the city has made efforts to legalize and regulate street vending, which was previously considered a misdemeanor offense. In 2018, the Los Angeles City Council passed a law to decriminalize street vending and establish a permit system for vendors to operate legally. This has helped to improve working conditions for vendors and provide more opportunities for entrepreneurship in the city.</p>

                            <p>However, there are still challenges facing street vendors in Los Angeles, including a lack of access to affordable permits and the threat of displacement due to gentrification and development. Despite these challenges, the street vendor culture in Los Angeles continues to thrive and remains an important part of the city's culinary and cultural landscape.</p>
                            </Card.Text>
                            <Button variant="primary">Learn More</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="about-card">
                        <Card.Body>
                            <Card.Title>Our team</Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Donec mattis pretium massa. Aliquam erat volutpat. 
                                Nulla facilisi. Donec vulputate interdum sollicitudin. 
                            </Card.Text>
                            <Button variant="primary">Learn More</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        
        </>


    )
}

export default About;