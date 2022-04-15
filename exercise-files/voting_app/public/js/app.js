
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  // here, the state.products are filled upon componentDidMount
  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  // function to be called when a product is upvoted
  handleProductUpVote(productId) {
    console.log(productId + ' was upvoted.');
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
  
  //  
  constructor(props) {
    // by calling super(), we are calling the constructor of the parent class
    super(props);
    // this is how we bind the handleUpVote function to the component (but it's not defined here??)
    this.handleUpVote = this.handleUpVote.bind(this);
  }

  // on "click," React invokes this function
  // handleUpVote invokes the props.onVote, which lives inside the Parent and calls console.log()
  handleUpVote() {
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
