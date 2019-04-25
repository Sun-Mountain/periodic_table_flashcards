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
        this.randomize = this.randomize.bind(this)
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
        const currentArrayIndex = this.state.arrayIndex
        const currentElementArray = this.state.elementArray
        const arrayLimit = currentElementArray.length - 1

        if (currentArrayIndex===arrayLimit) {
            console.log('nah')
        } else {
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
            console.log('add')
        }
    }

    subOne() {
        const currentArrayIndex = this.state.arrayIndex

        if(currentArrayIndex===0) {
            console.log('nah')
        } else {
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
            console.log('sub')
        }
    }

    randomize() {
        let oldElementArray = this.state.elementArray
        console.log(oldElementArray[0])

        var shuffle = function(array) {
            var currentArrayIndex = array.length
            var temporaryValue, randomIndex

            //while there remain elements
            while (0 !== currentArrayIndex) {
                // Pick a random element
                randomIndex = Math.floor(Math.random() * currentArrayIndex)
                currentArrayIndex -= 1

                // Swap it with current element
                temporaryValue = array[currentArrayIndex]
                array[currentArrayIndex] = array[randomIndex]
                array[randomIndex] = temporaryValue
            }
            return array
        }

        let newElementArray = shuffle(oldElementArray)

        const newStart = newElementArray[0]

        console.log(newStart)

        this.setState({
            elementArray: newElementArray,
            currentAtomicNumber: newStart.atomicNumber,
            currentSymbol: newStart.symbol,
            currentElement: newStart.name
        })

        console.log('random!')
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
                    <button onClick={this.randomize}>Randomize</button>
                    <button onClick={this.addOne}>Next</button>
                </div>
            </div>
        )
    }
}

export default Home;