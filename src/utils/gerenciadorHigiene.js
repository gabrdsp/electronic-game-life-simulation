import { atualizarPersonagem, getPersonagemAtual } from "../context/gerenciadorPersonagem"
import { voltarAoMenuAcoes } from "../features/acoes/menuAcao";

 function higieneTrabalho(personagem, tempoTrabalhado){
    let pontosPerdidos;

    tempoTrabalhado = tempoTrabalhado ?? 20000;

    if(tempoTrabalhado <= 5000){
        pontosPerdidos = 1;
    }else if(tempoTrabalhado <= 10000){
        pontosPerdidos = 2;
    }else if(tempoTrabalhado <= 15000){
        pontosPerdidos = 3;
    }else{
        pontosPerdidos = 4;
    }


    const personagemNovo = {
        ...personagem,
        higiene: personagem.higiene - pontosPerdidos
    }

    return personagemNovo;
}

function higieneSalario(salario){
    if(getPersonagemAtual().higiene < 4){
        salario = salario * 0.9
    }

    return salario;
}

function higieneTreino(){
    const personagem = getPersonagemAtual();
    const personagemNovo = {
        ...personagem,
        higiene: personagem.higiene - 2
    };

    atualizarPersonagem(personagemNovo);
}

function verificarHigiene(atividade, tempoTrabalhado){
    atividade = atividade.toUpperCase();

    const personagem = {
        ...getPersonagemAtual()
    }

    switch(atividade){
        case "TRABALHO":
            higieneTrabalho(tempoTrabalhado);
            break;
        case "TREINO":
            higieneTreino();
    }

    const personagemAtualizado = getPersonagemAtual();

    if(personagemAtualizado.higiene <= 0){
        console.log("Por favor, vá tomar um banho 🤢")
        setTimeout(() => {
            voltarAoMenuAcoes();
        }, 3000)
        
    }

    atualizarPersonagem(personagem);
}

export {higieneTrabalho, higieneTreino, higieneSalario, verificarHigiene}


