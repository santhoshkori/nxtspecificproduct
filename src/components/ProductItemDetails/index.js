import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductspage from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class ProductItemDetails extends Component {
  state = {
    specificproduct: {},
    similarProducts: [],
    apistatus: apiStatusConstants.initial,
    Quantity: 1,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({apistatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const myid = id.slice(1)
    const apiUrl = `https://apis.ccbp.in/products/${myid}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const productDetails = {
        imageUrl: data.image_url,
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        price: data.price,
        rating: data.rating,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
      }

      const updatedSimilarProducts = data.similar_products.map(eachproduct => ({
        imageUrl: eachproduct.image_url,
        availability: eachproduct.availability,
        brand: eachproduct.brand,
        description: eachproduct.description,
        price: eachproduct.price,
        rating: eachproduct.rating,
        style: eachproduct.style,
        title: eachproduct.title,
        totalReviews: eachproduct.total_reviews,
      }))
      this.setState({
        specificproduct: productDetails,
        similarProducts: updatedSimilarProducts,
        apistatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
    }
  }

  increaseQuantity = () => {
    const {Quantity} = this.state
    this.setState(prevState => ({Quantity: prevState.Quantity + 1}))
  }

  decreaseQuantity = () => {
    const {Quantity} = this.state
    this.setState(prevState => ({Quantity: prevState.Quantity - 1}))
  }

  renderProductPage = () => {
    const {specificproduct, Quantity} = this.state
    const {
      imageUrl,
      availability,
      brand,
      description,
      price,
      rating,
      style,
      title,
      totalReviews,
    } = specificproduct
    return (
      <div className="specificcontainer">
        <img src={imageUrl} alt="product" className="specificimgpx" />

        <div className="desccontainer">
          <h1>{title}</h1>
          <p>{`Rs ${price}`}</p>

          <div className="reviewcontainer">
            <div className="ratingcontainer">
              <p className="ratingsty">{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png "
                alt="star"
                className="spanele"
              />
            </div>
            <p>{`${totalReviews} Reviews`}</p>
          </div>
          <p className="descriptionpara">{description}</p>
          <p>
            Available Stock: <span>{availability}</span>{' '}
          </p>
          <p>
            Brand: <span>{brand}</span>
          </p>
          <hr />
          <div className="plusminusbuttoncontainer">
            <button
              type="button"
              data-testid="plus"
              className="plus_minusbtnsty"
              onClick={this.increaseQuantity}
            >
              <BsPlusSquare />
            </button>
            <p>{Quantity}</p>
            <button
              type="button"
              data-testid="minus"
              className="plus_minusbtnsty"
              onClick={this.decreaseQuantity}
            >
              <BsDashSquare />
            </button>
          </div>
          <button type="button" className="addtocartbutton">
            ADD TO CART
          </button>
        </div>
      </div>
    )
  }

  renderloder = () => (
    <div data-testid="loader" className="lodercontainer">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  returntoproductpage = () => {
    const {history} = this.props
    history.push('/products')
  }

  renderfilurepage = () => (
    <div className="failurecontainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="failureimg"
      />
      <h1>Product Not Found</h1>
      <button
        type="button"
        className="continueshopiingbutton"
        onClick={this.returntoproductpage}
      >
        Continue Shopping
      </button>
    </div>
  )

  getSpecificPage = () => {
    const {similarProducts} = this.state
    return (
      <div className="mainspcontainer">
        {this.renderProductPage()}
        <SimilarProductspage similarProducts={similarProducts} />
      </div>
    )
  }

  getPages = () => {
    const {apistatus} = this.state

    switch (apistatus) {
      case apiStatusConstants.inProgress:
        return this.renderloder()
      case apiStatusConstants.success:
        return this.getSpecificPage()
      case apiStatusConstants.failure:
        return this.renderfilurepage()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="product-sections-specific">
        <Header />
        {this.getPages()}
      </div>
    )
  }
}

export default ProductItemDetails
