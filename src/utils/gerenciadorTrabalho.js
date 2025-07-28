// arquivo criado por cecília
// seguir as regras referentes ao trabalho do cresim
import axios from 'axios'
import { getPersonagemAtual } from '../context/gerenciadorPersonagem'
import { trabalhoEnergiaGasta } from './controleEnergia'
import { higieneSalario, higieneTrabalho } from './gerenciadorHigiene'
import { redirecionando } from './menuLoading'
import { voltarAoMenuAcoes } from '../features/acoes/menuAcao'
import { exibirInfoPersonagem } from '../features/infoPersonagens'
import { regularEnergia } from './controleEnergia'
import { atualizarPersonagem } from '../context/gerenciadorPersonagem'


export async function menuTrabalhar(personagem) {git
    const emprego = await verificarEmprego(personagem)
    if (!emprego) return

    console.log(`\nCaixa atual: $${personagem.cresceleons}`)
    const salario = calcularSalario(emprego, personagem.pontosDeHabilidade)
    
    const resultado = trabalho(personagem, salario)
    if (!resultado) {
        await esperar(2000)
        voltarAoMenuAcoes()
        return
    }
    
    personagem = resultado.personagem
    const aReceber = resultado.aReceber

    console.log(`💪 Hora do expediente de ${emprego.cargo}, ${personagem.nome}!`)
    await esperar(3300)
    await animacaoTrabalho()
    console.clear()

    atualizarPersonagem({
        ...personagem,
        cresceleons: personagem.cresceleons + aReceber
    });

    exibirInfoPersonagem()    
    await esperar(6000)
    voltarAoMenuAcoes()
}

async function verificarEmprego(personagem) {
    const emprego = await getEmpregoPersonagem(personagem)
    if (!emprego) {
        console.log(`Opa, parece que ${personagem.nome} está desempregado`)
        await esperar(2000)
        voltarAoMenuAcoes()
        return null
    }
    return emprego;
}


function calcularSalario(emprego, pontosHabilidade) {
    const nivel = nivelSalario(pontosHabilidade[emprego.categoria])
    return emprego.salario.find(s => s.nivel === nivel)?.valor ?? 0
}


export function trabalho(personagem, salario) {
    if (personagem.energia < 10) {
        const infos = trabalhoEnergiaGasta(personagem, 'recalculo')
        if (!infos) return null;

        const recalculo = recalculoSalario(infos, salario)
        personagem = higieneTrabalho(personagem, recalculo.tempoTrabalhado)
        return { personagem, aReceber: higieneSalario(recalculo.salario) }
    } else {
        const tempo = trabalhoEnergiaGasta(personagem, 'jornadaPadrao')
        if (!tempo) return null

        personagem = higieneTrabalho(personagem, tempo)
        return { personagem, aReceber: higieneSalario(salario) }
    }
}


function esperar(ms) {
    return new Promise(res => setTimeout(res, ms))
}


async function getEmpregoPersonagem(personagem){
    const emprego = (await axios.get('https://emilyspecht.github.io/the-cresim/empregos.json')).data
    return emprego.find(emprego => emprego.id === personagem.trabalho)
}

async function animacaoTrabalho(){
    const frames = [
        "🚶‍➡️        🏢",
        "  🚶‍➡️      🏢",
        "    🚶‍➡️    🏢",
        "      🚶‍➡️  🏢",
        "        🚶‍➡️🏢",
        "💼",
        "  💼",
        "    💼",
        "      💼",
        "        💼",
        "          💼",
        "        💼",
        "      💼",
        "    💼",
        "  💼",
        "💼"
    ]
    for(let i = 0; i < frames.length; i++){
        console.clear()
        console.log(frames[i])
        await delay(200)
    }
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function recalculoSalario({
    cargaDeTrabalho,
    msParaCadaPontoDeEnergia,
    pontosDeEnergiaMinimo,
    nivelEnergiaAjuste,
    energiaCresimDescansado,
    tempoTrabalhado
}, salario){

    const tempoCresceleon = cargaDeTrabalho / salario
    const energiaPorCresceleon = msParaCadaPontoDeEnergia / tempoCresceleon
    const pontosAjustados = nivelEnergiaAjuste - pontosDeEnergiaMinimo

    const salarioRecalculado = pontosAjustados * energiaPorCresceleon * 0.9
    const salarioDescansado = energiaCresimDescansado * energiaPorCresceleon

    return{
        salario: salarioRecalculado + salarioDescansado,
        tempoTrabalhado: tempoTrabalhado
    }
}

function nivelSalario(pontosDeHabilidade) {
    if(!pontosDeHabilidade){
        return 'JUNIOR'
    }
    if(pontosDeHabilidade <= 16) {
        return 'JUNIOR';
    }else if (pontosDeHabilidade <= 26) {
        return 'PLENO';
    }else {
        return 'SENIOR';
    }
}
