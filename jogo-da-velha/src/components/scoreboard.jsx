import React from 'react'
import { Link } from 'react-router-dom'

import { Storage } from './../storage/storage'

// Criando componente scoreboard
export class Scoreboard extends React.Component {
  state = {
    scoreboard: []
  }

    // Após o componente ser criado, carrega todos os dados do armazenamento local e atualize o estado do componente
  async componentDidMount() {
    let storage = await new Storage().getData()

    this.setState({
      scoreboard: storage
    })
  }

  render() {
    return (
      <div className="game">
        <h1>Jogos recentes:</h1>

                {/* Lista de jogos anteriores */}
        <ul>
          {this.state.scoreboard.map((leader, key) => {
            return <li key={key}>{leader}</li>
          })}
        </ul>

                {/* Link para novo jogo */}
        <Link to="/board">
          <button className="btn">Começar novo jogo</button>
        </Link>
      </div>
    )
  }
}