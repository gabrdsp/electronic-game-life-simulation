// Arquivo criado por Adrian e Gabriel

function deletarPersonagem(indexPersonagem, listaPersonagens) {
    const novosPersonagens = listaPersonagens.filter((p, index)=> {
        return index != indexPersonagem - 1
    })

    return novosPersonagens
}

// Função utilizada para setar os valores do novo personagem : 
function setarValoresPersonagem(listaPersonagens, nome, escolha, cargo) {
    const id = listaPersonagens.length > 0 
        ? Math.max(...listaPersonagens.map(p => p.id)) + 1 
        : 1;

    const personagem = {
        id,
        nome: nome,
        aspiracao: escolha,
        tempoDeVida: 3600000, // 60 dias = 1 hora de jogo
        energia: 32,
        higiene: 28,
        cresceleons: 1500,
        pontosDeHabilidade: {},
        trabalho: cargo,
        itens: [],
        interacoes: {}
    };

    return personagem;
}

export { setarValoresPersonagem, deletarPersonagem };