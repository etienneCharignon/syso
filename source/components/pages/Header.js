import React, { Component } from 'react'
import 'Components/pages/Header.css'
import { Link } from 'react-router-dom'
import screenfull from 'screenfull'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

@withRouter
@connect(state => ({
	iframe: state.iframe,
	textColourOnWhite: state.themeColours.textColourOnWhite
}))
export class Header extends Component {
	state = {
		mobileNavVisible: false
	}
	togglemobileNavVisible = () =>
		this.setState({ mobileNavVisible: !this.state.mobileNavVisible })

	render() {
		let { location } = this.props
		let appMode = ['/simu', '/règle'].find(t => location.pathname.includes(t))
		if (this.props.iframe)
			return screenfull.enabled ? (
				<div
					id="iframeFullscreen"
					onClick={() => screenfull.toggle()}
					className={appMode ? 'absolute' : ''}
				>
					{!appMode && <span>Mode plein écran</span>}
					<i
						className="fa fa-arrows-alt"
						aria-hidden="true"
						style={{ color: this.props.textColourOnWhite }}
					/>
				</div>
			) : null

		let displayHeader = !appMode

		if (!displayHeader) return null

		return (
			<div id="header">
				<Link id="brand" to="/">
					<img
						id="logo"
						src={require('Images/logo/logo-simulateur.svg')}
						alt="Un service de l'État français"
					/>
					<h1>Simulateur d'embauche</h1>
				</Link>
				<div id="headerContent">
					<div id="menuButton">
						{this.state.mobileNavVisible ? (
							<i
								className="fa fa-times"
								aria-hidden="true"
								onClick={this.togglemobileNavVisible}
							/>
						) : (
							<i
								className="fa fa-bars"
								aria-hidden="true"
								onClick={this.togglemobileNavVisible}
							/>
						)}
					</div>
					<nav className={this.state.mobileNavVisible ? 'visible' : ''}>
						<Links toggle={this.togglemobileNavVisible} />
					</nav>
					<img
						id="marianne"
						src={require('Images/marianne.svg')}
						alt="Un service de l'État français"
					/>
				</div>
			</div>
		)
	}
}

let Links = ({ toggle }) => (
	<div id="links" onClick={toggle}>
		<Link className="menu-item" to="/intégrer">
			Intégrer le module
		</Link>
		<Link className="menu-item" to="/contribuer">
			Contribuer
		</Link>
		<Link className="menu-item" to="/règles">
			Toutes nos règles
		</Link>
		<Link className="menu-item" to="/à-propos">
			À propos
		</Link>
	</div>
)

@withRouter
export class Footer extends Component {
	render() {
		let appMode = ['/simu', '/regle'].find(t =>
			this.props.location.pathname.includes(t)
		)
		if (!appMode) return null
		return (
			<div id="footer">
				<Link to="/à-propos">
					À propos <i className="fa fa-question-circle" aria-hidden="true" />
				</Link>
			</div>
		)
	}
}
