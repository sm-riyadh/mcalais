import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchCoa, updateMain } from '../../store/actions'

import HeaderBar from './components/HeaderBar'
import PikachuAvator from '../../res/image/pikachu-avatar.jpg'

import { Text } from '../../component'

export class Header extends Component {
  mainChangeHandler = ({ target }) => {
    const { name, value } = target
    this.props.updateMain(name, value)
  }

  render() {
    return (
      <HeaderBar
        leftComponents={
          <Fragment>
            <button className='btn btn-transparent m-left-2'>☰</button>
            {/* <button className='btn btn-header-nav-black'>icon</button> */}
            {/* <img src={ml} style={{ height: '2.5rem', paddingLeft: '1rem' }}></img> */}
            <Text className='m-left'>
              <b>MCALAIS</b>
            </Text>
            <select
              name='company'
              className='btn primary m-left-3'
              onChange={this.mainChangeHandler}
              value={this.props.company}
            >
              <option value='HQ'>HQ</option>
              <option value='Jagannatpur'>Jagannatpur</option>
              <option value='Mithamoin'>Mithamoin</option>
              <option value='SUST Boundary'>SUST Boundary</option>
              <option value='Dharmapassa'>Dharmapassa</option>
            </select>
          </Fragment>
        }
        rightComponents={
          <Fragment>
            <Text className='m-right'>Pikachu</Text>
            <button
              className='btn btn-header-nav btn-header-nav-img'
              // onMouseEnter={() => click.play()}
            >
              <img src={PikachuAvator} />
            </button>
            <button
              className='btn btn-header-nav black'
              // onMouseEnter={() => click.play()}
            >
              O
            </button>
            <button
              className='btn btn-header-nav black'
              // onMouseEnter={() => click.play()}
            >
              O
            </button>
            <button
              className='btn btn-header-nav black'
              // onMouseEnter={() => click.play()}
            >
              O
            </button>
          </Fragment>
        }
      />
    )
  }
}

const mapStateToProps = state => ({
  company: state.main.company,
})
const mapDispatchToProps = dispatch => ({
  updateMain: (name, payload) => dispatch(updateMain(name, payload)),
  fetchCoa: payload => dispatch(fetchCoa(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
