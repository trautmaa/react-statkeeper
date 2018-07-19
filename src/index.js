import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
}

var playersList = [];
playersList.push({id: generateKey("alex"), name: "alex", position: "cutter", assists: 0});
playersList.push({id: generateKey("ahna"), name: "ahna", position: "cutter", assists: 0});
playersList.push({id: generateKey("ben"), name: "ben", position: "cutter", assists: 0});

class PlayersListItem extends React.Component {

    // constructor(props) {
    //     super(props);
    
    //     // Define the initial state:
    //     this.state = {
    //       assists: props.player.assists,
    //     };
    // }

    // onAssistClick(e) {
    //     this.props.addAssist();
    // }

    render() {

        return (
            <ul key={this.props.player.id}>
                <li>{this.props.player.name}</li>
                <li>{this.props.player.position}</li>
                <li>{this.props.player.assists}</li>
                <li>
                    <button onClick={ this.props.addAssist.bind(this, this.props.player) } >Add Assist </button>
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
                    addAssist={this.props.addAssist}
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
    addPlayer(e){
        e.preventDefault();

        // Create an object to represent our new player
        let name = this.newPlayerName.value;
        let position = this.newPlayerPosition.value;
        let newId = generateKey(name);

        const newPlayer = {id: newId, name: name, position: position};

        // Update state with new playersList, including new player
        this.setState({
            playersList: [...this.state.playersList, newPlayer]
        })

        // Empty our form
        this.addForm.reset();
    }

    addAssist = (playerToGetAssist) => {

        const newPlayersList = this.state.playersList.map(item => {
            if (item.id === playerToGetAssist.id){
                item.assists++;
                return item;
            }
            return item;
        }
        );
        console.log("yep", newPlayersList);


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
                    addAssist={this.addAssist}
                />

                <h2>Number of players: {this.state.playersList.length}</h2>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
