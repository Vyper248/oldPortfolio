import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: ''
        };
    }
    
    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
    }
    
    render(){
        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robot => robot.name.toLowerCase().includes(searchfield.toLowerCase()));
        if (robots.length === 0){
            return <h1 id='heading'>Loading Robots!!</h1>
        } else {
            return (
                <div className='page'>
                    <h1 id='heading'>Robo Friends</h1>
                    <SearchBox searchfield={this.searchfield} searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
    }
    
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(robots => this.setState({ robots: robots }))
            .catch(err => console.log(err.message));
    }
};

export default App;