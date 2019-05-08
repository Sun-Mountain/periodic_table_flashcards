import React, { Component } from 'react';
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
            guessSymButton: 'Guess',
            guessName: 'Guess',
            skipCount: 0,
            guessCount: 0,
            wrongCount: 0,
            arrayStart: 0,
            arrayEnd: 0,
            guessSymbol: true,
            guessElement: false
        }

        this.getPeriodicTable = this.getPeriodicTable.bind(this)
        this.handleFormSubmitName = this.handleFormSubmitName.bind(this)
        this.handleFormSubmitSymbol = this.handleFormSubmitSymbol.bind(this)

        this.addOne = this.addOne.bind(this)
        this.subOne = this.subOne.bind(this)

        this.randomize = this.randomize.bind(this)
        this.reset = this.reset.bind(this)

        this.clearPlaceholder = this.clearPlaceholder.bind(this)
        this.resetCounters = this.resetCounters.bind(this)

        this.guessElementInput = this.guessElementInput.bind(this)
        this.guessSymbolInput = this.guessSymbolInput.bind(this)
    }

    componentDidMount() {
        this.getPeriodicTable(this.state)
    }

    getPeriodicTable() {
        const Url = 'https://neelpatel05.pythonanywhere.com'

        const arrayIndex = 0

        // fetch periodic table api in array
        axios.get(Url, arrayIndex)
            .then(res => {
                let updateList = res.data

                let end = updateList.length - 1

                let currentElement = updateList[arrayIndex]

                // console.log(currentElement)

                this.setState({
                    elementArray: updateList,
                    arrayIndex: 0,
                    currentAtomicNumber: currentElement.atomicNumber,
                    currentSymbol: currentElement.symbol,
                    currentName: currentElement.name,
                    guessName: 'Guess',
                    arrayStart: 0,
                    arrayEnd: end
                })

                // console.log(updateList[end])
                // console.log(this.state)
            })

            // console log error
            .catch(err => {
                console.log('ERROR')
            })

    }

    handleFormSubmitName(event) {
        event.preventDefault()

        const button = this.state.guessName

        if (button === 'Correct! Next >>') {

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
                        guessName: 'Guess'
                    }
                })

                this.clearPlaceholder()

            // console.log('next!')
            }

        } else {
            const answer = event.target.elements.answer.value.toLowerCase()
            const element = this.state.currentName.toLowerCase()

            // console.log(answer)
            
            if (answer !== element) {

                this.setState(prevState => {

                    let newWrongCount = prevState.wrongCount + 1

                    return {
                        guessName: 'Guess Again',
                        wrongCount: newWrongCount
                    }
                })

                // console.log('nah')
            } else {

                this.setState(prevState =>{

                    let newCorrect = prevState.guessCount + 1

                    return {
                        guessName: 'Correct! Next >>',
                        guessCount: newCorrect
                    }
                })

                // console.log(this.state.guess)
                // console.log('yay - changed')
            }
        }

    }

    handleFormSubmitSymbol(event) {
        event.preventDefault()

        const button = this.state.guessSymButton

        if (button === 'Correct! Next >>') {

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
                        guessSymButton: 'Guess'
                    }
                })

                this.clearPlaceholder()

            // console.log('next!')
            }

        } else {
            const answer = event.target.elements.answer.value.toLowerCase()
            const symbol = this.state.currentSymbol.toLowerCase()

            // console.log(answer)
            
            if (answer !== symbol) {

                this.setState(prevState => {

                    let newWrongCount = prevState.wrongCount + 1

                    return {
                        guessSymButton: 'Guess Again',
                        wrongCount: newWrongCount
                    }
                })

                // console.log('nah')
            } else {

                this.setState(prevState =>{

                    let newCorrect = prevState.guessCount + 1

                    return {
                        guessSymButton: 'Correct! Next >>',
                        guessCount: newCorrect
                    }
                })

                // console.log(this.state.guess)
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

                let newSkip = prevState.skipCount + 1

                return {
                    arrayIndex: newIndex,
                    currentAtomicNumber: newElement.atomicNumber,
                    currentSymbol: newElement.symbol,
                    currentName: newElement.name,
                    guessName: 'Guess',
                    skipCount: newSkip
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
        let guessElement = this.state.guessElement
        let guessSymbol = this.state.guessSymbol

        if(guessElement || guessSymbol === true){
            document.getElementById("answer").reset();
        } else {
            console.log('nah')
        }
    }

    resetCounters() {
        this.setState({
            skipCount: 0,
            guessCount: 0,
            wrongCount: 0
        })
    }

    guessElementInput() {

        let currentGuessElement = this.state.guessElement

        if (currentGuessElement !== true) {

            this.setState({
                guessElement: true
            })

            // console.log(this.state.guessElement)

        } else {

            this.setState({
                guessElement: false
            })

            // console.log(this.state.guessElement)
        }
    }

    guessSymbolInput() {

        let currentSymbolElement = this.state.guessSymbol

        if (currentSymbolElement !== true) {

            this.setState({
                guessSymbol: true
            })

            // console.log(this.state.guessSymbol)

        } else {

            this.setState({
                guessSymbol: false
            })

            // console.log(this.state.guessSymbol)
        }
    }

    render() {

        const selectedElementButton = this.state.guessElement
        const selectedSymbolButton = this.state.guessSymbol

        return(
            <div>
                <nav id="nav-quiz">
                    <button className={selectedElementButton ? 'button-selected' : 'button'} onClick={this.guessElementInput}>Element Name</button>
                    <button className={selectedSymbolButton ? 'button-selected' : 'button'}onClick={this.guessSymbolInput}>Element Symbol</button>
                </nav>

                {/* <div className="element-limit">
                    <form id="number-form">
                        <input placeholder="start" />
                        <input placeholder="end" />
                        <input className="button" type="submit" value="Submit" />
                    </form>
                </div> */}

                <div className="flashcard">

                    <div className="card">

                        <div id="atom-num">{this.state.currentAtomicNumber}</div>

                        <div id="atom-sym">
                            {selectedSymbolButton ? 
                                <form id="answer" onSubmit={(event) => this.handleFormSubmitSymbol(event)}>
                                    <label>
                                        <input name="answer" className="guess-form-symbol" placeholder="Sym" value={this.answer} />
                                    </label>
                                    <input className="button guess-button" type="submit" value={this.state.guessSymButton} />
                                </form> :
                                <div>{this.state.currentSymbol}</div>
                            }
                        </div>

                        <div id="atom-name">
                            {selectedElementButton ?
                                <form id="answer" onSubmit={(event) => this.handleFormSubmitName(event)}>
                                    <label>
                                        <input name="answer" className="guess-form" placeholder="Guess the Element" value={this.answer} />
                                    </label>
                                    <input className="button guess-button" type="submit" value={this.state.guessName} />
                                </form> : 
                                <div>
                                    {this.state.currentName}
                                </div>
                            }
                        </div>

                    </div>

                    <div className="buttons">
                        <button className="button" onClick={this.randomize}>Random</button>
                        <button className="button" onClick={this.reset}>Reset</button>
                        <button className="button" onClick={this.addOne}>Skip</button>
                    </div>

                    <div className="stats">
                        <div>Correct: <span id="correct-count">{this.state.guessCount}</span></div>
                        <div>Wrong: <span id="wrong-count">{this.state.wrongCount}</span></div>
                        <div>Skipped: <span id="skip-count">{this.state.skipCount}</span></div>
                    </div>

                    <div className="buttons reset">
                        <button className="button" onClick={this.resetCounters}>Reset Counters</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Quiz;