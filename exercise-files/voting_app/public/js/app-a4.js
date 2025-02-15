
class ProductList extends React.Component {
  render() {
    // addition of sort will be mutable, which can be dangerous but explained later.
    // sort 
    const products = Seed.products.sort((a, b) => b.votes - a.votes);
    const productComponents = products.map((product) => (
      <Product 
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitterAvatarUrl={product.submitterAvatarUrl}
          productImageUrl={product.productImageUrl}
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
  render() {
    return (
        // must use className instead of class because class is a reserved word in javascript
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
              <a>
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
