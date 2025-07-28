// arquivo criado por Cecília
// * fazer imports necessários

export function realizarTarefa(personagem, listaTarefas, tarefaId){
    if(!podeRealizarTarefa(personagem)) return null

    const tarefa = listaTarefas.find(id => id == tarefaId)
    const tempoTarefa = tarefa.tempo
    setTimeout(() => {
        personagem.tempoDeVida -= tempoTarefa
        // demais alterações necessárias de cada tarefa ex.: ganhar pontos de energia
        console.log('Tarefa concluída')
    }, tempoTarefa)
    // pega o tempo da tarefa e espera
    // enquanto a tarefa não acabar ele exibe uma mensagem na tela 
}

export function podeRealizarTarefa(personagem){
    if(personagem[tarefa].andamento){
        console.log(`${personagem.nome} está ocupado agora.`)
        return false
    }
    return true
}

// tarefas: dormrir, treinar/exercitar aspiracao, trabalhar, interagir, tomar banho