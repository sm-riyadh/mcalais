import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ReactToPrint from 'react-to-print'
import dateFormat from 'dateformat'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DayPickerSingleDateController, DayPickerRangeController } from 'react-dates'

import { Modal, Container, Card, Text, Placeholder } from '../../component'
import { fetchAccount, fetchAccountList, fetchJournal, fetchJournalMore, sendJournal } from '../../store/actions'
import { ActivityBar } from '../../component/layout'

import JournalTableRows from './components/JournalTableRows'
import JournalDetailModal from './components/JournalDetailModal'

export class Journal extends Component {
  componentDidMount() {
    this.props.fetchAccount({ company: this.props.company })
    this.props.fetchAccountList({ company: this.props.company })
    this.props.fetchJournal({
      company    : this.props.company,
      start_date : moment().subtract(24, 'hours').toDate(),
      end_date   : moment().toDate(),
    })
  }

  state = {
    modal_journal_details : false,
    journal_index         : '',

    page                  : 0,

    focused_input         : 'startDate',
    filter_type           : 'journal',
    filter_date           : '3_days',
    filter_account        : '',
    filter_voucher_id     : '',
    start_date            : moment().subtract(2, 'days'),
    end_date              : moment(),
  }

  toggleModal = (name, action) => this.setState({ [name]: action })
  onChangeHandler = ({ target }) => this.setState({ [target.name]: target.value })

  onFilterChangeHandler = (name, value) => {
    this.setState({ [name]: value }, () =>
      this.props.fetchJournal({
        company    : this.props.company,
        type       : this.state.filter_type,
        start_date : this.state.start_date.toDate(),
        end_date   : this.state.end_date.toDate(),
      })
    )
  }
  onSingleDateFilterChangeHandler = (name, value) => {
    this.setState({ [name]: value, filter_date: 'custom_single' }, () =>
      this.props.fetchJournal({
        company    : this.props.company,
        type       : this.state.filter_type,
        start_date : this.state.end_date.toDate(),
        end_date   : this.state.end_date.toDate(),
      })
    )
  }

  onDateFilterChangeHandler = (startDate, endDate) => {
    if (!endDate) endDate = this.state.end_date

    this.setState({ start_date: startDate, end_date: endDate, filter_date: 'custom' }, () =>
      this.props.fetchJournal({
        company    : this.props.company,
        type       : this.state.filter_type,
        start_date : this.state.start_date.toDate(),
        end_date   : this.state.end_date.toDate(),
      })
    )
  }

  onDateFilterHandler = preset => {
    let start_date, end_date

    switch (preset) {
      case 'today': {
        start_date = moment()
        end_date = moment()
        break
      }
      case '3_days': {
        start_date = moment().subtract(2, 'days')
        end_date = moment()
        break
      }
      case 'week': {
        start_date = moment().subtract(1, 'weeks')
        end_date = moment()
        break
      }
      case 'month': {
        start_date = moment().subtract(1, 'months')
        end_date = moment()
        break
      }
      case 'month': {
        start_date = moment().subtract(2, 'months')
        end_date = moment().subtract(1, 'months')
        break
      }
      case 'year': {
        start_date = moment().subtract(1, 'years')
        end_date = moment()
        break
      }
      case 'custom_single': {
        start_date = this.state.end_date
        end_date = this.state.end_date
        this.setState({ filter_date: preset })
        break
      }
      case 'custom': {
        this.setState({ filter_date: preset })
        return
      }
      default:
        start_date = this.state.start_date
        end_date = this.state.end_date
        break
    }

    this.setState({ start_date, end_date, filter_date: preset }, () =>
      this.props.fetchJournal({
        company    : this.props.company,
        start_date : start_date.toDate(),
        end_date   : end_date.toDate(),
      })
    )
  }

  setJournalIndex = index => this.setState({ journal_index: index })

  appendMore = () => {
    this.setState(
      state => ({
        page : state.page + 1,
      }),
      () =>
        this.props.fetchJournalMore({
          company : 'HQ',
          page    : this.state.page,
          account : this.state.filter_account,
        })
    )
  }

  render() {
    return (
      <Fragment>
        {this.props.journal && !this.props.status.failed ? (
          <Container vertical className='scrollable p-hor-8 p-top-2'>
            <Card className='p-top-5' vertical noPad expand>
              <Container className='card-header flex-pos-between p-hor-6'>
                <b>Journal</b>
                <Container>
                  <input
                    type='text'
                    name='filter_voucher_id'
                    className='btn btn-chip grey m-hor'
                    placeholder='Voucher ID...'
                    onChange={this.onChangeHandler}
                    value={this.state.voucher_id_filter}
                  />
                  <select name='filter_account' className='btn btn-chip grey m-hor' onChange={this.onChangeHandler}>
                    <option value=''>All Accounts</option>
                    {this.props.account_list.map(account => <option value={account.code}>{account.name}</option>)}
                  </select>
                </Container>
              </Container>
              <div className='journal-print' ref={e => (this.testRef = e)}>
                <h2 className='only-print'>info</h2>
                <table className='table-card'>
                  <thead>
                    <tr>
                      <th className='txtRight'>No.</th>
                      <th>Date</th>
                      <th>Destination</th>
                      <th>Source</th>
                      <th>Voucher ID</th>
                      <th>Description</th>
                      <th className='txtRight'>Amount</th>
                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <JournalTableRows
                      data={this.props.journal}
                      modalOpen={() => this.toggleModal('modal_journal_details', true)}
                      setJournalIndex={this.setJournalIndex}
                      filterAccount={this.state.filter_account}
                      filterVoucherId={this.state.filter_voucher_id}
                    />
                  </tbody>
                </table>
              </div>
              {/* <button onClick={this.appendMore}>Show more</button> */}
            </Card>
          </Container>
        ) : !this.props.status.failed ? (
          <Placeholder type='table' />
        ) : (
          <b style={{ padding: '10rem', color: '#dd3838' }}>{this.props.status.message}</b>
        )}
        <ActivityBar>
          {this.props.journal && !this.props.status.failed ? (
            <Fragment>
              <section>
                <div className='widget m-bottom-5'>
                  <select className='select' onClick={() => this.onFilterChangeHandler('filter_type', 'journal')}>
                    <option>Journal</option>
                    <option>Expresses</option>
                    <option>Cash n Bank</option>
                    <option>Payrolls</option>
                    <option>Incomes</option>
                  </select>
                  {/*  <div
                  className={`option${this.state.filter_type === 'journal' ? ' active' : ''}`}
                  onClick={() => this.onFilterChangeHandler('filter_type', 'journal')}
                >
                  <i className='material-icons p-right-1'>collections_bookmark</i>
                  Journal
                </div>
                <div
                  className={`option${this.state.filter_type === 'expenses' ? ' active' : ''}`}
                  onClick={() => this.onFilterChangeHandler('filter_type', 'expenses')}
                >
                  <i className='material-icons p-right-1'>local_grocery_store</i>
                  Expresses
                </div>
                <div
                  className={`option${this.state.filter_type === 'assets' ? ' active' : ''}`}
                  onClick={() => this.onFilterChangeHandler('filter_type', 'assets')}
                >
                  <i className='material-icons p-right-1'>money</i>
                  Cash n Bank
                </div>
                <div
                  className={`option${this.state.filter_type === 'liabilities' ? ' active' : ''}`}
                  onClick={() => this.onFilterChangeHandler('filter_type', 'liabilities')}
                >
                  <i className='material-icons p-right-1'>receipt</i>
                  Payrolls
                </div>
                <div
                  className={`option${this.state.filter_type === 'incomes' ? ' active' : ''}`}
                  onClick={() => this.onFilterChangeHandler('filter_type', 'incomes')}
                >
                  <i className='material-icons p-right-1'>score</i>
                  Incomes
                </div> */}
                </div>
                {/* <div className='widget-header'><i className='material-icons p-right'>filter</i> Filter</div> */}
                <div className='widget'>
                  <select className='btn btn-chip btn-chip-custom m-right-1'>
                    <option value='voucher_date'>Voucher Date</option>
                    <option value='entry_date'>EntryDate</option>
                  </select>
                  <label class='switch-container'>
                    <p>Multiple Dates</p>
                    <div class='switch'>
                      <input
                        type='checkbox'
                        name='filter_date'
                        onChange={({ target }) =>
                          this.onDateFilterHandler(!target.checked ? 'custom_single' : 'custom')}
                        checked={this.state.filter_date !== 'today' && this.state.filter_date !== 'custom_single'}
                      />
                      <span class='slider' />
                    </div>
                  </label>
                </div>
                <div className='widget widget-calendar'>
                  {this.state.filter_date === 'today' || this.state.filter_date === 'custom_single' ? (
                    <DayPickerSingleDateController
                      date={this.state.end_date}
                      focused={true}
                      onDateChange={date => this.onSingleDateFilterChangeHandler('end_date', date)}
                      displayFormat='D MMM'
                      numberOfMonths={1}
                      small
                      noBorder
                      isOutsideRange={() => false}
                      transitionDuration={0}
                      initialVisibleMonth={() => this.state.end_date}
                      isDayHighlighted={date =>
                        date.year() === moment().year() &&
                        date.month() === moment().month() &&
                        date.date() === moment().date()}
                      isDayBlocked={date =>
                        date.year() > moment().year() ||
                        (date.year() >= moment().year() && date.month() > moment().month()) ||
                        (date.year() >= moment().year() &&
                          date.month() >= moment().month() &&
                          date.date() > moment().date())}
                      daySize={30}
                      firstDayOfWeek={6}
                      reopenPickerOnClearDates
                      hideKeyboardShortcutsPanel
                    />
                  ) : (
                    <DayPickerRangeController
                      startDate={this.state.start_date}
                      endDate={this.state.end_date}
                      onDatesChange={({ startDate, endDate }) => this.onDateFilterChangeHandler(startDate, endDate)}
                      focusedInput={this.state.focused_input}
                      onFocusChange={focusedInput =>
                        this.setState({ focused_input: focusedInput ? focusedInput : 'startDate' })}
                      displayFormat='D MMM'
                      maxDate={moment()}
                      transitionDuration={0}
                      initialVisibleMonth={() => this.state.end_date}
                      isDayHighlighted={date =>
                        date.year() === moment().year() &&
                        date.month() === moment().month() &&
                        date.date() === moment().date()}
                      isDayBlocked={date =>
                        date.year() >= moment().year() &&
                        date.month() >= moment().month() &&
                        date.date() > moment().date()}
                      numberOfMonths={1}
                      small
                      noBorder
                      isOutsideRange={() => false}
                      daySize={30}
                      firstDayOfWeek={6}
                      reopenPickerOnClearDates
                      hideKeyboardShortcutsPanel
                    />
                  )}
                </div>
                <div className='p-hor-2'>
                  <button
                    className={`btn btn-chip btn-chip-custom m-0${this.state.filter_date === 'today' ? ' active' : ''}`}
                    onClick={() => this.onDateFilterHandler('today')}
                  >
                    Today
                  </button>
                  <button
                    className={`btn btn-chip btn-chip-custom m-0${this.state.filter_date === '3_days'
                      ? ' active'
                      : ''}`}
                    onClick={() => this.onDateFilterHandler('3_days')}
                  >
                    3 Days
                  </button>
                  <button
                    className={`btn btn-chip btn-chip-custom m-0${this.state.filter_date === 'week' ? ' active' : ''}`}
                    onClick={() => this.onDateFilterHandler('week')}
                  >
                    Week
                  </button>
                  <button
                    className={`btn btn-chip btn-chip-custom m-0${this.state.filter_date === 'month' ? ' active' : ''}`}
                    onClick={() => this.onDateFilterHandler('month')}
                  >
                    Month
                  </button>
                  <button
                    className={`btn btn-chip btn-chip-custom m-0${this.state.filter_date === 'year' ? ' active' : ''}`}
                    onClick={() => this.onDateFilterHandler('year')}
                  >
                    Year
                  </button>
                </div>
              </section>

              <section className='widget-footer'>
                <ReactToPrint
                  trigger={() => (
                    <button className='btn m-bottom-2'>
                      Print This <i className='material-icons'>print</i>
                    </button>
                  )}
                  content={() => this.testRef}
                />
                <button
                  className='btn primary'
                  onClick={() => {
                    this.props.toggleModal('modal_journal_entry', true)
                  }}
                >
                  New Voucher <i className='material-icons'>post_add</i>
                </button>
              </section>
            </Fragment>
          ) : !this.props.status.failed ? (
            <Placeholder type='table' />
          ) : (
            <b style={{ padding: '10rem', color: '#dd3838' }}>{this.props.status.message}</b>
          )}
        </ActivityBar>
      </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  company        : state.main.company,
  journal        : state.journal.journal,
  status         : state.journal.status,
  account        : state.account.account,
  account_list   : state.account.account_list,
  account_status : state.account.status,
})
const mapDispatchToProps = dispatch => ({
  fetchAccount     : payload => dispatch(fetchAccount(payload)),
  fetchAccountList : payload => dispatch(fetchAccountList(payload)),
  fetchJournal     : payload => dispatch(fetchJournal(payload)),
  fetchJournalMore : payload => dispatch(fetchJournalMore(payload)),
  sendJournal      : payload => dispatch(sendJournal(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
