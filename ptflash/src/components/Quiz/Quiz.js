import React, { Component } from 'react';
// import { Route, Link, Switch } from 'react-router-dom';
import './Quiz.css';
import axios from 'axios';

class Quiz extends Component {

    constructor() {
        super()

        this.state = {
            elementArray: [],
            arrayIndex: 0,
            currentAtomicNumber: '',
            currentSymbol: '',
            currentName: '',
            guess: 'Guess',
            skipCount: 0,
            guessCount: 0
        }

        this.getPeriodicTable = this.getPeriodicTable.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.addOne = this.addOne.bind(this)
        this.subOne = this.subOne.bind(this)
        this.randomize = this.randomize.bind(this)
        this.reset = this.reset.bind(this)
        this.clearPlaceholder = this.clearPlaceholder.bind(this)
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
                    currentName: currentElement.name,
                    guess: 'Guess',
                })

                // console.log(this.state)
            })

            // console log error
            .catch(err => {
                console.log('ERROR')
            })

    }

    handleFormSubmit(event) {
        event.preventDefault()

        const button = this.state.guess

        if (button === 'Correct! Next >>') {

            this.addOne()

            // console.log('next!')

        } else {
            const answer = event.target.elements.answer.value.toLowerCase()
            const element = this.state.currentName.toLowerCase()

            // console.log(answer)
            
            if (answer !== element) {

                this.setState({
                    guess: 'Guess Again'
                })

                // console.log('nah')
            } else {

                this.setState({
                    guess: 'Correct! Next >>'
                })

                console.log(this.state.guess)
                // console.log('yay - changed')
            }
        }

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
                    currentName: newElement.name,
                    guess: 'Guess'
                }
            })

            this.clearPlaceholder()

            // console.log('add')
        }
    }

    subOne() {
        const currentArrayIndex = this.state.arrayIndex

        if(currentArrayIndex===0) {
            // console.log('nah')
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

            this.clearPlaceholder()

            // console.log('sub')
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

        this.clearPlaceholder()

        console.log('random!')
    }

    reset() {
        this.getPeriodicTable()
        this.clearPlaceholder()
    }

    clearPlaceholder() {
        document.getElementById("answer").reset();
    }

    render() {

        return(
            <div>
                {/* <nav id="nav-quiz">
                    <Link to="/quiz" className="nav-quiz-link">
                        <h3>Element Name</h3>
                    </Link>
                    <Link to="/quiz" className="nav-quiz-link">
                        <h3>Element Symbol</h3>
                    </Link>
                </nav> */}

                <div className="element-limit">
                    <form id="number-form">
                        <input placeholder="start" />
                        <input placeholder="end" />
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                <div className="flashcard">

                    <div className="card">
                        <div id="atom-num">{this.state.currentAtomicNumber}</div>
                        <div id="atom-sym">{this.state.currentSymbol}</div>
                        <form id="answer" onSubmit={(event) => this.handleFormSubmit(event)}>
                            <label>
                                <input name="answer" className="guess-form" placeholder="Guess the Element" value={this.answer} />
                            </label>
                            <input className="button guess-button" type="submit" value={this.state.guess} />
                        </form>
                    </div>

                    <div className="buttons">
                        <button className="button" onClick={this.randomize}>Random</button>
                        <button className="button" onClick={this.reset}>Reset</button>
                        <button className="button" onClick={this.addOne}>Skip</button>
                    </div>

                    <div className="stats">
                        <div>Correct: <span id="correct-count">{this.state.guessCount}</span></div>
                        <div>Skipped: <span id="skip-count">{this.state.skipCount}</span></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Quiz;