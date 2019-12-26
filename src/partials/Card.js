import React from 'react';
import { Container, Card } from 'react-bootstrap';
import './Card.css';
import { Link } from 'react-router-dom';

export default function Cards(props) {
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
              height: props.height,
            }}
          ></div>
          <div className='cardBottom'>
            <h2 className='cardName'>
              <Link className='link-name' to={`/engineer/${props.id}`}>
                {props.name}
              </Link>
            </h2>
            <h5 className='cardSpecialist'>Frontend Developer</h5>
            <div className='cardEmailSalary'>
              <div className='email'>
                <i className='fa fa-envelope'></i>
                <p>{props.email}</p>
              </div>
              <div className='salary'>
                <i className='fa fa-money'></i>
                <p>
                  Rp.{' '}
                  {props.salary > 0
                    ? props.salary
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    : 0}
                </p>
              </div>
            </div>
            <span className='skill'>Skills :</span>
            <p className='skills'>{props.skills}</p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
