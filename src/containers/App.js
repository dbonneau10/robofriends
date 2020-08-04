import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

// state is an object that describes the applications
// in this case, robots and whatevers entered into the search box
// this allows us to change the robots
// props are simply things that come out of state
// state is something that can change and impact the app
// usually lives in the parent component

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: '',
		}
	}

	// life-cycle hooks
	componentDidMount() {
		// get the information, then convert it to json
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }));
	}

	onSearchChange = (event) => {
		// use this.setState() any time you want to change state
		this.setState({ searchfield: event.target.value })
	}

	render () {
		const { robots, searchfield } = this.state
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		return !robots.length ?
			<h1>Loading</h1> :
			(
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					<Scroll>
						<CardList robots={filteredRobots} />
					</Scroll>
				</div>
		);
	}
}

export default App;