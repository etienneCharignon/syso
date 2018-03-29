import React, { Component } from 'react'
import { isEmpty, map, pick } from 'ramda'
import Aide from '../Aide'
import { reduxForm, reset } from 'redux-form'
import { getInputComponent } from 'Engine/generateQuestions'
import Satisfaction from '../Satisfaction'
import { connect } from 'react-redux'
import './conversation.css'

@reduxForm({
	form: 'conversation',
	destroyOnUnmount: false
})
@connect(
	pick([
		'currentQuestion',
		'foldedSteps',
		'themeColours',
		'situationGate',
		'targetNames',
		'done',
		'nextSteps',
		'analysis',
		'parsedRules',
		'conversationStarted'
	]),
	dispatch => ({
		reinitialise: () => {
			ReactPiwik.push(['trackEvent', 'restart', ''])
			dispatch(reset('conversation'))
			dispatch({ type: 'SET_CONVERSATION_TARGETS', reset: true })
		}
	})
)
export default class Conversation extends Component {
	render() {
		let {
			foldedSteps,
			currentQuestion,
			parsedRules,
			targetNames,
			reinitialise,
			textColourOnWhite,
			conversationStarted
		} = this.props
		if (!conversationStarted) return null
		return (
			<>
				<div id="currentQuestion">
					{currentQuestion ? (
						getInputComponent({ unfolded: true })(parsedRules, targetNames)(
							currentQuestion
						)
					) : (
						<Satisfaction />
					)}
				</div>
				<Aide />
			</>
		)
	}
}
