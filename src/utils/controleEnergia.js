// arquivo criado por cecília
// deve manter a energia do jogador regulada e conforme as atividades executadas

import { getPersonagemAtual } from '../context/gerenciadorPersonagem'
import { useQuestion } from '../services/question/use-question'
import { delay } from './gerenciadorTrabalho'
import { atualizarPersonagem } from '../context/gerenciadorPersonagem'
import { exibirInfoPersonagem } from '../features/infoPersonagens'
import { voltarAoMenuAcoes } from '../features/acoes/menuAcao'
import { verificarCheat } from '../features/gerenciadorCheats'

export function regularEnergia() {
    const personagem = getPersonagemAtual()
    if (personagem.energia > 32) {
        personagem.energia = 32
    }
    if (personagem.energia < 0) {
        personagem.energia = 0
    }
}

export async function menuDormir(personagem){
    console.log(`${personagem.nome} está com ${personagem.energia} de energia.`)
    const horasDormidas = await useQuestion(`\nBoa noite ${personagem.nome}! Quantas horas você quer dormir?`)
    verificarCheat(horasDormidas)
    const personagemDescansado = descansoEnergiaGanha(horasDormidas * 1000, personagem)
    atualizarPersonagem(personagemDescansado[0])
    await new Promise(res => setTimeout(res, 3300))
    
    await dormrirAnimacao()
    console.clear()

    const energiaRecuperada = personagemDescansado[1]

    console.log(`Bom dia, ${personagem.nome}! voce recuperou ${energiaRecuperada} de energia`);
    
    exibirInfoPersonagem()
    await new Promise(res => setTimeout(res, 5000))
    voltarAoMenuAcoes()    
}

async function dormrirAnimacao(){
    const frames = [
        "💤",
        "  💤",
        "    💤",
        "      💤",
        "        💤",
        "          💤",
        "          🐑",
        "        🐑",
        "      🐑",
        "    🐑",
        "  🐑",
        "🐑"
    ]
    for(let i = 0; i < frames.length; i++){
        console.clear()
        console.log(frames[i])
        await delay(250)
    }
}

export function descansoEnergiaGanha(tempoDormido, personagem) {
    if(tempoDormido < 5000){
        return [{
        ...personagem,
        tempoDeVida: personagem.tempoDeVida - tempoDormido,
        energia: personagem.energia
        }, 0]
    }
    const energiaRecebida = Math.floor(tempoDormido / 5000) * 4 // a cada 5000 dormidos, recebe 4 energia
    const bonusEnergia = (Math.floor(tempoDormido / 5000) - 1) * 2  // a cada 5000 a mais dormidos recebe 2 bonus energia

    regularEnergia()

    return [{
        ...personagem,
        tempoDeVida: personagem.tempoDeVida - tempoDormido,
        energia: personagem.energia + energiaRecebida + bonusEnergia
    }, (energiaRecebida + bonusEnergia)]
}

// função que gasta energia ao treinar
export function treinoEnergiaGasta(ciclosDeTreino) {
    const personagem = getPersonagemAtual()
    if (personagem.energia < (ciclosDeTreino * 4)) {
        console.log(`${personagem.nome} precisa descansar para poder treinar suas habilidades.`)
        return null
    }
    personagem.tempoDeVida -= (ciclosDeTreino * 8000) // gasta 8000ms a cada ciclo
    personagem.energia -= (ciclosDeTreino * 4) // perde 4 energia a cada ciclo 
    regularEnergia()
}

// função que gasta energia ao trabalhar
export function trabalhoEnergiaGasta(personagem, jornadaTrabalho) {
    const { tempoDeVida: tempoDeVidaInicial, energia: energiaInicial } = personagem

    if (energiaInicial < 4) {
        console.log(`${personagem.nome} não pode trabalhar agora, precisa descansar`)
        return null
    }

    const cargaTrabalho = 20000
    const energiaPorJornada = 10

    let tempoDeVidaFinal = 0
    let energiaFinal = 0

    if (jornadaTrabalho === 'recalculo') {
        const energiaMinimaTrabalho = 2
        const msPorPontoEnergia = cargaTrabalho / energiaPorJornada

        energiaFinal = energiaInicial - energiaMinimaTrabalho
        const maxTempoTrabalho = energiaFinal * msPorPontoEnergia
        tempoDeVidaFinal = tempoDeVidaInicial - maxTempoTrabalho

        personagem.tempoDeVida = tempoDeVidaFinal
        personagem.energia = energiaFinal

        const nivelEnergiaAjuste = 5
        return {
            cargaDeTrabalho: cargaTrabalho,
            msParaCadaPontoDeEnergia: msPorPontoEnergia,
            pontosDeEnergiaMinimo: energiaMinimaTrabalho,
            nivelEnergiaAjuste: nivelEnergiaAjuste,
            energiaCresimDescansado: energiaInicial - nivelEnergiaAjuste, 
            tempoTrabalhado: maxTempoTrabalho
        }
    }

    if (jornadaTrabalho === 'jornadaPadrao') {
        tempoDeVidaFinal = tempoDeVidaInicial - cargaTrabalho
        energiaFinal = energiaInicial - energiaPorJornada

        personagem.tempoDeVida = tempoDeVidaFinal
        personagem.energia = energiaFinal
        regularEnergia()
    }

    return cargaTrabalho
}