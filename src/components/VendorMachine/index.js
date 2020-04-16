import React, { Component } from 'react'

const ramenPic = require('../../static/images/ramen.png')

class VendorMachine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adviseText: 'Ramen Vendor Machine !!',
      warning: false,
      selected: ['', '', ''],
      stepMenu: [
        [
          { menu: 'Size-L', pic: ramenPic },
          { menu: 'Size-M', pic: ramenPic },
          { menu: 'Size-S', pic: ramenPic },
        ],
        [
          { menu: 'Noodle-L', pic: ramenPic },
          { menu: 'Noodle-M', pic: ramenPic },
          { menu: 'Noodle-S', pic: ramenPic },
        ],
        [
          { menu: 'Top A', pic: ramenPic },
          { menu: 'Top B', pic: ramenPic }
        ]
      ],
      readyRamen: false,
      submit: false
    }

    this.menuSelected= this.menuSelected.bind(this)
    this.renderMonitor = this.renderMonitor.bind(this)
    this.renderStep = this.renderStep.bind(this)
    this.renderSubStep = this.renderSubStep.bind(this)
    this.toggleSubmit = this.toggleSubmit.bind(this)
    this.resetMachine = this.resetMachine.bind(this)
    this.generateRamen = this.generateRamen.bind(this)
    this.removeRamen = this.removeRamen.bind(this)
    this.setTimeWarning = this.setTimeWarning.bind(this)
  }

  resetMachine() {
    this.setState({
      adviseText: 'Ramen Vendor Machine !!',
      selected: ['', '', ''],
      submit: false,
      warning: false
    })
  }

  toggleSubmit() {
    const { selected } = this.state

    if(selected.filter((item) => item === '').length === 0) {
      this.setState((prevState) => ({
        submit: !prevState.submit
      }), this.generateRamen)
    }
    else {
      this.setState({
        adviseText: 'Following Guide !!',
        warning: true
      }, this.setTimeWarning)
    }
  }

  generateRamen() {
    const { submit } = this.state
    
    if(submit) {
      this.setState({
        readyRamen: true,
        adviseText: 'Pick up Ramen !!'
      })
      setTimeout(this.resetMachine, 3500)
    }
  }

  setTimeWarning() {
    setTimeout(() => {
      this.setState({
        adviseText: 'Ramen Vendor Machine !!',
        warning: false
      })
    }, 3000)
  }

  removeRamen() {
    this.setState({
      readyRamen: false
    })
  }

  menuSelected(event) {
    const { id } = event.target
    let { selected } = this.state
    const group = this.findGroup(id)

    if(group > 0) {
      if(selected[group - 1] === '') {
        this.toggleSubmit()
      }
      else {
        selected[group] = id

        this.setState({
          selected
        })
      }
    }
    else {
      selected[group] = id
      
      this.setState({
        selected
      })
    }

    
  }

  findGroup(name = '') {
    name = name.toLocaleLowerCase()

    if(name.includes('size')) return 0
    else if(name.includes('noodle')) return 1
    else if(name.includes('top')) return 2
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
    const { submit, adviseText, warning } = this.state

    return (
      <div className='monitor glass'>
        <h1 className={`w-100 ${submit ? 'success-blink' : warning ? 'warning-blink' : 'first-title'}`}>{adviseText}</h1>
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
            <div className={`primary ${submit ? 'selected-menu' : ''}`} onClick={this.toggleSubmit}>Pay</div>
            <div className='primary'>Change</div>
            <div className='secondary' onClick={this.resetMachine}>
              <div>reset</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderStep() {
    const { stepMenu } = this.state

    return(
      <div>{
        stepMenu.map(this.renderSubStep)
      }</div>
    )
  }

  renderSubStep(groupMenu = [], index = 0) {
    const { selected } = this.state

    return (
      <div className='step' key={`Step-${index}`}>
        <div className={`title ${selected[index] !== '' ? 'selected-menu' : ''}`}>
          <h2>{`Step ${index + 1}`}</h2>
        </div>
        <div className='menu'>{
          groupMenu.map((item) => {
            const { menu, pic } = item

            return (
              <div className='sub-menu' key={menu}>
                <div className='img-menu'>
                  <img src={pic} />
                  <label>{menu}</label>
                </div>
                <div>
                  <div className={`circle ${selected[index] === menu ? 'selected-menu' : ''}`}></div>
                  <div className='btn' id={menu} onClick={this.menuSelected}></div>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }

  renderDropRamen() {
    const { readyRamen } = this.state

    return (
      <div className='drop-ramen' onMouseLeave={this.removeRamen}>
        <div className='cover'></div>
        <img 
          className={`ramen ${readyRamen ? 'visible' : 'hide'}`}
          src={ramenPic}
        />
      </div>
    )
  }

  render() {
    const { submit } = this.state

    return(
      <div className='vendor-machine'>
        <div className={`machine ${submit ? 'shake' : ''}`}>
          <div className='head'>
            {this.renderSystemGuide()}
            {this.renderMonitor()}
          </div>
          {this.renderStep()}
          {this.renderDropRamen()}
        </div>
      </div>
    )
  }
}

export default VendorMachine