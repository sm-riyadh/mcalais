import React from 'react'

const TestGround = () => {
  return (
    <div style={{ margin: '3rem', padding: '2rem', backgroundColor: '#efeeee', width: '100%' }}>
      {/* <h1 className='text-header'>
        Header 1
        <p className='text-header-sub'> Sub header </p>
      </h1>
      <h2 className='text-header'>
        Header 2
        <p className='text-header-sub'> Sub header </p>
      </h2>
      <h3 className='text-header'>
        Header 3
        <p className='text-header-sub'> Sub header </p>
      </h3>
      <h4 className='text-header'>
        Header 4
        <p className='text-header-sub'> Sub header </p>
      </h4>
      <h5 className='text-header'>
        Header 5
        <p className='text-header-sub'> Sub header </p>
      </h5>
      <h6 className='text-header'>
        Header 6
        <p className='text-header-sub'> Sub header </p>
      </h6>
      <p> Text </p> */}
      <button className='button'>Button</button>
      <button className='button button-icon'>
        <i className='material-icons'>search</i>
      </button>
      <button className='button button-chip'>Button</button>
      <button className='button button-secondary'>Clear</button>
      <button className='button button-primary'>Submit</button>

      <form className='form'>
        <label>
          <p>Label</p>
          <input className='input' />
        </label>
        <label>
          <p>Label</p>
          <input className='input' />
        </label>
        <div className='form-group'>
          <label>
            <p>Label</p>
            <input className='input' />
          </label>
          <label>
            <p>Label</p>
            <input className='input' />
          </label>
        </div>
        <div className='form-group form-button'>
          <button className='button button-chip button-form button-secondary'>Clear</button>
          <input type='submit' className='button button-chip button-form button-primary' />
        </div>
      </form>
      <table className='table'>
        <thead>
          <tr className='table-header table-header-sticky'>
            <th>Header</th>
            <th>Header</th>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          <tr className='table-body'>
            <td>Data</td>
            <td>Data</td>
            <td>Data</td>
            <td>Data</td>
          </tr>
        </tbody>
      </table>
      <div className='container card'> Card </div>
    </div>
  )
}

export default TestGround
