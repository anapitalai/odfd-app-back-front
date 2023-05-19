import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Bar from '../../components/bar/Bar'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import BarCarousel from '../../components/bar/BarCarousel'
import Meta from '../../components/Meta'
import { listBars } from '../../actions/barActions'

const BarScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const barList = useSelector((state) => state.barList)
  const { loading, error, bars, page, pages } = barList

  useEffect(() => {
    dispatch(listBars(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <BarCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Bars</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {bars.map((bar) => (
              <Col key={bar._id} sm={12} md={6} lg={4} xl={3}>
                <Bar bar={bar} />
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

export default BarScreen


