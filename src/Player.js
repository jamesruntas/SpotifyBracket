import React, { Component } from "react";
import "./Player.css";
import { Checkmark } from "react-checkmark";
class Player extends Component {
  render() {
    console.log(this.props.counter);

    return (
      <>
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(120,120,120,0.5), rgba(120,120,120,0.5)), url(${this.props.songAlbum})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "50vw",
            height: "100vh",
            display: "flex",
            wordWrap: "break-word",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "100%",
          }}
        >
          {this.props.checkMark && <Checkmark />}
          {this.props.displayCurrent && (
            <h3
              style={{
                position: "absolute",
                left: 5,
                top: 5,
                fontSize: "150%",
              }}
            >
              Your Score: {this.props.counter}
            </h3>
          )}
          {this.props.displayHigh && (
            <h3
              style={{
                position: "absolute",
                right: 5,
                top: 5,
                fontSize: "150%",
              }}
            >
              High Score: {this.props.counterHigh}
            </h3>
          )}

          <div>
            <h1>{this.props.songName}</h1>
            <h2>{this.props.songArtist}</h2>
          </div>
        </div>
      </>
    );
  }
}
export default Player;
