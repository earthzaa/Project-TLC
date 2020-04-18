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
      submit: false
    }

    this.onSelectedMenu= this.onSelectedMenu.bind(this)
    this.renderMonitor = this.renderMonitor.bind(this)
    this.renderStep = this.renderStep.bind(this)
    this.renderSubStep = this.renderSubStep.bind(this)
    this.validateMenu = this.validateMenu.bind(this)
    this.resetMachine = this.resetMachine.bind(this)
    this.prepareRamen = this.prepareRamen.bind(this)
    this.removeRamen = this.removeRamen.bind(this)
    this.onWarning = this.onWarning.bind(this)
    this.hadSelectedMenu = this.hadSelectedMenu.bind(this)
    this.pushInputString = this.pushInputString.bind(this)
    this.__onClickReset = this.__onClickReset.bind(this)
  }

  resetMachine() {
    const { submit, inputString } = this.state

    this.setState({
      adviseText: 'Ramen Vendor Machine !!',
      selected: ['', '', ['', '']],
      submit: false,
      warning: false,
      inputString: submit ? [] : inputString
    })
  }

  validateMenu() {
    const { selected } = this.state

    if(selected.filter((item) => item === '').length === 0) {
      this.setState({
        submit: true
      }, this.prepareRamen)
    }
    else {
      this.setState({
        adviseText: 'Following Guide !!',
        warning: true
      }, this.onWarning)
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

  onWarning() {
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

    if(findSubmit === 'submit') {
      this.setState({
        inputString: []
      },() => this.props.onChange([]))
    }
    else {
      if(inputString.length === 0) this.props.onChange(['Reset'])
      else this.pushInputString('Reset')
    }

    this.resetMachine()
  }

  onSelectedMenu(event) {
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

      this.setState({
        selected
      })
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

  renderSystemGuide() {
    return (
      <div className='guide glass'>
        <h3 className='w-100 text-center'>SYSTEM GUIDE</h3>
        <div>Step 1: Soup</div>
        <div>Step 2: Noodle</div>
        <div>Step * : Toping</div>
        <div>Step 3: Pay</div>
        <div>* optional, can skip</div>
      </div>
    )
  }

  renderMonitor() {
    const { submit, adviseText, warning } = this.state

    return (
      <div className='monitor glass'>
        <h1 
        className={`w-100 ${submit ? 
          'success-blink' 
          : 
          warning ? 'warning-blink' 
          : 'first-title'}`}
        >
          {adviseText}
        </h1>
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