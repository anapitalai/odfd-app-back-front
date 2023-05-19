import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from '../Rating'

const Stall = ({ stall }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/stall/${stall._id}`}>
        <Card.Img src={stall.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/stall/${stall._id}`}>
          <Card.Title as='div'>
            <strong>{stall.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={stall.rating}
            text={`${stall.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h6'>{stall.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Stall
