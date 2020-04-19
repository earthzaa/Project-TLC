import React, { Component } from 'react'

const ramenPic = require('../../static/images/ramen.png')

class VendorMachine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputString: [],
      adviseText: 'Ramen Vendor Machine !!',
      warning: false,
      selected: [ '', '', ['', ''] ],
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
      isReadyRamen: false,
      submit: false,
      totalPrice: 0,
      receiveMoney: 0
    }

    this.onSelectedMenu= this.onSelectedMenu.bind(this)
    this.renderMonitor = this.renderMonitor.bind(this)
    this.renderStep = this.renderStep.bind(this)
    this.renderSubStep = this.renderSubStep.bind(this)
    this.validateMenu = this.validateMenu.bind(this)
    this.resetMachine = this.resetMachine.bind(this)
    this.prepareRamen = this.prepareRamen.bind(this)
    this.removeRamen = this.removeRamen.bind(this)
    this.resetWarning = this.resetWarning.bind(this)
    this.hadSelectedMenu = this.hadSelectedMenu.bind(this)
    this.pushInputString = this.pushInputString.bind(this)
    this.__onClickReset = this.__onClickReset.bind(this)
    this.__onChangeMoney = this.__onChangeMoney.bind(this)
  }

  resetMachine() {
    const { submit, inputString } = this.state

    this.setState({
      adviseText: 'Ramen Vendor Machine !!',
      selected: ['', '', ['', '']],
      submit: false,
      warning: false,
      totalPrice: 0,
      receiveMoney: 0,
      inputString: submit ? [] : inputString
    })
  }

  validateMenu() {
    const { selected, receiveMoney, totalPrice, warning } = this.state
    const isEnough = receiveMoney >= totalPrice
    const isComplete = selected.filter((item) => item === '').length === 0

    if(isComplete && isEnough && !warning) {
      this.setState({
        submit: true
      }, this.prepareRamen)
    }
    else {
      this.setState({
        adviseText: !isEnough && (isComplete || warning) ? 'Money is not enough' : 'Following Guide !!',
        warning: true
      }, this.resetWarning)
    }
  }

  prepareRamen() {
    const { submit } = this.state
    
    if(submit) {
      this.pushInputString('Submit')
      this.setState({
        isReadyRamen: true,
        adviseText: 'Pick up Ramen !!'
      })
      setTimeout(this.resetMachine, 3500)
    }
  }

  resetWarning() {
    setTimeout(() => {
      this.setState({
        adviseText: 'Ramen Vendor Machine !!',
        warning: false
      })
    }, 3000)
  }

  removeRamen() {
    this.setState({
      isReadyRamen: false
    })
  }

  __onClickReset() {
    const { inputString } = this.state
    let findSubmit = false

    try{
      findSubmit = inputString[inputString.length - 1].toLowerCase()
    }
    catch(error){

    }

    if(inputString.length === 0) {
      this.props.onChange(['Reset'])
      this.props.reset()
    }
    else this.pushInputString('Reset')

    this.resetMachine()
  }

  onSelectedMenu(event) {
    const { warning } = this.state
    if(warning) return 

    const { id } = event.target
    let { selected } = this.state
    const group = this.findGroup(id)

    if(group > 0) {
      if(selected[group - 1] === '') {
        this.validateMenu()
      }
      else {
        this.hadSelectedMenu(group, id)
      }
    }
    else {
      this.hadSelectedMenu(group, id)
    }  
  }

  hadSelectedMenu(groupMenu = 0, value = '') {
    let { selected } = this.state
    const { stepMenu } = this.state

    if(selected[groupMenu] === '' || groupMenu === 2) {
      if(groupMenu < 2) selected[groupMenu] = value
      else {
        const subGroup = stepMenu[groupMenu].findIndex((item) => item.menu.toLowerCase() === value.toLowerCase())
        const targetArr = selected[groupMenu][subGroup]
        selected[groupMenu][subGroup] = targetArr !== '' ? '' : value

        if(targetArr !== '') value += '-'
      }

      this.pushInputString(value)

      this.setState((prevState) => ({
        selected,
        totalPrice: prevState.totalPrice + this.toPrice(value)
      }))
    }
  }

  findGroup(name = '') {
    name = name.toLowerCase()

    if(name.includes('size')) return 0
    else if(name.includes('noodle')) return 1
    else if(name.includes('top')) return 2
  }

  pushInputString(value = '') {
    let { inputString } = this.state
    inputString.push(value)

    this.setState({
      inputString
    }, () => this.props.onChange(inputString))
  }

  toPrice(value = '') {
    value = value.toLowerCase()

    switch(value) {
      default:
      case 'reset': return 0
      case 'submit': return 0
      case 'size-l': return 50
      case 'size-m': return 40
      case 'size-s': return 30
      case 'noodle-l': return 15
      case 'noodle-m': return 10
      case 'noodle-s': return 5
      case 'top a': return 5
      case 'top b': return 10
      case 'top a-': return -5
      case 'top b-': return -10
    }
  }

  __onChangeMoney(price = 0) {
    const { warning } = this.state
    if(warning) return 

    let { receiveMoney } = this.state

    receiveMoney += price
    this.setState({
      receiveMoney
    })
  }

  renderSystemGuide() {
    return (
      <div className='guide glass'>
        <h3 className='w-100 text-center'>SYSTEM GUIDE</h3>
        <div>Step 1: Soup</div>
        <div>Step 2: Noodle</div>
        <div>Step *: Toping</div>
        <div>Step 3: Insert Money</div>
        <div>Step 4: Pay</div>
        <div>* optional, can skip</div>
      </div>
    )
  }

  renderMonitor() {
    const { submit, adviseText, warning, selected, totalPrice, receiveMoney } = this.state

    return (
      <div className='monitor glass'>
        <h1 
          className={`w-100 monitor-text ${submit ? 
            'success-blink' 
            : 
            selected[0] !== '' && !warning ?
              ''
            :
              warning ? 'warning-blink' 
              : 'first-title' }
        `}>
          <div className='inside-text'>
            <div>{selected[0] === '' || warning || submit ? adviseText : `Total: ${totalPrice} Bath`}</div>
            <div>{selected[0] !== '' && !warning && !submit ? `Insert: ${receiveMoney} Bath` : ''}</div>
          </div>
        </h1>
        <div className='console'>
          <div className='payment'>
            <div className='money'>
              <div onClick={() => this.__onChangeMoney(5)}>5</div>
              <div onClick={() => this.__onChangeMoney(10)}>10</div>
            </div>
            <div className='money'>
              <div onClick={() => this.__onChangeMoney(20)}>20</div>
              <div onClick={() => this.__onChangeMoney(50)}>50</div>
            </div>
            <div className='money'>
              <div onClick={() => this.__onChangeMoney(100)}>100</div>
            </div>
          </div>
          <div className='exchange'>
            <div className={`primary ${submit && 'selected-menu'}`} onClick={this.validateMenu}>Pay</div>
            <div className='primary'>Change</div>
            <div className='secondary' onClick={this.__onClickReset}>
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
    const activeTitleStatus = (index < 2 && selected[index].length !== 0) || (index === 2 && selected[index].filter((item) => (item !== '')).length > 0)

    return (
      <div className='step' key={`Step-${index}`}>
        <div 
          className={`title 
            ${activeTitleStatus && 'selected-menu' }
          `}>
          <h2>{`Step ${index + 1}`}</h2>
        </div>
        <div className='menu'>{
          groupMenu.map((item, itemIndex) => {
            const { menu, pic } = item
            const activeMenuStatus = (index < 2 && selected[index] === menu) || (index === 2 && selected[index][itemIndex] === menu)

            return (
              <div className='sub-menu' key={menu}>
                <div className='img-menu'>
                  <img src={pic} />
                  <label>{menu}</label>
                </div>
                <div>
                  <div 
                    className={`circle ${ activeMenuStatus && 'selected-menu'}`}></div>
                  <div className={`btn ${index === 2 && 'hover-red'} ${activeMenuStatus ? 'selected-menu' : (!activeTitleStatus || index === 2) && 'hover-red'}`} id={menu} onClick={this.onSelectedMenu}></div>
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
    const { isReadyRamen } = this.state

    return (
      <div className='drop-ramen' onMouseLeave={this.removeRamen}>
        <div className='cover'></div>
        <h1 className='text'>PUSH</h1>
        <img 
          className={`ramen ${isReadyRamen ? 'visible' : 'hide'}`}
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