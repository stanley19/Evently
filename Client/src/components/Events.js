import React from 'react';
import Event from './Event';
import axios from 'axios';
import "../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class Events extends React.Component{
    constructor(props){
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }
        state = {
            events: [],
            loading: true
        }

    fetchData(){
        axios.get('http://localhost:4000/api/events').then((res) => {
            this.setState({events: res.data});
            this.setState({loading: false})
        })
    }
    

    componentDidMount(){
        setInterval(this.fetchData, 10000)
    }

    render(){
        return (
          <main className="main">
            <div className="filters-tab">
              <i className="fa fa-filter" aria-hidden="true"></i> Filter{" "}
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </div>
            {this.state.loading || (
              <div className="events-label">
                {this.state.events.length} Upcoming Event
                {this.state.events.length > 1 ? "s " : " "}
                <i className="fa fa-clock" aria-hidden="true"></i>
              </div>
            )}

            <ul className="events-list">
              <div
                style={{
                  display: this.state.loading ? "block" : "none"
                }}
              >
                <Loader
                  type="BallTriangle"
                  color="#001c40"
                  height={100}
                  width={100}
                />
                <div style={{padding: '5% 0 0 1.5%',fontSize: '2.5rem', fontWeight: '700', color: '#555'}}>Loading...</div>
              </div>

              {this.state.events.map(function (event) {
                return (
                  <li key={event._id} className="event">
                    <div
                      className="color-tab"
                      style={{ background: event.color, height: 6 + "px" }}
                    ></div>
                    <Event event={event} />
                  </li>
                );
              })}
            </ul>
          </main>
        );
    }
}


export default Events;