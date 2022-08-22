import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./poke.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { myPokemon: "", numPokemon: [] };
  }

  handleChange = (e) => {
    this.setState({ myPokemon: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();

    const API = `https://pokeapi.co/api/v2/pokemon/${this.state.myPokemon}/`;
    const res = await axios.get(API); // telling our function to wait till the site is loaded

    this.setState({ numPokemon: res.data }, () =>
      console.log(this.state.numPokemon)
    );
  };

  render() {
    return (
      <>
        {/* Form onSubmit allows you to hit enter to submit info */}
        {/* you can have either input type submit or button submit that triggers the function */}
        <Form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange}></input>
        </Form>
        <Button type="submit" onClick={this.handleSubmit}>
          Search
        </Button>

        <div className = "pokedexBody">

        {Object.values(this.state.numPokemon).map((poke) => {
          return (
            <>  
            <Card style = {{width: "200px",
                            height : "200px", 
                            border: "none", 
                            backgroundColor: "red",
                            }}>
              <Card.Body style = {{border: "none"}}>

              <div className = "pokeName"><Card.Title>{poke.name}</Card.Title></div>


              <div className = "pokeImage"><Card.Img src={poke.front_default} 
                                                        //   variant = "top" 
                                                          height = "200px" 
                                                          width = "200px" 
                                                          border = "none"
                                                          /></div>
              </Card.Body>
            </Card>
            </>
          );
        })}

        {Object.values(this.state).map((poke)=>{
            return(
                <>
                <div className = "screen"></div>
                <h1>{poke.name}</h1>
                </>
          );
        })}
            

        </div> {/* end of pokedex body */}

        
        

      </>
    );
  }
}
