import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from '../Rating'

const Bar = ({ bar }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/bar/${bar._id}`}>
        <Card.Img src={bar.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/bar/${bar._id}`}>
          <Card.Title as='div'>
            <strong>{bar.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={bar.rating}
            text={`${bar.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h6'>{bar.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Bar
