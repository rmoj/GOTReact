import React, { Component } from "react";
import Tile from "./components/Tile";
import Title from "./components/Title";
import Wrapper from "./components/Wrapper";
import pics from "./pix.json";
import "./App.css";

class App extends Component {
  // Setting this.state.pics to the pics json array
  state = {
    pics: pics,
    selectedPics: [],  // will be used for selected pics
    message: "",
    score: 0,
    total: 0
  };

  handleClick = id => {
    if (this.state.selectedPics.includes(id)) {
      // game over
      console.log("Game Over")
      this.setState({
        selectedPics: [],
        message: "That image was already selected once. Start over.",
        score: 0,
        total: (this.state.score > this.state.total) ? this.state.score : this.state.total,
      })
      // only goes through one set of 12 - needs a % test
    } else if (this.state.score === 11) {
      // found all
      this.setState({
        selectedPics: [],
        message: "Awesome! You've selected all images once. Keep going!!!",
        score: this.state.score + 1,
        total: (this.state.score + 1 > this.state.total) ? this.state.score + 1 : this.state.total,
      })
    } else {
      // add to score
      this.setState({
        selectedPics: [...this.state.selectedPics, id],
        message: "Great! That's a new image. Next...",
        score: this.state.score + 1
      }, () => console.log(`Score: ${this.state.score} Total: ${this.state.total}`))
    }

    this.shuffleArray(pics)
  };

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    };
  };

  render() {
    return (
      <Wrapper>
        <Title />
        <div class="score">
          <h3>Current Score: {this.state.score}  Highest Score: {this.state.total}</h3>
        </div>
        <div class="message">
          <h4>{this.state.message}</h4>
        </div>
        {this.state.pics.map(pic => (
          <Tile
            handleClick={this.handleClick}
            id={pic.id}
            key={pic.id}
            image={pic.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
