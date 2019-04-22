import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

class Home extends Component {

    constructor() {
        super()

        this.state = {
            listOfElements: []
        }
    }

    componentWillMount() {
        this.getPT()
    }

    getPT() {
        const Url = 'https://neelpatel05.pythonanywhere.com/'

        // fetch periodic table api in array
        axios.get(Url)
            .then(res => {
                let updateList = res.data
                this.setState({
                    listOfElements: updateList
                })
                // console.log(this.state)
            })

            // console log error
            .catch(err => {
                console.log('ERROR')
            })
    }



    render() {
        const periodicTable = this.state.listOfElements

        console.log(periodicTable)

        // function to pull first object in periodicTable

        let currentElement = periodicTable.filter(() => {
            
        })

        console.log(currentElement)

        return(
            <div className="flashcard">
                <div className="card">
                    <div id="atom-num">{currentElement.atomicNumber}</div>
                    <div id="atom-sym">{currentElement.symbol}</div>
                    <div id="atom-name">{currentElement.name}</div>
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