import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import CharacterSheet from '../components/CharacterSheet';
import SkillDisplay from './SkillDisplay';
import StatForm from './StatForm';
import GearDisplay from './GearDisplay';
import { loadCharacterData } from '../actions/character';
import { calculateStats } from '../utils/stats';

class Main extends Component {
	static propTypes = {
		character: PropTypes.shape({}).isRequired,
		modifiers: PropTypes.shape({}).isRequired,
		loadCharacter: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			character: props.character,
		};
	}

	componentWillMount = () => {
		const {
			loadCharacter,
		} = this.props;

		loadCharacter();
	}

	componentWillReceiveProps = (nextProps) => {
		const {
			character,
			modifiers,
		} = nextProps;

		this.setState({
			character: calculateStats(character.data, modifiers),
		});
	}

	render() {
		const {
			modifiers,
		} = this.props;
		const {
			character,
		} = this.state;

		return (
			<div>
				<CharacterSheet
					character={character}
					modifiers={modifiers}
				/>
				<StatForm />
				<GearDisplay />
				<SkillDisplay
					data={character}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	character: state.character,
	modifiers: state.gear.modifiers,
});

const mapDispatchToProps = {
	loadCharacter: () => loadCharacterData(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
