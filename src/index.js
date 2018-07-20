import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// Create unique key for react to use in lists
const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
}

// Initialize with a few players
var playersList = [];
playersList.push({id: generateKey("alex"), name: "alex", position: "cutter", assists: 0, goals: 0, turns: 0, dees: 0});
playersList.push({id: generateKey("ahna"), name: "ahna", position: "cutter", assists: 0, goals: 0, turns: 0, dees: 0});
playersList.push({id: generateKey("ben"), name: "ben", position: "cutter", assists: 0, goals: 0, turns: 0, dees: 0});

class PlayersListItem extends React.Component {

    render() {
        return (
            <ul key={this.props.player.id}>
                <li>{this.props.player.name}</li>
                <li>{this.props.player.position}</li>
                <li>{this.props.player.assists}</li>
                <li>
                    <button onClick={ this.props.increment.bind(this, this.props.player, "assists") } >Add Assist </button>
                </li>
                <li>{this.props.player.goals}</li>
                <li>
                    <button onClick={ this.props.increment.bind(this, this.props.player, "goals") } >Add Goal </button>
                </li>
                <li>{this.props.player.turns}</li>
                <li>
                    <button onClick={ this.props.increment.bind(this, this.props.player, "turns") } >Add Turn </button>
                </li>
                <li>{this.props.player.dees}</li>
                <li>
                    <button onClick={ this.props.increment.bind(this, this.props.player, "dees") } >Add Dee </button>
                </li>
                <li>
                    <button onClick={ this.props.removePlayer.bind(this, this.props.player) } >Remove Player</button>
                </li>
            </ul>
        )
    }

}

class PlayerList extends React.Component {

    render() {
        const playersListItems = this.props.list.map( item => {
            return (
                < PlayersListItem 
                    key={item.id}
                    player={item}
                    removePlayer={this.props.removePlayer}
                    increment={this.props.increment}
                />
            )
        });

        return (
            <div>
                { playersListItems }
            </div>
        )
    }
}

class Controls extends React.Component {
    render() {
        return (
            <div>These are the controls.</div>
        )
    }
}

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            playersList: playersList,
        }
    }

    // Add player function
    addPlayer(e) {
        e.preventDefault();

        // Create an object to represent our new player
        let name = this.newPlayerName.value;
        let position = this.newPlayerPosition.value;
        let newId = generateKey(name);

        const newPlayer = {
            id: newId, 
            name: name, 
            position: position, 
            assists: 0, 
            goals: 0, 
            turns: 0, 
            dees: 0
        };

        // Update state with new playersList, including new player
        this.setState({
            playersList: [...this.state.playersList, newPlayer]
        })

        // Empty our form
        this.addForm.reset();
    }

    // Increment the number of assists a player has
    increment = (playerToIncrement, statToIncrement) => {
        const newPlayersList = this.state.playersList.map(item => {
            if (item.id === playerToIncrement.id){
                item[statToIncrement]++;
                return item;
            }
            return item;
        }
        );
        console.log(newPlayersList)
        // Always update state through this.setState
        this.setState({
            playersList: newPlayersList
        });
    }


    // Remove a player from the list
    removePlayer = (playerToRemove) => {

        // Create new list, filtering by all players who are not *this* player
        var newPlayersList = this.state.playersList.filter(function (_player) {
            return _player !== playerToRemove
        });

        // Always update state through this.setState
        this.setState({
            playersList: newPlayersList
        });
    }

    render() {
        return (
            <div>
                <h1>Ultimate Stat Keeper</h1>
                < Controls />

                <form ref={input => this.addForm = input } className="form-inline" onSubmit={(e) => {this.addPlayer(e)}}>
                    <input ref={input => this.newPlayerName = input } type="text" placeholder="Player" />
                    <input ref={input => this.newPlayerPosition = input } type="text" placeholder="Position" />
                    <button type="submit">Add</button>
                </form>

                < PlayerList 
                    list={this.state.playersList}
                    removePlayer={this.removePlayer}
                    increment={this.increment}
                />

                <h2>Number of players: {this.state.playersList.length}</h2>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
