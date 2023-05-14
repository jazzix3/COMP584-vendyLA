import React from "react";
import TopNav from "../components/Navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";


const About = () => {

    return (
        <>
            <div className="home-cover">

                <TopNav />

                <div className="hero-image"></div>

                <Container className="d-flex justify-content-center align-items-center flex-column">
                    <h1 className="mb-4 mt-5" style={{
                        textDecoration: 'underline'
                    }}>About Us</h1>
                    <Row>
                        <Col md={4}>
                            <Card className="about-card">
                                <Card.Body>
                                    <Card.Title><h3>What is VendyLA</h3></Card.Title>
                                    <Card.Text>
                                        <p>
                                            Street vendors are underrepresented within other Food/Merch reviewer applications (i.e Yelp). VendyLA's purpose is to have an application focused around street vendors with the hopes of bringing more clientele to their business.
                                        </p>
                                        <p>
                                            - Food/Merch application with a focus on street vending in Los Angeles.
                                        </p>
                                        <p>
                                            - Allow users to find nearby street vendors via location services
                                        </p>
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="about-card">
                                <Card.Body>
                                    <Card.Title><h3>LA's Street Vending History</h3></Card.Title>
                                    <Card.Text>
                                        <p>Los Angeles has a vibrant street vendor culture that is deeply embedded in the city's history and identity. Street vending has long been an integral part of the city's culinary landscape, offering a diverse array of foods and goods to residents and visitors alike.</p>

                                        <p>The street vendor culture in Los Angeles is known for its diverse range of cuisines, from Mexican tacos and elotes to Filipino skewers and Thai papaya salad. Many of these vendors operate in designated areas such as food truck parks or street fairs, but some also operate illegally on sidewalks and street corners.</p>

                                        <p>In recent years, the city has made efforts to legalize and regulate street vending, which was previously considered a misdemeanor offense. In 2018, the Los Angeles City Council passed a law to decriminalize street vending and establish a permit system for vendors to operate legally. This has helped to improve working conditions for vendors and provide more opportunities for entrepreneurship in the city.</p>

                                        <p>However, there are still challenges facing street vendors in Los Angeles, including a lack of access to affordable permits and the threat of displacement due to gentrification and development. Despite these challenges, the street vendor culture in Los Angeles continues to thrive and remains an important part of the city's culinary and cultural landscape.</p>
                                    </Card.Text>
                                    <a href="https://lastreetvendors.org/" target="_blank" rel="noopener noreferrer">
                                        <Button variant="primary">Learn More</Button>
                                    </a>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="about-card">
                                <Card.Body>
                                    <Card.Title><h3>Our Team</h3></Card.Title>
                                    <Card.Text>
                                        <p>Feel free to check out the project repository for any updates.</p>


                                        <a href="https://github.com/jazzix3/COMP584-vendyLA" target="_blank">
                                            <i class="fab fa-github" style={{ fontSize: '32px' }}></i>
                                            <span style={{ fontSize: '24px' }}>VendyLA</span>
                                        </a>


                                    </Card.Text>


                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>


    )
}

export default About;