import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

class Home extends Component {

    constructor() {
        super()

        this.state = {
            listOfElements: [],
        }

        this.getPeriodicTable = this.getPeriodicTable.bind(this)
    }

    componentDidMount() {
        this.getPeriodicTable(this.state)
    }

    getPeriodicTable() {
        const Url = 'https://neelpatel05.pythonanywhere.com'

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

        // console.log(periodicTable)

        var i = 0

        const currentElement = periodicTable[i]

        console.log(currentElement)

        return(
            <div className="flashcard">
                <div className="card">
                    {/* <div id="atom-num">{currentElement.atomicNumber}</div> */}
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