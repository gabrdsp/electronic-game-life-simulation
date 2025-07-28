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


export async function menuTrabalhar(personagem){
    const empregoPersonagem = await getEmpregoPersonagem(personagem)
    if (!empregoPersonagem){
        console.log(`Opa, parece que ${personagem.nome} está desempregado`)
        await new Promise(res => setTimeout(res, 2000))
        voltarAoMenuAcoes()
        return
    }
    console.log(`\nCaixa atual: $${personagem.cresceleons}`)

    const categoria = empregoPersonagem.categoria
    const pontosHabilidadePersonagem = personagem.pontosDeHabilidade 
    const nivel = nivelSalario(pontosHabilidadePersonagem[categoria])
    const salario = empregoPersonagem.salario.find(s => s.nivel === nivel)?.valor ?? 0

    let aReceber = 0
    if(personagem.energia < 10){
        const infosTrabalhoEnergia = trabalhoEnergiaGasta(personagem, 'recalculo')
        if(!infosTrabalhoEnergia){
            await new Promise(res => setTimeout(res, 2000))
            voltarAoMenuAcoes()
            return
        }
        const recalculo = recalculoSalario(infosTrabalhoEnergia, salario)
        personagem = higieneTrabalho(personagem, recalculo.tempoTrabalhado)
        aReceber = higieneSalario(recalculo.salario)
    }else{
        const tempoTrabalhado = trabalhoEnergiaGasta(personagem, 'jornadaPadrao') // passar a jornada de trabalho
        if(!tempoTrabalhado){
            await new Promise(res => setTimeout(res, 2000))
            voltarAoMenuAcoes()
            return
        }
        personagem = higieneTrabalho(personagem, tempoTrabalhado)
        aReceber = higieneSalario(salario)
    }
    
    console.log(`💪 Hora do expediente de ${empregoPersonagem.cargo}, ${personagem.nome}!`)
    
    await new Promise(res => setTimeout(res, 3300))
    
    await animacaoTrabalho()
    console.clear()
    
    
    
    atualizarPersonagem({
        ...personagem,
        cresceleons: personagem.cresceleons + aReceber
    })
    exibirInfoPersonagem()    

    await new Promise(res => setTimeout(res, 6000))
    voltarAoMenuAcoes()
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
