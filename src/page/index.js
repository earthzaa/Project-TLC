import React, { Component } from 'react'
import FiniteState from '../components/FiniteState/index2'
import VendorMachine from '../components/VendorMachine'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputSting: []
    }

    this.renderCommandGroup = this.renderCommandGroup.bind(this)
    this.__onChangeInputString = this.__onChangeInputString.bind(this)
  }

  __onChangeInputString(value = []) {
    this.setState({
      inputSting: value
    })
  }

  printState() {
    const { inputSting } = this.state

    return inputSting.map((item, index) => item + (index < inputSting.length - 1 ? ', ' : ''))
  }

  renderCommandGroup() {
    return (
      <div>
        <div className='display'>
          <div className='command'>
            <h3>FOR-USER: </h3>
            <div className='show-text'>
              <label> > </label>
              <label>{this.printState()}</label>
              <label className='blinking'>| </label>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { inputSting } = this.state

    return(
      <div className='index-page'>
        <div className='alert-text'>
          <h1>{`** open in Chrome for best look **`}</h1>
        </div>
        {this.renderCommandGroup()}
        <VendorMachine onChange={this.__onChangeInputString}/>
        <FiniteState input={inputSting}/>
      </div>
    )
  }
}

export default Index