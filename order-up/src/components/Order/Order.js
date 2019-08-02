import React, { Component } from 'react';
import axios from 'axios';
import './Order.scss';

class order extends Component {

  constructor(props) {
    super(props);

    this.state = {
      worker: {}
    }
  }

  componentDidMount() {

    // Fetch worker data by workerId, which we get from props
    axios.get(`http://localhost:8080/workers/${this.props.order.workerId}`)
      .then(response => {
        const worker = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          companyName: response.data.companyName,
          image: response.data.image
        }

        // Set new worker data as 
        this.setState({ worker });
      });
  }

  // Calculate date then return object with preformatted values
  formatDate() {
      const deadlineUnix = new Date(this.props.order.deadline);
      const nineteenSeventy = new Date(0);
      const deadlineDateObject = new Date(nineteenSeventy.setUTCSeconds(deadlineUnix));
      
      return {
        year: deadlineDateObject.getFullYear(),
        month: deadlineDateObject.getMonth(),
        day: deadlineDateObject.getDay(),
        time: deadlineDateObject.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      }
  }

  render () {

    const date = this.formatDate();

    // Order is 'valid' if 'filter text' from input in <App> is included in worker name
    const isValid = typeof this.state.worker.name !== 'undefined' && this.state.worker.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) > -1;
    
    // Each order gets a background gradient with a different direction
    const randomGradient = `linear-gradient(${Math.floor(Math.random()*(360-1+1)+1)}deg, rgba(125,101,255,1) 0%, rgba(255,125,101,0.9094012605042017) 100%)`;

    return isValid ? (
      <div style={{backgroundImage: randomGradient}} className="ou-order">
        <div className="ou-order-info">
          <span>{this.props.order.name}</span>
          <p>{this.props.order.description}</p>
        </div>
        <div className="ou-worker-info">
          <img className="ou-worker-image" alt={this.state.worker.image} src={this.state.worker.image}/>
          <div>
            <h2>{this.state.worker.name}</h2>
            <span>{this.state.worker.companyName}</span>
            <span>{this.state.worker.email}</span>
          </div>
        </div>
        <span className="ou-date">{date.month}/{date.day}/{date.year} - {date.time}</span>
      </div>
    ) : ('');
  }
}

export default order;