// the React library was already imported as a script in the index.html file

// this defines the Component
class ProductList extends React.Component {
  render() {
    return (
      <div className='ui unstackable items'>
        Hello, friend! I am a basic React component.
      </div>
    );
  }
}

// This renders the component, without it, the JSX code won't work
// The first argument specifies the target element in the index.html file (i.e., WHAT)
// The second argument specifies the component to render (i.e., WHERE), i.e., in the "content" div of the index.html file
ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);