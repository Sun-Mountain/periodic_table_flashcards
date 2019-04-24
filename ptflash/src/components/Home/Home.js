import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

class Home extends Component {

    constructor() {
        super()

        this.state = {
            atomicNumber: '',
            symbol: '',
            name: ''
        }

        this.getPeriodicTable = this.getPeriodicTable.bind(this)
    }

    componentDidMount() {
        this.getPeriodicTable(this.state)

        console.log(this.state)
    }

    getPeriodicTable() {
        const Url = 'https://neelpatel05.pythonanywhere.com'

        // fetch periodic table api in array
        axios.get(Url)
            .then(res => {
                let updateList = res.data
                
                let currentElement = updateList[0]

                console.log(currentElement)

                this.setState({
                    atomicNumber: currentElement.atomicNumber,
                    symbol: currentElement.symbol,
                    name: currentElement.name
                })

                console.log(this.state)
            })

            // console log error
            .catch(err => {
                console.log('ERROR')
            })
    }

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

export default Home;