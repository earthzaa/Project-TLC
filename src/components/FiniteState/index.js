import React, { 
  Component 
} from 'react'
import {
  getStateProperty
} from './StateProperty'

class FiniteState extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prevState: null,
      currentState: 0,
      minState: 0,
      maxState: 11,
      stateMap: [
        /* idle */ [ 0, 50, 40, 30, 0, 0, 0, 0, 0, 0, 0, 0 ],
        /* size-l */ [ -50, 0, 0, 0, 15, 15, 15, 0, 0, 0, 0, 0 ],
        /* size-m */ [ -40, 0, 0, 0, 10, 10, 10, 0, 0, 0, 0, 0 ],
        /* size-s */[ -30, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0 ],
        /* noodle-l */ [ -30, 0, 0, 0, 0, 0, 0, 5, 10, 0, 0, 0 ],
        /* noodle-m */ [ 0, 0, 0, 0, 0, 0, 0, 5, 10, 0, 0, 0 ],
        /* noodle-s */ [ 0, 0, 0, 0, 0, 0, 0, 5, 10, 0, 0, 0 ],
        /* top-a+ */[ -10, 0, 0, 0, 0, 0, 0, 0, 10, 5, 0, 0 ],
        /* top-b+ */ [ -10, 0, 0, 0, 0, 0, 0, -10, 0, 0, 10, 0 ],
        /* top-a- */ [ 0, 0, 0, 0, 0, 0, 0, -5, 0, 0, -10, 0 ],
        /* top-b- */ [ 0, 0, 0, 0, 0, 0, 0, 0, -10, 0, 0, 0 ],
        /* submit */ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      ],
      colorNode: ['mediumaquamarine', 'green', 'blue', 'red', 'dodgerblue', 'blueviolet', 'deeppink', 'steelblue', 'magenta', 'darkmagenta', 'burlywood', 'black'],
      textPosition: []
    }

    this.renderNode = this.renderNode.bind(this)
    this.renderTransition = this.renderTransition.bind(this)
    this.goToNextNode = this.goToNextNode.bind(this)
    this.backToPrevNode = this.backToPrevNode.bind(this)
  }

  backToPrevNode() {
    const { minState } = this.state
    let { currentState } = this.state

    if(currentState > minState) currentState -= 1

    this.setState({
      currentState
    })
  }

  goToNextNode() {
    const { maxState } = this.state
    let { currentState } = this.state

    if(currentState < maxState) currentState += 1

    this.setState({
      currentState
    })
  }

  renderNode(item = [], index = 0) {
    const { colorNode, currentState } = this.state
    const currentNode = getStateProperty(index)
    const x = currentNode.position.x
    const y = currentNode.position.y
    const isCurrentState = currentState === index

    return(
      <g
        key={`finite-state-node-${index}`}
      >
        <circle
          className={isCurrentState ? 'selected' : 'node'}
          id={`node-${index}`}
          cx={x}
          cy={y}
          r={40}
          stroke={isCurrentState ? 'springgreen' : colorNode[index]}
          fill={isCurrentState ? 'springgreen' : 'white'}
        />
        <text 
          x={x} 
          y={y + 5} 
          textAnchor='middle'
          stroke={'black'}
          fill={'black'}
        >
          {currentNode.id}
        </text>
        {this.renderTransition(item, index)}
      </g>
      
    )
  }

  renderTransition(fromItem = [], fromIndex = 0) {
    const { colorNode, currentState } = this.state
    const fromNode = getStateProperty(fromIndex)

    return fromItem.map((item, index) => { 
      const toNode = getStateProperty(index)

      if(item !== 0) {
        const factorWidth = 40
        const isCanBack = item < 0
        const factorX = isCanBack ? 0 : factorWidth
        const x1 = fromNode.position.x + factorX - (isCanBack ? factorWidth : 0)
        const y1 = fromNode.position.y 
        const x2 = toNode.position.x - factorX
        const y2 = toNode.position.y - (isCanBack && fromIndex%3 === 1 ? factorWidth : isCanBack ? -factorWidth : 0)
        let xText = (x1 + x2)/2
        let yText = (y1 + y2)/2 - 5
        
        return(
          <g
            className={currentState === fromIndex ? 'selected' : ''}
            key={`transition-from-${fromIndex}-to-${index}`}
          >
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={colorNode[fromIndex]}
              markerEnd=''
              fill='transparent'
            />
            <text
              x={xText}
              y={yText}
              dy={fromIndex === 1 || fromIndex === 3 || fromIndex === 4 || fromIndex === 6 ? 20 : 0}
              dx={fromIndex === 3 ? -20 : 0}
              stroke={colorNode[fromIndex]}
              fill={colorNode[fromIndex]}
            >
              {`${item}`}
            </text>
          </g>
        )
      }
    })
  }

  render() {
    const { stateMap } = this.state
    const init_state = getStateProperty(0)

    return(
      <div className='finite-state-machine'>
        <div className='display'>
          <div className='command'>
            <label className='selected'>Show State here....</label>
          </div>
        </div>
        <div className='btn-group'>
          <button 
            className='btn-next'
            onClick={this.backToPrevNode}
          >
            Back
          </button>
          <button 
            className='btn-next'
            onClick={this.goToNextNode}
          >
            Next
          </button>
        </div>
        <div name='graph-map'>
          <svg 
            className='state-map'
            width={1300}
            height={600}
          >
            <line
              x1={30}
              y1={init_state.position.y}
              x2={110}
              y2={init_state.position.y}
              stroke='black'
            />
            {stateMap.map(this.renderNode)}
          </svg>
        </div>
      </div>
    )
  }
}

export default FiniteState