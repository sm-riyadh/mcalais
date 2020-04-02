import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchAccount, updateMain } from '../../store/actions'
// import Click from '../../res/audio/click.mp3'
// import UIfx from 'uifx'

import PikachuAvator from '../../res/image/pikachu-avatar.jpg'

import { Container } from '../../component'
import { Text } from '../../component'
import { fetchCompany } from '../../store/actions'

export class Header extends Component {
  componentDidMount() {
    this.props.fetchCompany()
  }
  state = {
    notifications_btn_active : false,
    company_btn_active       : false,
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
              className='button button-icon m-left-2'
            >
              <i className='material-icons'>menu</i>
            </button>
            <button onClick={() => this.props.history.push('/')} className='button button-icon m-right'>
              <i className='material-icons'>home</i>
            </button>
            <button onClick={this.props.history.goBack} className='button button-icon button-light p-left-0'>
              {/* onMouseEnter={() => click.play() */}
              <i className='material-icons' style={{ transform: 'rotate(180deg)' }}>
                arrow_forward_ios
              </i>
            </button>
            <button onClick={this.props.history.goForward} className='button button-icon button-light p-left-0'>
              {/* onMouseEnter={() => click.play() */}
              <i className='material-icons'>arrow_forward_ios</i>
            </button>
            {this.props.company.length > 1 ? (
              <select
                name='company'
                className={`button button-icon button-light white${this.state.company_btn_active ? ' active' : ''}`}
                onClick={() => this.setState({ company_btn_active: !this.state.company_btn_active })}
                onChange={this.mainChangeHandler}
                value={this.props.currentCompany}
              >
                {this.props.company.map(({ name }, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            ) : (
              <p className='p-left-1' />
            )}
          </Container>
          <Container vPos='middle'>
            <Text className='m-right'>Pikachu</Text>
            <button className='btn btn-header-nav btn-header-nav-img'>
              {/* onMouseEnter={() => click.play() */}
              <img src={PikachuAvator} />
            </button>
            <button
              onClick={() => this.setState({ notifications_btn_active: !this.state.notifications_btn_active })}
              className={`button button-icon button-light${this.state.notifications_btn_active ? ' active' : ''}`}
            >
              {/* onMouseEnter={() => click.play()} */}
              <i className='material-icons'>notifications</i>
            </button>
            <button className='button button-icon button-light'>
              {/* onMouseEnter={() => click.play() */}
              <i className='material-icons'>settings</i>
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
  fetchAccount : payload => dispatch(fetchAccount(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
