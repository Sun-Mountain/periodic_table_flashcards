import React, { Component } from 'react';
import './Cards.css';
import axios from 'axios';

class Cards extends Component {

    constructor(props) {
        super(props)

        this.state = {
            elementArray: [],
            arrayIndex: 1,
            currentAtomicNumber: '',
            currentSymbol: '',
            currentName: '',
            guess: 'Guess'
        }

        this.getPeriodicTable = this.getPeriodicTable.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
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
                console.log('add')
            }

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

                console.log('yay!')
            }
        }

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

            </div>
        )
    }
}

export default Cards;