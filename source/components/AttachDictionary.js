import { path } from 'ramda'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import marked from 'Engine/marked'
import './Dictionary.css'
import Overlay from './Overlay'

// On ajoute à la section la possibilité d'ouvrir un panneau d'explication des termes.
// Il suffit à la section d'appeler une fonction fournie en lui donnant du JSX
export let AttachDictionary = dictionary => Decorated =>
	class extends React.Component {
		state = {
			term: null,
			explanation: null
		}
		componentDidMount() {
			let decoratedNode = ReactDOM.findDOMNode(this.decorated)
			decoratedNode.addEventListener('click', e => {
				let term = e.target.dataset['termDefinition'],
					explanation = path([term, 'description'], dictionary)
				this.setState({ explanation, term })
			})
		}
		renderExplanationMarkdown(explanation, term) {
			return marked(`### Mécanisme: ${term}\n\n${explanation}`)
		}
		render() {
			let { explanation, term } = this.state
			return (
				<div style={{ display: 'inline-block' }}>
					<Decorated
						ref={decorated => (this.decorated = decorated)}
						{...this.props}
					/>
					{explanation && (
						<Overlay
							onOuterClick={() =>
								this.setState({ term: null, explanation: null })
							}
						>
							<div
								id="dictionaryPanel"
								dangerouslySetInnerHTML={{
									__html: this.renderExplanationMarkdown(explanation, term)
								}}
							/>
						</Overlay>
					)}
				</div>
			)
		}
	}
