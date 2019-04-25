import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            elementArray: [],
            arrayIndex: 0,
            currentAtomicNumber: '',
            currentSymbol: '',
            currentName: ''
        }

        this.getPeriodicTable = this.getPeriodicTable.bind(this)
        this.addOne = this.addOne.bind(this)
        this.subOne = this.subOne.bind(this)
    }

    componentDidMount() {
        this.getPeriodicTable(this.state)
    }

    getPeriodicTable() {
        const Url = 'https://neelpatel05.pythonanywhere.com'

        const arrayIndex = this.state.arrayIndex

        // fetch periodic table api in array
        axios.get(Url, arrayIndex)
            .then(res => {
                let updateList = res.data

                let currentElement = updateList[arrayIndex]

                console.log(currentElement)

                this.setState({
                    elementArray: updateList,
                    currentAtomicNumber: currentElement.atomicNumber,
                    currentSymbol: currentElement.symbol,
                    currentName: currentElement.name
                })

                // console.log(this.state)
            })

            // console log error
            .catch(err => {
                console.log('ERROR')
            })

    }

    addOne() {

        this.setState(prevState => {
            let newIndex = prevState.arrayIndex + 1

            let newElement = prevState.elementArray[newIndex]

            return {
                arrayIndex: newIndex,
                currentAtomicNumber: newElement.atomicNumber,
                currentSymbol: newElement.symbol,
                currentName: newElement.name
            }
        })
        
        console.log(this.state)
    }

    subOne() {

        this.setState(prevState => {
            let newIndex = prevState.arrayIndex - 1

            let newElement = prevState.elementArray[newIndex]

            return {
                arrayIndex: newIndex,
                currentAtomicNumber: newElement.atomicNumber,
                currentSymbol: newElement.symbol,
                currentName: newElement.name
            }
        })
        
        console.log(this.state)
    }

    render() {

        return(
            <div className="flashcard">

                <div className="card">
                    <div id="atom-num">{this.state.currentAtomicNumber}</div>
                    <div id="atom-sym">{this.state.currentSymbol}</div>
                    <div id="atom-name">{this.state.currentName}</div>
                </div>

                <div className="buttons">
                    <button onClick={this.subOne}>Previous</button>
                    <button onClick={this.addOne}>Next</button>
                </div>
            </div>
        )
    }
}

export default Home;