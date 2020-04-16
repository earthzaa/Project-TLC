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
        /* size-l */ [ -1, 0, 0, 0, 15, 15, 15, 0, 0, 0, 0, 0 ],
        /* size-m */ [ -1, 0, 0, 0, 10, 10, 10, 0, 0, 0, 0, 0 ],
        /* size-s */[ -1, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0 ],
        /* noodle-l */ [ -1, 0, 0, 0, 0, 0, 0, 5, 10, 0, 0, 0 ],
        /* noodle-m */ [ -1, 0, 0, 0, 0, 0, 0, 5, 10, 0, 0, 0 ],
        /* noodle-s */ [ -1, 0, 0, 0, 0, 0, 0, 5, 10, 0, 0, 0 ],
        /* top-a+ */[ -1, 0, 0, 0, 0, 0, 0, 0, 10, 5, 0, 0 ],
        /* top-b+ */ [ -1, 0, 0, 0, 0, 0, 0, -10, 0, 0, -10, 0 ],
        /* top-a- */ [ -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        /* top-b- */ [ -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
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
        <circle
          className={index === 11 ? '' : 'd-none'}
          id={`node-${index}`}
          cx={x}
          cy={y}
          r={30}
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
        const factorX = isCanBack ? -factorWidth : factorWidth //isCanBack ? 0 : factorWidth
        const x1 = fromNode.position.x + factorX //- (isCanBack ? factorWidth : 0)
        const y1 = fromNode.position.y 
        const x2 = toNode.position.x - factorX
        const y2 = toNode.position.y //- (isCanBack && fromIndex%3 === 1 ? factorWidth : isCanBack ? -factorWidth : 0)
        const idPath = `path-${fromIndex}-${index}`

        return(
          <g
            className={currentState === fromIndex ? 'selected' : ''}
            key={`transition-from-${fromIndex}-to-${index}`}
          >
            <path 
              id={idPath}
              d={
                fromIndex >= 8 ?
                  `M ${x1} ${y1} L ${x2} ${y2}`
                :
                  isCanBack ? 
                    `M ${x2} ${y2} L ${x2} ${y2 + (fromIndex%3 === 1 ? -270 : 80)} L ${x1} ${y1 + (fromIndex%3 === 1 ? -70 : 80)} L ${x1} ${y1}` 
                    : 
                    `M ${x1} ${y1} L ${x2} ${y2}`
                }
              stroke={isCanBack ? 'black' : colorNode[fromIndex]}
              fill='transparent'
            />
            <text
              dx={Math.abs(x2-x1)/2}  
              stroke={colorNode[fromIndex]}
              fill={colorNode[fromIndex]}
            >
              <textPath href={`#${idPath}`}>
                {`${item}`}
              </textPath>
            </text>
          </g>
        )
      }
    })
  }

  renderCommandGroup() {
    return (
      <div>
        <div className='display'>
          <div className='command'>
            <label className='selected'>SHOW STATE HERE....</label>
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
      </div>
    )
  }

  render() {
    const { stateMap } = this.state
    const init_state = getStateProperty(0)

    return(
      <div className='finite-state-machine'>
        {this.renderCommandGroup()}
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