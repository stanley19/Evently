import React from 'react';
import {Link} from 'react-router-dom';



class Event extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            menuDropped: false,
            descriptionDropped: false
        }
    }

    dropMenu = () => {
        this.setState(function(prevState){
            return {
                menuDropped: prevState.menuDropped ? false : true
            }
        })
    }

    dropDesc = () => {
        this.setState(function (prevState) {
            return {
                descriptionDropped: prevState.descriptionDropped ? false : true
            }
        })
    }

    calcSec(duration){

         //Change inputted duration to seconds
        let sec = duration
        const day = Math.floor(sec / 86400) > 0 ? Math.floor(sec / 86400) + `Day${Math.floor(sec / 86400) > 1 ? 's ' : ' '}` : '';
        sec %= 86400;
        const hour = Math.floor(sec / 3600) > 0 ? Math.floor(sec / 3600) + `Hour${Math.floor(sec / 3600) > 1 ? 's ' : ' '}` : '';
        sec %= 3600;
        const min =Math.floor(sec / 60) > 0 ? Math.floor(sec / 60) + `Min${Math.floor(sec / 60) > 1 ? 's ' : ' '}` : '';
        sec %= 60;
        const seconds = sec > 0 ? sec + 'Sec' : '';//(Math.floor(sec / 60) == 0) ? '' : sec //: Math.floor(sec) + 'Sec' //> 0) ? Math.floor(sec) + 'sec' : ''//> 0 ? sec + 'Sec' : ''//> 0 ? sec + `second` : '';
        //${sec % 60 > 1 ? 's' : ''}` : '' ;


        const dur = day + '' + hour + '' + min + '' + seconds
        
        return dur;
    }

    render(){
       
        const event = this.props.event;
        const state = this.state;
        return (
            <div className="event-card">
                <div className="settings-tab">
                    <div className="settings-menu-btn" onClick={this.dropMenu} style={{ color: event.color }}><span className="fa fa-cogs"></span><span className={state.menuDropped ? 'fa fa-caret-up' : 'fa fa-caret-down'}></span></div>
                    <ul className="event-menu" style={
                        { maxHeight: state.menuDropped ? 800 + 'px' : 0,
                        boxShadow: state.menuDropped ? '0px 0px 7px #777' : 'none' }
                    }>
                            <li><Link to={'/addEdit/' + event._id} className="Link"><span className="fa fa-pen"></span>&ensp;<span>Edit</span></Link></li>
                            <li><span className="fa fa-trash"></span>&ensp;<span>Delete</span></li>
                            <li><span className="fa fa-copy"></span>&ensp;<span>Copy</span></li>
                            <li><span>Created: {new Date(event.createdAt).toDateString()}</span></li>
                        </ul>
                </div>
                <div className="event-name"> <i className="fa fa-link" aria-hidden="true"></i> {event.eventName}</div>
                <div className="detail event-location"><span className="fa fa-map-marker"></span>&ensp;<span> {event.location}</span></div>
                <div className="timing-section">
                    <div className="detail event-startDate"><span className="fa fa-clock"></span>&ensp;<span>{new Date(event.startDate).toLocaleDateString().replace(/\//g, '-')} @ {new Date(event.startDate).toLocaleTimeString()} {(event.notified && event.notificationEmail.length > 3) ? <i className="fa fa-bell" style={{color:'#ff9800',transform: 'rotate(-35deg)'}} aria-hidden="true"></i> : ''/*Show bell icon when event is notified*/}</span></div>
                    <div className="detail event-duration"><span className="fa fa-stopwatch"></span>&ensp;<span>{this.calcSec(event.duration)}</span></div>
                </div>
                <div className="detail attendees"><span className="fa fa-users"></span>&ensp;<span>{event.attendees} Attendee{event.attendees > 1 ? 's' : ''}</span></div>
                <div className="detail email">{event.notificationEmail.length > 3 ? <span><span className="fa fa-bell"></span>&ensp;<span className="email-address">{event.notificationEmail}</span></span> : <span>  </span>}</div>

                <div className="detail description">
                    <span onClick={this.dropDesc}>
                        Description&ensp;<span className={state.descriptionDropped ? 'fa fa-caret-up' : 'fa fa-caret-down'}></span>
                    </span>
                    <div className="description-text"
                        style={
                            {
                                height: state.descriptionDropped ? 'auto' : 0,
                            }
                        }
                    >
                        {event.description}
                    </div>
                </div>

            </div>
        )
    }
}

export default Event;