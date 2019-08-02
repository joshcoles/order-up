import React, { Component } from 'react';
import axios from 'axios';
import Order from './components/Order/Order.js';
import './styles/App.scss';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      orders: [],
      filterText: '',
      orderByEarliest: true,
      headingText: 'Order Up',
      placeholderText: 'Filter by worker name...',
      defaultChecked: false
    }

    this.toggleClickHandler = this.toggleClickHandler.bind(this);
  }

  componentDidMount() {

    // Fetch list of work orders and update state
    axios.get('http://localhost:8080/work_orders')
      .then(response => {
        this.setState({ orders: response.data.orders });
      });
  }

  // Handle sort direction and state of <input> element
  toggleClickHandler() {
    this.setState({ 
      orderByEarliest: !this.state.orderByEarliest,
      defaultChecked: !this.state.defaultChecked
     });
  }

  render() {

    // Update filter text on keyup in input
    const updateFilterText = (e) => {
      this.setState({ filterText: e.target.value });  
    }

    // Sort orders differently according to this.state.orderByEarlist value
    let sortedArray = this.state.orders.sort((a, b) => {
      return this.state.orderByEarliest ? a.deadline - b.deadline : b.deadline - a.deadline;
    });

    // Once sorted, map over orders and store in orders variable
    const orders = sortedArray.map((order) => {
      return <Order key={order.id} filterText={this.state.filterText} order={order}></Order>
    });

    return (
      <div>
        <div className="ou-outer-container">
          <h1 data-text={this.state.headingText}>{this.state.headingText}</h1>
        </div>
        <div className="ou-outer-container ou-options-container">
          <div className="ou-filter-container">
            <input type="text" placeholder={this.state.placeholderText} onKeyUp={updateFilterText}/>
          </div>
          <div className="ou-toggle-container">
            <span className="ou-earliest">Earliest First</span>
            <div className="ou-toggle">
              <input defaultChecked={this.state.defaultChecked} onClick={this.toggleClickHandler} type="checkbox" id="switch" /><label htmlFor="switch">Toggle</label>
            </div>
            <span className="ou-latest">Latest First</span>
          </div>
        </div>
        <section className="ou-outer-container ou-orders-container">
          {orders}
        </section>
      </div>
    )
  }
}

export default App;
