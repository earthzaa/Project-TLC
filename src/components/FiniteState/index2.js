import React, { 
  Component 
} from 'react'

class FiniteState2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prevState: null,
      currentState: 0,
      maxState: 11
    }

    this.updateCurrentState = this.updateCurrentState.bind(this)
    this.nextState = this.nextState.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  componentDidMount() {
    this.updateCurrentState()
  }

  updateCurrentState() {
    const { currentState, prevState } = this.state
    let target = document.getElementById(currentState)

    if(prevState !== null) {
      let prevTarget = document.getElementById(prevState)
      prevTarget.setAttribute('class', '')
      prevTarget.attributes.stroke.value = 'black'
      prevTarget.attributes.fill.value = 'transparent'
    }

    if(target) {
      target.setAttribute('class', 'selected')
      target.attributes.stroke.value = 'lightgreen'
      target.attributes.fill.value = 'lightgreen'
    } 
  }

  nextState() {
    const { maxState, currentState } = this.state

    if(currentState < maxState) {
      this.setState((prevState) => ({
        prevState: prevState.currentState,
        currentState: prevState.currentState + 1
      }), this.updateCurrentState)
    }
  }

  resetState() {
    const { currentState } = this.state
    let target = document.getElementById(currentState)

    if(target) {
      target.setAttribute('class', '')
      target.attributes.stroke.value = 'black'
      target.attributes.fill.value = 'transparent'
    } 
    this.setState({
      prevState: null,
      currentState: 0
    }, this.updateCurrentState)
  }

  renderCommandGroup() {
    return (
      <div>
        <div className='display'>
          <div className='command'>
            <div className='text'>
              <label> > </label>
              <label>SHOW STATE HERE....</label>
              <label className='blinking'>| </label>
            </div>
          </div>
        </div>
        <div className='btn-group'>
          <button 
            className='btn btn-reset'
            onClick={this.resetState}
          >
            Reset
          </button>
          <button 
            className='btn'
            onClick={this.nextState}
          >
            Next
          </button>
        </div>
      </div>
    )
  }

  renderLegend() {
    const x = 10
    const y = 230
    const width = 200
    const height = 250

    return (
      <g>
        // REACT_ANGLE
        <rect x={x} y={y} width={width} height={height} fill='transparent' stroke='blue'/>
        // TITLE
        <text x={x + width/2 - 35} y={y + 30} fontSize={24} stroke='blue' fill='blue'>Legend</text>

        // CURRENT_STATE
        <circle className='selected' cx={x + 40} cy={y + height/2 - 40} r={30} fill='lightgreen' stroke='lightgreen'/>
        <text x={x + 90} y={y + height/2 - 35} fontSize={12} stroke='black' fill='black'>CURRENT_STATE</text>

        // STATE
        <circle cx={x + 40} cy={y + height/2 + 35} r={30} fill='transparent' stroke='black'/>
        <text x={x + 90} y={y + height/2 + 40} fontSize={12} stroke='black' fill='black'>STATE</text>

        // TRANSITION
        <line x1={x + 10} y1={y + height/2 + 90} x2={x + 70} y2={y + height/2 + 90} stroke='black' />
        {this.renderEndpoint(x + 70, y + height/2 + 90, 'right')}
        <text x={x + 90} y={y + height/2 + 93} fontSize={12} stroke='black' fill='black'>TRANSITION</text>
      </g>
    )
  }

  renderEndpoint(x = 0, y = 0, direction = '') {
    const size = 5
    let path = ''
    direction = direction.toLocaleLowerCase()

    switch(direction) {
      default:
      case 'up':
        path = `M ${x} ${y} L ${x + size} ${y + size} L ${x - size} ${y + size}`
        break
      case 'down':
        path = `M ${x} ${y} L ${x + size} ${y - size} L ${x - size} ${y - size}`
        break
      case 'right':
        path = `M ${x} ${y} L ${x - size} ${y + size} L ${x - size} ${y - size}`
        break
      case 'left':
        path = `M ${x} ${y} L ${x + size} ${y - size} L ${x + size} ${y + size}`
        break
    }

    return (
      <path 
        d={path} 
        fill='black' 
        stroke='black'
      />
    )
  }

  renderStateMap() {
    const rC = 40
    return(
      <svg
        className='state-display'
        width={1300}
        height={500}
      >
        {this.renderLegend()}
        
        // IDLE
        <g> 
          // INIT LINE
          <path 
            d={`M 100 100 L 210 100`}
            stroke='black'
            fill='transparent'
          />
          <circle
            id='0'
            cx={250}
            cy={100}
            r={rC}
            fill='transparent'
            stroke='black'
          />
          <text x={250} y={105} textAnchor='middle' fill='black' stroke='black'>Idle</text>
        </g>


        // SIZE-L
        <g> 
          // 0-1
          <path 
            id='0-1'
            d={`M 290 100 L 410 100`}
            stroke='black'
            fill='transparent'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#0-1'>50</textPath>
          </text>
          {this.renderEndpoint(410, 100, 'right')}

          // 1-0
          <path 
            id='1-0'
            d={`M 250 60 L 250 20 L 450 20 L 450 60`}
            stroke='black'
            fill='transparent'
          />
          <text dx={120} dy={15} fill='black' stroke='black'>
            <textPath xlinkHref='#1-0'>RESET</textPath>
          </text>
          {this.renderEndpoint(250, 60, 'down')}

          <circle
            id='1'
            cx={450}
            cy={100}
            r={rC}
            fill='transparent'
            stroke='black'
          />
          <text x={450} y={105} textAnchor='middle' fill='black' stroke='black'>Size L</text>
        </g>


        // SIZE-M
        <g> 
          // 0-2
          <path 
            id='0-2'
            d={`M 290 100 L 405 244`}
            stroke='black'
            fill='transparent'
          />
          <text dx={80} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#0-2'>40</textPath>
          </text>
          {this.renderEndpoint(410, 243, 'right')}

          // 2-0
          <path 
            id='2-0'
            d={`M 250 140 L 250 320 L 450 320 L 450 290`}
            stroke='black'
            fill='transparent'
          />
          <text dx={200} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#2-0'>RESET</textPath>
          </text>
          {this.renderEndpoint(250, 140, 'up')}

          <circle
            id='2'
            cx={450}
            cy={250}
            r={rC}
            fill='transparent'
            stroke='black'
          />
          <text x={450} y={255} textAnchor='middle' fill='black' stroke='black'>Size M</text>
        </g>
        

        // SIZE-S
        <g> 
          // 0-3
          <path 
            d={`M 290 100 L 406 399`}
            stroke='black'
            fill='transparent'
            id='0-3'
          />
          <text dx={120} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#0-3'>30</textPath>
          </text>
          {this.renderEndpoint(410, 395, 'right')}

          // 3-0
          <path 
            id='3-0'
            d={`M 250 140 L 250 480 L 450 480 L 450 440`}
            stroke='black'
            fill='transparent'
          />
          <text dx={250} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#3-0'>RESET</textPath>
          </text>

          <circle
            id='3'
            cx={450}
            cy={400}
            r={rC}
            fill='transparent'
            stroke='black'
          />
          <text x={450} y={405} textAnchor='middle' fill='black' stroke='black'>Size S</text>
        </g>


        // NODDLE-L
        <g> 
          // 1-4
          <path 
            d={`M 490 100 L 610 100`}
            stroke='black'
            fill='transparent'
            id='1-4'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#1-4'>15</textPath>
          </text>

          // 2-4
          <path 
            d={`M 490 250 L 610 100`}
            stroke='black'
            fill='transparent'
            id='2-4'
          />
          <text dx={30} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#2-4'>15</textPath>
          </text>

          // 3-4
          <path 
            d={`M 490 400 L 610 100`}
            stroke='black'
            fill='transparent'
            id='3-4'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#3-4'>15</textPath>
          </text>
          {this.renderEndpoint(610, 100, 'right')}

          // 4-0
          <path 
            id='4-0'
            d={`M 250 60 L 250 20 L 650 20 L 650 60`}
            stroke='black'
            fill='transparent'
          />
          <text dx={300} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#4-0'></textPath>
          </text>

          <circle
            id='4'
            cx={650}
            cy={100}
            r={rC}
            fill='transparent'
            stroke='black'
          />
          <text x={650} y={105} textAnchor='middle' fill='black' stroke='black'>Noodle L</text>
        </g>


        // NODDLE-M
        <g> 
          // 1-5
          <path 
            d={`M 490 100 L 610 250`}
            stroke='black'
            fill='transparent'
            id='1-5'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#1-5'>10</textPath>
          </text>

          // 2-5
          <path 
            d={`M 490 250 L 610 250`}
            stroke='black'
            fill='transparent'
            id='2-5'
          />
          <text dx={30} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#2-5'>10</textPath>
          </text>

          // 3-5
          <path 
            d={`M 490 400 L 610 250`}
            stroke='black'
            fill='transparent'
            id='3-5'
          />
          <text dx={60} dy={15} fill='black' stroke='black'>
            <textPath xlinkHref='#3-5'>10</textPath>
          </text>
          {this.renderEndpoint(610, 250, 'right')}

          // 5-0
          <path 
            id='5-0'
            d={`M 250 290 L 250 320 L 650 320 L 650 290`}
            stroke='black'
            fill='transparent'
          />
          <text dx={300} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#5-0'></textPath>
          </text>

          <circle
            id='5'
            cx={650}
            cy={250}
            r={rC}
            fill='transparent'
            stroke='black'
          />
          <text x={650} y={255} textAnchor='middle' fill='black' stroke='black'>Noodle M</text>
        </g>


        // NODDLE-S
        <g> 
          // 1-6
          <path 
            d={`M 490 100 L 610 400`}
            stroke='black'
            fill='transparent'
            id='1-6'
          />
          <text dx={50} dy={15} fill='black' stroke='black'>
            <textPath xlinkHref='#1-6'>5</textPath>
          </text>

          // 2-6
          <path 
            d={`M 490 250 L 610 400`}
            stroke='black'
            fill='transparent'
            id='2-6'
          />
          <text dx={70} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#2-6'>5</textPath>
          </text>

          // 3-6
          <path 
            d={`M 490 400 L 610 400`}
            stroke='black'
            fill='transparent'
            id='3-6'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#3-6'>5</textPath>
          </text>
          {this.renderEndpoint(610, 400, 'right')}

          // 6-0
          <path 
            id='6-0'
            d={`M 250 440 L 250 480 L 650 480 L 650 440`}
            stroke='black'
            fill='transparent'
          />
          <text dx={300} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#6-0'></textPath>
          </text>

          <circle
            id='6'
            cx={650}
            cy={400}
            r={rC}
            fill='transparent'
            stroke='black'
          />
          <text x={650} y={405} textAnchor='middle' fill='black' stroke='black'>Noodle S</text>
        </g>


        //TOP-A+
        <g>
          // 4-7
          <path 
            d={`M 690 100 L 810 100`}
            stroke='black'
            fill='transparent'
            id='4-7'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#4-7'>5</textPath>
          </text>

          // 5-7
          <path 
            d={`M 690 250 L 810 100`}
            stroke='black'
            fill='transparent'
            id='5-7'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#5-7'>5</textPath>
          </text>

          // 6-7
          <path 
            d={`M 690 400 L 810 100`}
            stroke='black'
            fill='transparent'
            id='6-7'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#6-7'>5</textPath>
          </text>
          {this.renderEndpoint(810, 100, 'right')}

          // 7-0
          <path 
            id='7-0'
            d={`M 250 60 L 250 20 L 850 20 L 850 60`}
            stroke='black'
            fill='transparent'
          />
          <text dx={300} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#7-0'></textPath>
          </text>

          // 7-8
          <path 
            d={`M 870 215 L 870 135`}
            stroke='black'
            fill='transparent'
            id='7-8'
          />
          <text dx={48} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#7-8'>10</textPath>
          </text>
          {this.renderEndpoint(870, 215, 'down')}

          <circle
            id='7'
            cx={850}
            cy={100}
            r={rC}
            fill='transparent'
            stroke='black'
          />
          <text x={850} y={105} textAnchor='middle' fill='black' stroke='black'>Top A+</text>
        </g>


        //TOP-B+
        <g>
          // 4-8
          <path 
            d={`M 690 100 L 810 250`}
            stroke='black'
            fill='transparent'
            id='4-8'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#4-8'>10</textPath>
          </text>

          // 5-8
          <path 
            d={`M 690 250 L 810 250`}
            stroke='black'
            fill='transparent'
            id='5-8'
          />
          <text dx={30} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#5-8'>10</textPath>
          </text>

          // 6-8
          <path 
            d={`M 690 400 L 810 250`}
            stroke='black'
            fill='transparent'
            id='6-8'
          />
          <text dx={50} dy={15} fill='black' stroke='black'>
            <textPath xlinkHref='#6-8'>10</textPath>
          </text>
          {this.renderEndpoint(810, 250, 'right')}

          // 8-0
          <path 
            id='8-0'
            d={`M 250 290 L 250 320 L 850 320 L 850 290`}
            stroke='black'
            fill='transparent'
          />
          <text dx={300} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#8-0'></textPath>
          </text>

          // 8-7
          <path 
            d={`M 830 215 L 830 135`}
            stroke='black'
            fill='transparent'
            id='8-7'
          />
          <text dx={10} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#8-7'>-10</textPath>
          </text>
          {this.renderEndpoint(830, 135, 'up')}

          <circle
            id='8'
            cx={850}
            cy={250}
            r={rC}
            fill='transparent'
            stroke='black'
          />
          <text x={850} y={255} textAnchor='middle' fill='black' stroke='black'>Top B+</text>
        </g>


        //TOP-A-
        <g>
          // 7-9
          <path 
            d={`M 890 90 L 1010 90`}
            stroke='black'
            fill='transparent'
            id='7-9'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#7-9'>-5</textPath>
          </text>
          {this.renderEndpoint(1010, 90, 'right')}

          // 9-7
          <path 
            d={`M 890 110 L 1010 110`}
            stroke='black'
            fill='transparent'
            id='9-7'
          />
          <text dx={50} dy={15} fill='black' stroke='black'>
            <textPath xlinkHref='#9-7'>5</textPath>
          </text>
          {this.renderEndpoint(890, 110, 'left')}

          // 8-9
          <path 
            d={`M 888 233 L 1025 130`}
            stroke='black'
            fill='transparent'
            id='8-9'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#8-9'>-10</textPath>
          </text>
          {this.renderEndpoint(885, 230, 'left')}

          // 9-0
          <path 
            id='9-0'
            d={`M 850 60 L 850 20 L 1050 20 L 1050 60`}
            stroke='black'
            fill='transparent'
          />
          <text dx={300} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#9-0'></textPath>
          </text>

          // 9-10
          <path 
            d={`M 1060 210 L 1060 138`}
            stroke='black'
            fill='transparent'
            id='9-10'
          />
          <text dx={48} dy={15} fill='black' stroke='black'>
            <textPath xlinkHref='#9-10'>-10</textPath>
          </text>
          {this.renderEndpoint(1060, 210, 'down')}

          <circle
            id='9'
            cx={1050}
            cy={100}
            r={rC}
            fill='transparent'
            stroke='black'
          />
          <text x={1050} y={105} textAnchor='middle' fill='black' stroke='black'>Top A-</text>
        </g>


        //TOP-B-
        <g>
          // 8-10
          <path 
            id='8-10'
            d={`M 890 245 L 1010 245`}
            stroke='black'
            fill='transparent'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#8-10'>-10</textPath>
          </text>
          {this.renderEndpoint(1010, 245, 'right')}

          // 10-8
          <path 
            id='10-8'
            d={`M 885 270 L 1015 270`}
            stroke='black'
            fill='transparent'
          />
          <text dx={50} dy={15} fill='black' stroke='black'>
            <textPath xlinkHref='#10-8'>10</textPath>
          </text>
          {this.renderEndpoint(885, 270, 'left')}

          // 10-7
          <path 
            id='10-7'
            d={`M 885 119 L 1018 228`}
            stroke='black'
            fill='transparent'
          />
          <text dx={50} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#10-7'>5</textPath>
          </text>
          {this.renderEndpoint(882, 122, 'left')}

          // 10-0
          <path 
            id='10-0'
            d={`M 250 290 L 250 320 L 1050 320 L 1050 290`}
            stroke='black'
            fill='transparent'
          />
          <text dx={300} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#10-0'></textPath>
          </text>

          // 10-9
          <path 
            d={`M 1030 215 L 1030 135`}
            stroke='black'
            fill='transparent'
            id='10-9'
          />
          <text dx={10} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#10-9'>-5</textPath>
          </text>
          {this.renderEndpoint(1030, 135, 'up')}

          <circle
            id='10'
            cx={1050}
            cy={250}
            r={rC}
            fill='transparent'
            stroke='black'
          />
          <text x={1050} y={255} textAnchor='middle' fill='black' stroke='black'>Top B-</text>
        </g>


        //SUBMIT
        <g>
          //1-11
          <path 
            id='1-11'
            d={`M 470 65 L 470 40 L 1250 40 L 1250 60`}
            stroke='black'
            fill='transparent'
          />
          <text dx={500} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#1-11'>SUBMIT</textPath>
          </text>

          //4-11
          <path 
            id='4-11'
            d={`M 670 65 L 670 40 L 1250 40 L 1250 60`}
            stroke='black'
            fill='transparent'
          />
          <text dx={300} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#4-11'></textPath>
          </text>

          //7-11
          <path 
            id='7-11'
            d={`M 870 65 L 870 40 L 1250 40 L 1250 60`}
            stroke='black'
            fill='transparent'
          />
          <text dx={300} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#7-11'></textPath>
          </text>

          //9-11
          <path 
            id='9-11'
            d={`M 1070 65 L 1070 40 L 1250 40 L 1250 60`}
            stroke='black'
            fill='transparent'
          />
          <text dx={300} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#9-11'></textPath>
          </text>
          {this.renderEndpoint(1250, 60, 'down')}

          //2-11
          <path 
            id='2-11'
            d={`M 450 210 L 450 170 L 1250 170 L 1250 140`}
            stroke='black'
            fill='transparent'
          />
          <text dx={750} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#2-11'>SUBMIT</textPath>
          </text>

          //5-11
          <path 
            id='5-11'
            d={`M 650 210 L 650 170 L 1250 170 L 1250 140`}
            stroke='black'
            fill='transparent'
          />
          <text dx={500} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#5-11'></textPath>
          </text>

          //10-11
          <path 
            id='10-11'
            d={`M 1070 215 L 1070 170 L 1250 170 L 1250 140`}
            stroke='black'
            fill='transparent'
          />
          <text dx={500} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#10-11'></textPath>
          </text>
          {/* {this.renderEndpoint(1210, 100, 'right')} */}

          //3-11
          <path 
            id='3-11'
            d={`M 480 425 L 480 460 L 1250 460 L 1250 140`}
            stroke='black'
            fill='transparent'
          />
          <text dx={700} dy={15} fill='black' stroke='black'>
            <textPath xlinkHref='#3-11'>SUBMIT</textPath>
          </text>

          //6-11
          <path 
            id='6-11'
            d={`M 680 425 L 680 460 L 1250 460 L 1250 140`}
            stroke='black'
            fill='transparent'
          />
          <text dx={700} dy={15} fill='black' stroke='black'>
            <textPath xlinkHref='#6-11'></textPath>
          </text>

          //8-11
          <path 
            id='8-11'
            d={`M 870 285 L 870 460 L 1250 460 L 1250 140`}
            stroke='black'
            fill='transparent'
          />
          <text dx={500} dy={-5} fill='black' stroke='black'>
            <textPath xlinkHref='#8-11'></textPath>
          </text>
          {this.renderEndpoint(1250, 140, 'up')}

          <circle
            id='11'
            cx={1250}
            cy={100}
            r={rC}
            fill='transparent'
            stroke='black'
          />
          <circle
            id='11'
            cx={1250}
            cy={100}
            r={rC - 6}
            fill='transparent'
            stroke='black'
          />
          <text x={1250} y={105} textAnchor='middle' fill='black' stroke='black'>Submit</text>
        </g>
      </svg>
    )
  }

  render() {
    return (
      <div className='finite-state-machine'>
        {this.renderCommandGroup()}
        {this.renderStateMap()}
      </div>
    )
  }
}

export default FiniteState2