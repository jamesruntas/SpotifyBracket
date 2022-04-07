import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import "./App.css";
import concert from "./images/liveMusic.jpg";
import logo from "./images/spotify.jpg";
import endConcert from "./images/endImage.jpg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      song1Name: "",
      song2Name: "",
      song1Artist: "",
      song2Artist: "",
      song1Album: "",
      song2Album: "",
      song1Popularity: "",
      song2Popularity: "",
      progress_ms: 0,
      no_data: false,
      score: 0,
      highScore: 0,
      checkMark1: false,
      checkMark2: false,
      endGame: false,
      correct1: false,
      correct2: false,
    };
  }

  componentDidMount() {
    // Set token

    localStorage.setItem("highScore", 0);
    this.setState({ highScore: localStorage.getItem("highScore") });
    sessionStorage.setItem("offset", 0);
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getSongs(_token);
    }
  }

  newSongs() {
    // Make a call using the token

    let offset = sessionStorage.getItem("offset");

    $.ajax({
      url: `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=50`,
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
      },
      success: (data) => {
        // Checks if the data is not empty
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        sessionStorage.setItem(
          "offset",
          Math.floor(Math.random() * data.total) - 50
        );

        let firstSongName = "";
        let secondSongName = "";
        let firstSongArtist = "";
        let secondSongArtist = "";
        let firstSongAlbum = "";
        let secondSongAlbum = "";
        let firstSongPopularity = "";
        let secondSongPopularity = "";
        while (firstSongName == secondSongName) {
          let randomIndex1 = data.items[Math.floor(Math.random() * 50)];
          let randomIndex2 = data.items[Math.floor(Math.random() * 50)];
          firstSongName = randomIndex1.track.name;
          secondSongName = randomIndex2.track.name;
          firstSongArtist = randomIndex1.track.artists[0].name;
          secondSongArtist = randomIndex2.track.artists[0].name;
          firstSongAlbum = randomIndex1.track.album.images[0].url;
          secondSongAlbum = randomIndex2.track.album.images[0].url;
          firstSongPopularity = randomIndex1.track.popularity;
          secondSongPopularity = randomIndex2.track.popularity;
        }
        this.setState({
          song1Name: firstSongName,
        });
        this.setState({
          song2Name: secondSongName,
        });
        this.setState({ song1Artist: firstSongArtist });
        this.setState({ song2Artist: secondSongArtist });
        this.setState({
          song1Album: firstSongAlbum,
        });
        this.setState({
          song2Album: secondSongAlbum,
        });
        this.setState({ song1Popularity: firstSongPopularity });
        this.setState({ song2Popularity: secondSongPopularity });
      },
    });
  }
  newGame = () => {
    this.setState({ score: 0 });
    // Make a call using the token

    let offset = sessionStorage.getItem("offset");

    $.ajax({
      url: `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=50`,
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
      },
      success: (data) => {
        // Checks if the data is not empty
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        sessionStorage.setItem(
          "offset",
          Math.floor(Math.random() * data.total) - 50
        );

        let firstSongName = "";
        let secondSongName = "";
        let firstSongArtist = "";
        let secondSongArtist = "";
        let firstSongAlbum = "";
        let secondSongAlbum = "";
        let firstSongPopularity = "";
        let secondSongPopularity = "";
        while (firstSongName == secondSongName) {
          let randomIndex1 = data.items[Math.floor(Math.random() * 50)];
          let randomIndex2 = data.items[Math.floor(Math.random() * 50)];
          firstSongName = randomIndex1.track.name;
          secondSongName = randomIndex2.track.name;
          firstSongArtist = randomIndex1.track.artists[0].name;
          secondSongArtist = randomIndex2.track.artists[0].name;
          firstSongAlbum = randomIndex1.track.album.images[0].url;
          secondSongAlbum = randomIndex2.track.album.images[0].url;
          firstSongPopularity = randomIndex1.track.popularity;
          secondSongPopularity = randomIndex2.track.popularity;
        }
        this.setState({
          song1Name: firstSongName,
        });
        this.setState({
          song2Name: secondSongName,
        });
        this.setState({ song1Artist: firstSongArtist });
        this.setState({ song2Artist: secondSongArtist });
        this.setState({
          song1Album: firstSongAlbum,
        });
        this.setState({
          song2Album: secondSongAlbum,
        });
        this.setState({ song1Popularity: firstSongPopularity });
        this.setState({ song2Popularity: secondSongPopularity });
      },
    });
    setTimeout(() => {
      this.setState({ endGame: false });
    }, 200);
  };

  leftSide = async () => {
    if (this.state.song1Popularity > this.state.song2Popularity) {
      this.setState({ score: this.state.score + 1 });
      this.setState({ song1Name: "" });
      this.setState({ song1Artist: "" });
      this.setState({ checkMark1: true });
      this.setState({ correct1: true });

      setTimeout(() => {
        this.setState({ checkMark1: false });
        this.setState({ correct1: false });

        this.newSongs();
      }, 2000);
    } else if (this.state.song1Popularity < this.state.song2Popularity) {
      this.setState({ song1Name: "You are" });
      this.setState({ song1Artist: "WRONG!!" });
      this.setState({ endGame: true });

      if (this.state.score > localStorage.getItem("highScore")) {
        localStorage.setItem("highScore", this.state.score);
        this.setState({ highScore: localStorage.getItem("highScore") });
      }
    } else {
      this.setState({ song1Name: "" });
      this.setState({ song1Artist: "" });
      this.setState({ checkMark1: true });
      this.setState({ correct1: true });
      setTimeout(() => {
        this.setState({ checkMark1: false });
        this.setState({ correct1: false });
        this.newSongs();
      }, 2000);
    }
  };
  rightSide = () => {
    if (this.state.song1Popularity < this.state.song2Popularity) {
      this.setState({ score: this.state.score + 1 });
      this.setState({ song2Name: "" });
      this.setState({ song2Artist: "" });
      this.setState({ checkMark2: true });
      this.setState({ correct2: true });
      setTimeout(() => {
        this.setState({ checkMark2: false });
        this.setState({ correct2: false });
        this.newSongs();
      }, 2000);
    } else if (this.state.song1Popularity > this.state.song2Popularity) {
      this.setState({ song2Name: "You are" });
      this.setState({ song2Artist: "WRONG!" });
      this.setState({ endGame: true });

      if (this.state.score > localStorage.getItem("highScore")) {
        localStorage.setItem("highScore", this.state.score);
        this.setState({ highScore: localStorage.getItem("highScore") });
      }
    } else {
      this.setState({ song2Name: "" });
      this.setState({ song2Artist: "" });
      this.setState({ checkMark2: true });
      this.setState({ correct2: true });

      setTimeout(() => {
        this.setState({ checkMark2: false });
        this.setState({ correct2: false });
        this.newSongs();
      }, 2000);
    }
  };

  getSongs(token) {
    // Make a call using the token
    let offset = sessionStorage.getItem("offset");
    $.ajax({
      url: `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=50`,
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        // Checks if the data is not empty
        console.log(data);
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        sessionStorage.setItem(
          "offset",
          Math.floor(Math.random() * data.total) - 50
        );

        let firstSongName = "";
        let secondSongName = "";
        let firstSongArtist = "";
        let secondSongArtist = "";
        let firstSongAlbum = "";
        let secondSongAlbum = "";
        let firstSongPopularity = "";
        let secondSongPopularity = "";
        while (firstSongName == secondSongName) {
          let randomIndex1 = data.items[Math.floor(Math.random() * 50)];
          let randomIndex2 = data.items[Math.floor(Math.random() * 50)];
          firstSongName = randomIndex1.track.name;
          secondSongName = randomIndex2.track.name;
          firstSongArtist = randomIndex1.track.artists[0].name;
          secondSongArtist = randomIndex2.track.artists[0].name;
          firstSongAlbum = randomIndex1.track.album.images[0].url;
          secondSongAlbum = randomIndex2.track.album.images[0].url;
          firstSongPopularity = randomIndex1.track.popularity;
          secondSongPopularity = randomIndex2.track.popularity;
        }
        this.setState({
          song1Name: firstSongName,
        });
        this.setState({
          song2Name: secondSongName,
        });
        this.setState({ song1Artist: firstSongArtist });
        this.setState({ song2Artist: secondSongArtist });
        this.setState({
          song1Album: firstSongAlbum,
        });
        this.setState({
          song2Album: secondSongAlbum,
        });
        this.setState({ song1Popularity: firstSongPopularity });
        this.setState({ song2Popularity: secondSongPopularity });
      },
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.token && (
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(120,120,120,0.7), rgba(120,120,120,0.7)), url(${concert})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "100vw",
                height: "100vh",
                display: "flex",
                wordWrap: "break-word",
                alignItems: "center",
                justifyContent: "center",

                fontSize: "100%",
              }}
            >
              <div>
                <h3 className="title"> Do you know your tunes?</h3>
                <br></br>
                <div
                  style={{
                    marginLeft: 0,
                    marginRight: 0,
                    bacgkround: "white",
                    borderStyle: "solid",
                    marginTop: "5%",
                    marginBottom: "5%",
                    marginRight: "25%",
                    marginLeft: "25%",
                    color: "white",
                  }}
                >
                  {" "}
                  How this game works is it will ask permission to acess your
                  saved songs. This is all done through the Spotify API so I do
                  not actually see any credentials or anything. Once you allow
                  this game to see your saved songs, it will query and randomly
                  pick 2 songs. You will have to decide which of these songs you
                  believe is the more popular one and click on it. Good Luck!!
                </div>

                <br></br>
                <div class="wrapper">
                  <div class="link_wrapper">
                    <a
                      href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                        "%20"
                      )}&response_type=token&show_dialog=true`}
                    >
                      Play
                    </a>
                    <div class="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 268.832 268.832"
                      >
                        <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {this.state.endGame && (
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(120,120,120,0.7), rgba(120,120,120,0.7)), url(${endConcert})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "100vw",
                height: "100vh",
                display: "flex",
                wordWrap: "break-word",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <div> Good Try... Your score was: {this.state.score}</div>
                <br></br>
                <div>
                  {" "}
                  Try to beat your highscore of:{" "}
                  {localStorage.getItem("highScore")}
                </div>
                <br></br>
                <br></br>
                <button
                  onClick={this.newGame}
                  className="btn btn--loginApp-link"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
          {this.state.token && !this.state.no_data && !this.state.endGame && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {this.state.correct2 && (
                <button style={{ color: "white" }}>
                  <Player
                    songName={this.state.song1Name}
                    songArtist={this.state.song1Artist}
                    songAlbum={this.state.song1Album}
                    displayCurrent={true}
                    counter={this.state.score}
                    checkMark={this.state.checkMark1}
                  />
                </button>
              )}
              {!this.state.correct2 && (
                <button
                  className="hov"
                  style={{ color: "white" }}
                  onClick={this.leftSide}
                >
                  <Player
                    songName={this.state.song1Name}
                    songArtist={this.state.song1Artist}
                    songAlbum={this.state.song1Album}
                    displayCurrent={true}
                    counter={this.state.score}
                    checkMark={this.state.checkMark1}
                  />
                </button>
              )}
              {this.state.correct1 && (
                <button style={{ color: "white" }}>
                  <Player
                    songName={this.state.song2Name}
                    songAlbum={this.state.song2Album}
                    songArtist={this.state.song2Artist}
                    displayHigh={true}
                    counterHigh={this.state.highScore}
                    checkMark={this.state.checkMark2}
                  />
                </button>
              )}
              {!this.state.correct1 && (
                <button
                  className="hov"
                  style={{ color: "white" }}
                  onClick={this.rightSide}
                >
                  <Player
                    songName={this.state.song2Name}
                    songAlbum={this.state.song2Album}
                    songArtist={this.state.song2Artist}
                    displayHigh={true}
                    counterHigh={this.state.highScore}
                    checkMark={this.state.checkMark2}
                  />
                </button>
              )}
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
