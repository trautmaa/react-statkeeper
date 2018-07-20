import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 


// Create unique key for react to use in lists
const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
}

// Initialize with a few players
var playersList = [];
playersList.push({ id: generateKey("alex"), name: "alex", position: "cutter", assists: 0, goals: 0, turns: 0, dees: 0, in: false, seconds: 4 });
playersList.push({ id: generateKey("ahna"), name: "ahna", position: "cutter", assists: 0, goals: 0, turns: 0, dees: 0, in: false, seconds: 0 });
playersList.push({ id: generateKey("ben"), name: "ben", position: "cutter", assists: 0, goals: 0, turns: 0, dees: 0, in: false, seconds: 143 });

class PlayersListItem extends React.Component {

    getSeconds() {
        return ("0" + this.props.player.seconds % 60).slice(-2);
    }

    getMinutes() {
        return Math.floor(this.props.player.seconds / 60);
    }

    render() {
        var ulClass = this.props.player.in ? "in" : "out";
        return (
            <ul key={this.props.player.id} className= {ulClass} >
                <li>{this.props.player.name}</li>
                <li>{this.props.player.position}</li>
                <li onClick={this.props.increment.bind(this, this.props.player, "assists")} >
                    {this.props.player.assists}
                </li>
                <li onClick={this.props.increment.bind(this, this.props.player, "goals")} >
                    {this.props.player.goals}
                </li>
                <li onClick={this.props.increment.bind(this, this.props.player, "turns")} >
                    {this.props.player.turns}
                </li>
                <li onClick={this.props.increment.bind(this, this.props.player, "dees")}>
                    {this.props.player.dees}
                </li>
                <li onClick={this.props.toggleWatch.bind(this, this.props.player)}>
                    {this.getMinutes()}:{this.getSeconds()}
                </li>
                <li onClick={this.props.removePlayer.bind(this, this.props.player)} >
                    <i className="fa fa-trash"></i>
                </li>
            </ul>
        )
    }

}

class PlayerList extends React.Component {

    render() {
        const playersListItems = this.props.list.map(item => {
            return (
                < PlayersListItem
                    key={item.id}
                    player={item}
                    removePlayer={this.props.removePlayer}
                    increment={this.props.increment}
                    toggle={this.props.toggle}
                    toggleWatch={this.props.toggleWatch}
                />
            )
        });

        return (
            <div className="table">
                <ul className="top-row">
                    <li>Name</li>
                    <li>Position</li>
                    <li>Assists</li>
                    <li>Goals</li>
                    <li>Turns</li>
                    <li>Dees</li>
                    <li>Playing Time</li>
                </ul>
                {playersListItems}
            </div>
        )
    }
}

class Controls extends React.Component {
    render() {
        return (
            <div></div>
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
            dees: 0,
            in: false,
            seconds: 0,
        };

        // Update state with new playersList, including new player
        this.setState({
            playersList: [...this.state.playersList, newPlayer]
        })

        // Empty our form
        this.addForm.reset();
    }

    // Increment value for a player
    increment = (playerToIncrement, statToIncrement) => {
        const newPlayersList = this.state.playersList.map(item => {
            if (item.id === playerToIncrement.id) {
                item[statToIncrement]++;
                return item;
            }
            return item;
        }
        );
        // Always update state through this.setState
        this.setState({
            playersList: newPlayersList
        });
    }

    // Toggle time on and off
    toggleWatch = (playerToToggle) => {

        var _this = this;
        let player = this.state.playersList.filter( player => player.id === playerToToggle.id )[0];
        let playerIsIn = player.in;

        if (!playerIsIn) {
            player.in = "true";
            player.incrementer = setInterval(function () {
                const newPlayersList = _this.state.playersList.map(item => {
                    if (item.id === playerToToggle.id) {
                            item.seconds = playerToToggle.seconds + 1;
                        return item;
                    }
                    return item;
                });
                _this.setState({
                    playersList: newPlayersList
                });
            }, 1000);
        }
        else {
            const newPlayersList = _this.state.playersList.map(item => {
                if (item.id === playerToToggle.id) {
                        item.in = false;
                        clearInterval( item.incrementer );
                    return item;
                }
                return item;
            });

            _this.setState({
                playersList: newPlayersList
            });

        }
    

        // If player is "in": stop


        // If player is not "in": start
        
        // Always update state through this.setState

       
    }


    // Toggle value for a player
    toggle = (playerToToggle, statToToggle) => {
        const newPlayersList = this.state.playersList.map(item => {
            if (item.id === playerToToggle.id) {
                item[statToToggle] = !playerToToggle[statToToggle];
                return item;
            }
            return item;
        });
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

                <form ref={input => this.addForm = input} className="form-inline" onSubmit={(e) => { this.addPlayer(e) }}>
                    <input ref={input => this.newPlayerName = input} type="text" placeholder="Player" />
                    <input ref={input => this.newPlayerPosition = input} type="text" placeholder="Position" />
                    <button type="submit"><i className="fa fa-plus"></i></button>
                </form>

                < PlayerList
                    list={this.state.playersList}
                    removePlayer={this.removePlayer}
                    increment={this.increment}
                    toggle={this.toggle}
                    toggleWatch={this.toggleWatch}
                />

            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
