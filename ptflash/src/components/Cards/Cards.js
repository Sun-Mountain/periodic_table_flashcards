import React, { Component } from 'react';
import './Cards.css';

class Cards extends Component {

    render() {
        return(
            <div className="flashcard">
                <div className="card">
                    <div id="atom-num">{this.state.atomicNumber}</div>
                    <div id="atom-sym">{this.state.symbol}</div>
                    <div id="atom-name">{this.state.name}</div>
                </div>

                <div className="links">
                    <div>Previous</div>
                    <div>Next</div>
                </div>
            </div>
        )
    }
}

export default Cards;