import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { isEmpty, map } from 'lodash'

// nouns + pronouns - darkblue
// verbs - darkred
// adjectives + adverbs - green
// prepositions + particles + to - orange
// determiner + predeterminer - purple
// conjunctions - olive
// possessives - purple
// numbers - goldenrod
// punctuation + symbols - goldenrod

const tagDetails = {
  "NN":	{
    what: "Noun",
    color: "darkblue"
  },
  "NNS":	{
    what: "Plural noun",
    color: "darkblue"
  },
  "NNP":	{
    what: "Proper noun",
    color: "darkblue"
  },
  "NNPS":	{
    what: "Plural proper noun",
    color: "darkblue"
  },
  "VB":	{
    what: "Base form verb",
    color: "darkred"
  },
  "VBP":	{
    what: "Present form verb",
    color: "darkred"
  },
  "VBZ":	{
    what: "Present form (3rd person) verb",
    color: "darkred"
  },
  "VBG":	{
    what: "Gerund form verb",
    color: "darkred"
  },
  "VBD":	{
    what: "Past tense verb",
    color: "darkred"
  },
  "VBN":	{
    what: "Past participle verb",
    color: "darkred"
  },
  "MD":	{
    what: "Modal verb",
    color: "darkred"
  },
  "JJ":	{
    what: "Adjective",
    color: "green"
  },
  "JJR":	{
    what: "Comparative adjective",
    color: "green"
  },
  "JJS":	{
    what: "Superlative adjective",
    color: "green"
  },
  "RB":	{
    what: "Adverb",
    color: "green"
  },
  "RBR":	{
    what: "Comparative adverb",
    color: "green"
  },
  "RBS":	{
    what: "Superlative adverb",
    color: "green"
  },
  "DT":	{
    what: "Determiner",
    color: "purple"
  },
  "PDT":	{
    what: "Predeterminer",
    color: "purple"
  },
  "PRP":	{
    what: "Personal Pronoun",
    color: "darkblue"
  },
  "PRP$":	{
    what: "Possessive Pronoun",
    color: "purple"
  },
  "POS":	{
    what: "Possessive",
    color: "purple"
  },
  "IN":	{
    what: "Preposition",
    color: "orange"
  },
  "RP": {
    what: "Preposition",
    color: "orange"
  },
  "PR":	{
    what: "Particle",
    color: "orange"
  },
  "TO":	{
    what: "to",
    color: "orange"
  },
  "WDT":	{
    what: "Wh-determiner",
    color: "limegreen"
  },
  "WP":	{
    what: "Wh-pronoun",
    color: "mediumorchid"
  },
  "WP$":	{
    what: "Wh-possessive",
    color: "mediumpurple"
  },
  "WRB":	{
    what: "Wh-adverb",
    color: "mediumslateblue"
  },
  "EX":	{
    what: "Expletive",
    color: "goldenrod"
  },
  "CC":	{
    what: "Coordinating conjugation",
    color: "olive"
  },
  "CD":	{
    what: "Cardinal Numbers",
    color: "goldenrod"
  },
  "LS":	{
    what: "List item marker",
    color: "goldenrod"
  },
  "UH":	{
    what: "Interjection",
    color: "goldenrod"
  },
  "FW":	{
    what: "Foreign Words",
    color: "goldenrod"
  },
  ",":	{
    what: "Comma",
    color: "goldenrod"
  },
  ":":	{
    what: "Mid-sentence punctuation",
    color: "goldenrod"
  },
  ".":	{
    what: "Sent-final punctuation",
    color: "goldenrod"
  },
  "(":	{
    what: "Left parenthesis",
    color: "goldenrod"
  },
  ")":	{
    what: "Right parenthesis",
    color: "goldenrod"
  },
  "#":	{
    what: "Pound sign",
    color: "goldenrod"
  },
  "$":	{
    what: "Currency symbols",
    color: "goldenrod"
  },
  "SYM":	{
    what: "Other symbols",
    color: "goldenrod"
  },
  "EM":	{
    what: "Emojis & emoticons",
    color: "goldenrod"
  },
}

class App extends Component {
  state = {
    text: "",
    tagged: {}
  }
  render() {
    const handleChange = (event) => {
      console.log('new text', event.target.value);
      this.setState({text: event.target.value});
    }
    const handleSubmit = (event) => {
      event.preventDefault()

      fetch('http://localhost:3000/parse', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          text: this.state.text
        })
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({tagged: data})
      })
    }
    const renderResults = () => {
      if (isEmpty(this.state.tagged)) return null
      const renderCells = () => {
        return map(this.state.tagged, (tagObj, i) => {
          console.log(tagObj);
          const word = tagObj.token
          const tag = tagObj.tag
          return (
            <div key={i} style={{backgroundColor: tagDetails[tag].color, height: '20px', color: 'white'}}>
              {word}
            </div>
          )
        })
      }
      return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxWidth: '70%' }}>
          { renderCells() }
        </div>
      )
    }
    return (
      <div className="App" style={{ maxWidth: '100%' }}>
        <form onSubmit={handleSubmit}>
          <label>
            Text:
          </label>
            <textarea rows="10" type="text" value={this.state.value} onChange={handleChange} style={{ width: "70%" }} />
            <button type="submit">Submit</button>
        </form>
        { renderResults() }
      </div>
    );
  }
}

export default App;
