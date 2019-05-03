import React, { Component } from 'react';
import './Cards.css';
import axios from 'axios';

class Cards extends Component {

    constructor(props) {
        super(props)

        this.state = {
            elementArray: [],
            arrayIndex: 0,
            currentAtomicNumber: '',
            currentSymbol: '',
            currentName: '',
            guess: 'Guess'
        }

        this.getPeriodicTable = this.getPeriodicTable.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
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

                // console.log(currentElement)

                this.setState({
                    elementArray: updateList,
                    arrayIndex: 0,
                    currentAtomicNumber: currentElement.atomicNumber,
                    currentSymbol: currentElement.symbol,
                    currentName: currentElement.name
                })

                console.log(this.state)
            })

            // console log error
            .catch(err => {
                console.log('ERROR')
            })

    }

    handleFormSubmit(event) {
        event.preventDefault()

        const button = this.state.guess

        if (button === 'Correct!') {

            this.setState(prevState => {
                console.log(prevState.arrayIndex)

                let newIndex = prevState.arrayIndex + 1

                console.log(newIndex)

                let newElement = prevState.elementArray[newIndex]

                console.log(newElement)

                return {
                    arrayIndex: newIndex,
                    currentAtomicNumber: newElement.atomicNumber,
                    currentSymbol: newElement.symbol,
                    currentName: newElement.name,
                    guess: 'Guess'
                }
            })

            console.log('next!')

        } else {
            const answer = event.target.elements.answer.value.toLowerCase()
            const element = this.state.currentName.toLowerCase()

            console.log(answer)
            
            if (answer !== element) {

                this.setState({
                    guess: 'Guess Again'
                })

                console.log('nah')
            } else {

                this.setState({
                    guess: 'Correct!'
                })

                console.log(this.state.guess)
                console.log('yay - changed')
            }
        }

    }


    randomize() {
        let oldElementArray = this.state.elementArray
        // console.log(oldElementArray[0])

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

        this.setState({
            elementArray: newElementArray,
            arrayIndex: 0,
            currentAtomicNumber: newStart.atomicNumber,
            currentSymbol: newStart.symbol,
            currentName: newStart.name
        })

        console.log('random!')
    }

    render() {

        return(
            <div className="flashcard">

                <div className="card">
                    <div id="atom-num">{this.state.currentAtomicNumber}</div>
                    <div id="atom-sym">{this.state.currentSymbol}</div>
                    <form onSubmit={(event) => this.handleFormSubmit(event)}>
                        <label>
                            <input name="answer" className="guess-form" placeholder="Guess the Element" value={this.answer} />
                        </label>
                        <input className="guess-button" type="submit" value={this.state.guess} />
                    </form>
                </div>

                <div className="buttons">
                    <button onClick={this.randomize}>Random</button>
                </div>

            </div>
        )
    }
}

export default Cards;