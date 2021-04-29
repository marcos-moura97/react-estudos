import React from 'react'
import { Link } from 'react-router-dom'

import { Storage } from './../storage/storage'
import { Box } from './board-box'


import * as utils from '../utils/functions'

// Criando componente board
export class Board extends React.Component {
    constructor(props) {
    super(props)

        // Initialize component state
        this.state = {
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        }
    }

    storage = new Storage()


    handleBoxClick(index) {
        const boxes = this.state.boxes.slice()

        let history = this.state.history

        // Para o jogo se houver combinação vencedora
        if (utils.findWinner(boxes) || boxes[index]) {
            return
        }

        // Para o jogo se todas as caixas forem clicadas
        if(utils.areAllBoxesClicked(boxes) === true) {
            return
        }

        // Marca a caixinha com 'x' ou 'o'
        boxes[index] = this.state.xIsNext ? 'x' : 'o'

        // Adiciona um movimento ao histórico do jogo
        history.push(this.state.xIsNext ? 'x' : 'o')

        // Atualiza o estado dos componentes com os novos dados
    this.setState({
            boxes: boxes,
            history: history,
            xIsNext: !this.state.xIsNext
        })
    }

    
    handleBoardRestart = () => {
        this.setState({
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        })
    }

    render() {
        
        const winner = utils.findWinner(this.state.boxes)
        const isFilled = utils.areAllBoxesClicked(this.state.boxes)
        let status

        if (winner) {
            
            status = `O vencedor é: ${winner}!`
            
            this.storage.update([`${winner} ganhooou!`])
        } 
        
        else if(!winner && isFilled) {
            status = 'Empate!'
            
            this.storage.update(['Empate'])
        } 
        
        else
            status = `É a vez de ${(this.state.xIsNext ? 'x' : 'o')} jogar.`

        return (
            <>
                {/* Link para placar */}
                <Link to="/" className="board-link">Voltar ao placar</Link>

                {/* O tabuleiro */}
                <div className="board-wrapper">
                    <div className="board">
                        <h2 className="board-heading">{status}</h2>

                        <div className="board-row">
                            <Box value={this.state.boxes[0]} onClick={() => this.handleBoxClick(0)} />

                            <Box value={this.state.boxes[1]} onClick={() => this.handleBoxClick(1)} />

                            <Box value={this.state.boxes[2]} onClick={() => this.handleBoxClick(2)} />
                        </div>

                        <div className="board-row">
                            <Box value={this.state.boxes[3]} onClick={() => this.handleBoxClick(3)} />

                            <Box value={this.state.boxes[4]} onClick={() => this.handleBoxClick(4)} />

                            <Box value={this.state.boxes[5]} onClick={() => this.handleBoxClick(5)} />
                        </div>

                        <div className="board-row">
                            <Box value={this.state.boxes[6]} onClick={() => this.handleBoxClick(6)} />

                            <Box value={this.state.boxes[7]} onClick={() => this.handleBoxClick(7)} />

                            <Box value={this.state.boxes[8]} onClick={() => this.handleBoxClick(8)} />
                        </div>
                    </div>

                    <div className="board-history">
                        <h2 className="board-heading">Histórico de movimentos:</h2>

                        {/* Lista com histórico de jogadas */}
                        <ul className="board-historyList">
                            {this.state.history.length === 0 && <span>Sem movimentos para mostrar.</span>}

                            {this.state.history.length !== 0 && this.state.history.map((move, index) => {
                                return <li key={index}>Move {index + 1}: <strong>{move}</strong></li>
                            })}
                        </ul>
                    </div>

                    {/* Botão para iniciar novo jogo */}
                    {winner && <div className="board-footer">
                        <button className="btn" onClick={this.handleBoardRestart}>Começar novo jogo</button>
                    </div>}
                </div>
            </>
        )
    }
}