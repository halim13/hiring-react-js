import React from 'react'
import { Container, Card } from 'react-bootstrap'
import './Card.css'
import { Link } from 'react-router-dom'

export default function CardCompanies (props) {
  return (
    <Container fluid className='mainContent'>
      <Card
        className='cardItem'
        style={{ backgroundImage: `url(${props.photo})` }}
      >
        <Card.Body className='cardBody'>
          <div
            className='cardTop'
            style={{
              height: props.height
            }}
          ></div>
          <div className='cardBottom'>
            <h2 className='cardName'>
              <Link className='link-name' to={`/company/${props.id}`}>
                {props.name}
              </Link>
            </h2>
            <h5 className='cardSpecialist'>{props.location}</h5>
            <div className='cardEmailSalary'>
              <div className='email'>
                <i className='fa fa-envelope'></i>
                <p>{props.email}</p>
              </div>
              <div className='salary'>
                <i className='fa fa-phone'></i>
                <p>{props.contact}</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
