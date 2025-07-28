function criarLoading(mensagemFixa = "", iteracao = 0, maxIteracoes = 5) {
  return new Promise((resolve) => {
    const pontos = ["", ".", "..", "..."];

    function loop(i) {
      console.clear();
      if (mensagemFixa) {
        console.log(mensagemFixa);
        console.log(`\nRedirecionando${pontos[i % pontos.length]}`);
      } else {
        console.log(`Loading${pontos[i % pontos.length]}`);
      }

      if (i < maxIteracoes) {
        setTimeout(() => loop(i + 1), 500);
      } else {
        console.clear();
        resolve();
      }
    }

    loop(iteracao);
  });
}

function mostrarLoading(iteracao = 0, maxIteracoes = 5) {
  return criarLoading("", iteracao, maxIteracoes);
}

function redirecionando(iteracao = 0, maxIteracoes = 5) {
  return criarLoading("⚠️ Opção inválida! Tente novamente.", iteracao, maxIteracoes);
}

export { mostrarLoading, redirecionando };
