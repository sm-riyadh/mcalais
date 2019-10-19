import React, { Component, Fragment } from 'react'

import ChartOfAccounts from './ChartOfAccounts/ChartOfAccounts'
import Journals from './Journals/Journals'

class App extends Component {
	render() {
		return (
			<Fragment>
				<main style={{ width: '100%', display: 'flex' }}>
					<ChartOfAccounts />
					<hr />
					<Journals />
					<hr />
					<hr />
				</main>
			</Fragment>
		)
	}
}

export default App
