import React from 'react';
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from './FooterStyles';

const Footer = () => {
  return (
    <Box>
      <h1 style={{ color: 'white', textAlign: 'center', marginTop: '-50px' }}>
        Game Share
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Vision</FooterLink>
            <FooterLink href="#">Reviews</FooterLink>
          </Column>
          <Column>
            <Heading>Categories</Heading>
            <FooterLink href="#">Playstation</FooterLink>
            <FooterLink href="#">Microsoft</FooterLink>
            <FooterLink href="#">Nintendo</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">support@gameshare.com</FooterLink>
            <FooterLink href="#">555 Fake St. New York, NY 10011</FooterLink>
            <FooterLink href="#">555-555-5555</FooterLink>

          </Column>
          <Column>
            <Heading>Social Media</Heading>

            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: '10px' }}>Instagram</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: '10px' }}>Twitter</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: '10px' }}>Youtube</span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
