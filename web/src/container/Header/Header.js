import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchCoa, updateMain } from '../../store/actions'
import Click from '../../res/audio/click.mp3'
// import UIfx from 'uifx'

import PikachuAvator from '../../res/image/pikachu-avatar.jpg'

import { Container } from '../../component'
import { Text } from '../../component'
import { fetchCompany } from '../../store/actions'

export class Header extends Component {
  componentDidMount() {
    this.props.fetchCompany()
  }

  mainChangeHandler = ({ target }) => {
    const { name, value } = target
    this.props.updateMain(name, value)
  }

  render() {
    return (
      <Fragment>
        <header className='menu'>
          <Container>
            <Text className='title m-left'>MCALAIS</Text>
            <Text className='sub-title m-left-1'>version 1.0</Text>
          </Container>
          <Container vPos='middle' noPad>
            <button className='btn btn-menu'>🗕</button>
            <button className='btn btn-menu'>🗗</button>
            <button className='btn btn-menu'>🗙</button>
          </Container>
        </header>
        <header className='header'>
          {/* <audio id='audioID'>
					<source src={Click} type='audio/ogg' />
				</audio> */}
          <Container vPos='middle' noPad>
            <button
              onClick={() => this.props.updateMain('sidebar_collapse', !this.props.sidebar_collapse)}
              className='btn btn-transparent m-left-2'
            >
              ☰
            </button>
            <button onClick={() => this.props.history.push('/')} className='btn btn-transparent m-right'>
              🏠
            </button>
            <button
              onClick={this.props.history.goBack}
              className='btn btn-header-nav white'
              style={{ marginRight: '0.2rem' }}
            >
              {/* onMouseEnter={() => click.play() */}
              ◀
            </button>
            <button
              onClick={this.props.history.goForward}
              className='btn btn-header-nav white'
              style={{ marginLeft: '0.2rem' }}
            >
              {/* onMouseEnter={() => click.play() */}
              ▶
            </button>
            {this.props.company.length !== 1 ? (
              <select
                name='company'
                className='btn btn-header-select white'
                onChange={this.mainChangeHandler}
                value={this.props.currentCompany}
              >
                {this.props.company.length !== 0 ? (
                  this.props.company.map(({ name }, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))
                ) : (
                  <option value='' selected disabled>
                    No Company
                  </option>
                )}
              </select>
            ) : (
              <p className='p-left-1'>{this.props.company[0].name}</p>
            )}
          </Container>
          <Container vPos='middle'>
            <Text className='m-right'>Pikachu</Text>
            <button className='btn btn-header-nav btn-header-nav-img'>
              {/* onMouseEnter={() => click.play() */}
              <img src={PikachuAvator} />
            </button>
            <button className='btn btn-header-nav white'>
              {/* onMouseEnter={() => click.play() */}
              ⚇
            </button>
            <button className='btn btn-header-nav white'>
              {/* onMouseEnter={() => click.play()} */}
              ♪
            </button>
            <button className='btn btn-header-nav white'>
              {/* onMouseEnter={() => click.play()} */}
              🔔
            </button>
          </Container>
        </header>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  sidebar_collapse : state.main.sidebar_collapse,
  currentCompany   : state.main.company,
  company          : state.company.company,
})
const mapDispatchToProps = dispatch => ({
  fetchCompany : () => dispatch(fetchCompany()),
  updateMain   : (name, payload) => dispatch(updateMain(name, payload)),
  fetchCoa     : payload => dispatch(fetchCoa(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
