// Feature 1
import { Component } from "react";
import data from "./data.json";


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: data.products,
      size: '',
      sort: ''
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="/">
            React Shopping Cart
        </a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              Product
            </div>
            <div className="sidebar">
              Cart items
            </div>
          </div>
        </main>
        <footer>
          All Rights Reserved
        </footer>
      </div>
    );
  }
}

export default App;
