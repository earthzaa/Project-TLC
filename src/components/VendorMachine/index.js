import React, { Component } from 'react'

class VendorMachine extends Component {
  constructor(props) {
    super(props)
    this.renderMonitor = this.renderMonitor.bind(this)
  }

  renderSystemGuide() {
    return (
      <div className='guide glass'>
        <h3 className='w-100 text-center'>SYSTEM GUIDE</h3>
        <div>Step 1: Soup</div>
        <div>Step 2: Noodle</div>
        <div>Step 3: Toping</div>
        <div>Step 4: Pay</div>
      </div>
    )
  }

  renderMonitor() {
    return (
      <div className='monitor glass'>
        <h1 className='w-100'>Select Ramen !!</h1>
        <div className='console'>
          <div className='payment'>
            <div className='money'>
              <div>20</div>
              <div>50</div>
            </div>
            <div className='money'>
              <div>100</div>
              <div>500</div>
            </div>
            <div className='money'>
              <div>1000</div>
            </div>
          </div>
          <div className='exchange'>
            <div>Money</div>
            <div>Change</div>
          </div>
        </div>
      </div>
    )
  }

  renderStep1() {
    return (
      <div className='step'>
        <div className='title'>
          <h2>Step 1</h2>
        </div>
        <div className='menu'>
          <div className='sub-menu'>
            <div className='img-menu'>1</div>
            <label className='btn'></label>
          </div>
          <div className='sub-menu'>
            <div className='img-menu'>1</div>
            <label className='btn'></label>
          </div>
          <div className='sub-menu'>
            <div className='img-menu'>1</div>
            <label className='btn'></label>
          </div>
        </div>
      </div>
    )
  }

  renderStep2() {
    return (
      <div className='step'>
        <div className='title'>
          <h2>Step 2</h2>
        </div>
        <div className='menu'>
          <div className='sub-menu'>
            <div className='img-menu'>1</div>
            <label className='btn'></label>
          </div>
          <div className='sub-menu'>
            <div className='img-menu'>1</div>
            <label className='btn'></label>
          </div>
          <div className='sub-menu'>
            <div className='img-menu'>1</div>
            <label className='btn'></label>
          </div>
        </div>
      </div>
    )
  }

  renderStep3() {
    return (
      <div className='step'>
        <div className='title'>
          <h2>Step 3</h2>
        </div>
        <div className='menu'>
          <div className='sub-menu'>
            <div className='img-menu'>1</div>
            <label className='btn'></label>
          </div>
          <div className='sub-menu'>
            <div className='img-menu'>1</div>
            <label className='btn'></label>
          </div>
        </div>
      </div>
    )
  }

  renderDropRamen() {
    return (
      <div className='drop-ramen'>

      </div>
    )
  }

  render() {
    return(
      <div className='vendor-machine'>
        <div className='machine'>
          <div className='head'>
            {this.renderSystemGuide()}
            {this.renderMonitor()}
          </div>
          {this.renderStep1()}
          {this.renderStep2()}
          {this.renderStep3()}
          {this.renderDropRamen()}
        </div>
      </div>
    )
  }
}

export default VendorMachine