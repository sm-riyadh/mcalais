import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Container, Card, Text, Placeholder } from '../../component/common'
import { fetchJournal } from '../../store/actions'

export class Journal extends Component {
  componentDidMount() {
    this.props.fetchJournal()
  }

  render() {
    return 1 === 1 ? (
      <Container vertical className='scrollable p-hor-8 p-top-5'>
        <Container className='flex-pos-between p-hor-4 p-bottom-4'>
          <div>
            <select className='btn btn-chip m-right-2'>
              <option>Journal</option>
              {/* <option>Expenses</option>
              <option>Incomes</option> */}
            </select>
            <input
              type='text'
              className='btn btn-chip m-right-2'
              placeholder='Search...'
            />
          </div>
          <button className='btn btn-chip primary'>ADD &nbsp;&nbsp; +</button>
        </Container>
        <Card className='p-top-5' vertical noPad expand>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Journal</Text>
            <div>
              {/* <select className='btn btn-chip'>
              <option>Sort by...</option>
            </select> */}
              <select className='btn btn-chip'>
                <option>Today</option>
                <option>Tomorrow</option>
                <option>3 Days</option>
                <option>Month</option>
                {/* <option>Custom</option> */}
              </select>
              {/* <input type='date' className='btn' /> */}
              {/* <input type='date' className='btn' /> */}
            </div>
          </Container>
          <table className='table-card'>
            <thead>
              <tr>
                <th className='txtRight'>No.</th>
                <th>Date</th>
                <th>Destination (Source)</th>
                <th>Description</th>
                <th className='txtRight'>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>2</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>3</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>4</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>5</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>6</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
              <tr>
                <td className='txtRight'>1</td>
                <td>Mon, 6th Jan</td>
                <td>NRBC (Bank) [NRBC (Loan)]</td>
                <td>Marina Construction</td>
                <td className='txtRight'>10,00,000</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </Container>
    ) : (
      <Placeholder type='table' />
    )
  }
}

const mapStateToProps = state => ({
  journal: state.journal,
})
const mapDispatchToProps = dispatch => ({
  fetchJournal: payload => dispatch(fetchJournal(payload)),
  // addNewJournal: payload => dispatch(addNewJournal(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
