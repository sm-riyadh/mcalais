import React from 'react'
// import UIfx from 'uifx'

import Click from '../../../res/audio/click.mp3'
// import ml from '../../../res/image/ml.png'

import { Container } from '../../../component'

const HeaderBar = props => (
  <div className='header'>
    <audio id='audioID'>
      <source src={Click} type='audio/ogg'></source>
    </audio>
    <Container vPos='middle' noPad>
      {props.leftComponents}
    </Container>
    <Container vPos='middle'>{props.rightComponents}</Container>
  </div>
)

export default HeaderBar
