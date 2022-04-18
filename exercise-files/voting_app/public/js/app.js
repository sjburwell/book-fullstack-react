
class ProductList extends React.Component {
  
  // Can drop constructor() because converting below to arrow functions, and using transform-class-properties
  state = {
    products: [],
  };

  // here, the state.products are filled upon componentDidMount
  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  // function to be called when a product is upvoted
  handleProductUpVote = (productId) => {
    // find the product with the given id
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    // set the state to the new products array
    this.setState({ products: nextProducts });
  }

  render() {
    // addition of sort will be mutable, which can be dangerous but explained later
    // sort by votes, descending - but here, no Seed data is available, so need to setState!
    const products = this.state.products.sort((a, b) => (
      b.votes - a.votes
    ));
    const productComponents = products.map((product) => (
      <Product 
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitterAvatarUrl={product.submitterAvatarUrl}
          productImageUrl={product.productImageUrl}
          onVote={this.handleProductUpVote}
        />
    )
    );
    return (
      <div className="ui unstackable items">
        {productComponents}
      </div>
    );
  }
}


class Product extends React.Component {
  
  // can drop constructor(), because converting below to arrow functions, and using transform-class-properties 

  // on "click," React invokes this function
  // handleUpVote invokes the props.onVote, which lives inside the Parent and calls console.log()
  // having transform-class-properties and the below ARROW function, the above constructor() is not needed
  handleUpVote = () => {
    this.props.onVote(this.props.id);
  }

  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
              <a onClick={this.handleUpVote}> 
                  <i className='large caret up icon' /> 
              </a>
              {this.props.votes}
          </div>
          <div className='description'>
              <a href={this.props.url}>
                  {this.props.title}
              </a>
              <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
