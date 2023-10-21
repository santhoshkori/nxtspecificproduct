// Write your code here
import './index.css'

const SimilarProductspage = props => {
  const {similarProducts} = props
  return (
    <div>
      <h1>Similar Products</h1>
      <ul className="similarproductcontainer">
        {similarProducts.map(eachsimi => {
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
            id,
          } = eachsimi
          return (
            <li key={title}>
              <img
                className="similarimgpx"
                src={imageUrl}
                alt={`similar product ${title}`}
              />
              <p>{title}</p>
              <p>{brand}</p>
              <div className="simiratingcontainer">
                <p>{`Rs ${price}`}</p>
                <div className="ratingcontainer">
                  <p className="ratingsty">{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png "
                    alt="star"
                    className="spanele"
                  />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SimilarProductspage
