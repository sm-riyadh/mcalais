import React from 'react'
import UIfx from 'uifx'

import PikachuAvator from '../../../res/image/pikachu-avatar.jpg'
import Click from '../../../res/audio/click.mp3'

import { Container, Text } from '../../common/'

function header() {
  const click = new UIfx(Click, {
    volume: 0.8,
    throttleMs: 10,
  })

  return (
    <div className='header'>
      <audio id='audioID'>
        <source src={Click} type='audio/ogg'></source>
      </audio>
      <Container vPos='middle' noPad>
        {/* <button className='btn btn-header-nav-black'>icon</button> */}
        <Text className='m-left-3'>Marina Construction</Text>
      </Container>
      <Container vPos='middle'>
        <Text className='m-right'>Pikachu</Text>
        <button
          className='btn btn-header-nav btn-header-nav-img'
          onMouseEnter={() => click.play()}
        >
          <img src={PikachuAvator} />
        </button>
        <button
          className='btn btn-header-nav black'
          onMouseEnter={() => click.play()}
        >
          O
        </button>
        <button
          className='btn btn-header-nav black'
          onMouseEnter={() => click.play()}
        >
          O
        </button>
        <button
          className='btn btn-header-nav black'
          onMouseEnter={() => click.play()}
        >
          O
        </button>
      </Container>
    </div>
  )
}

export default header
