import React, { Component } from 'react';
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
                let PTFlash = res.data

                // console log pt
                console.log(PTFlash)
            })

            // console log error
            .catch(err => {
                console.log('ERROR')
            })
    }

    render() {
        let pleaseWork = this.state.listOfElements.map(pt => {
            return(
                <li className="pt">
                    {pt.symbol}: {pt.name}
                </li>
            )
        })
        return(
            <div>
                <div className="card">
                    
                </div>

                {/* <ul className="pt">
                    {pleaseWork}
                </ul> */}
            </div>
        )
    }
}

export default Home;