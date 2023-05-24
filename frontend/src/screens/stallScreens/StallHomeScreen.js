import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../../components/Product'
import Stall from '../../components/stall/Stall'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import StallCarousel from '../../components/stall/StallCarousel'
import Meta from '../../components/Meta'
import { listStalls } from '../../actions/stallActions'

const StallScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const stallList = useSelector((state) => state.stallList)
  const { loading, error, stalls, page, pages } = stallList

  useEffect(() => {
    dispatch(listStalls(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {/* {!keyword ? (
        <StallCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )} */}
      <h1>Food Stalls</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {stalls.map((stall) => (
              <Col key={stall._id} sm={12} md={6} lg={4} xl={3}>
                <Stall stall={stall} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default StallScreen
