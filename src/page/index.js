import React, { Component } from 'react'
import FiniteState from '../components/FiniteState'
import VendorMachine from '../components/VendorMachine'

class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className='index-page'>
        <VendorMachine/>
        <FiniteState/>
      </div>
    )
  }
}

export default Index