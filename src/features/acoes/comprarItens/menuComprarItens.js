import {
  perguntarItemCompra,
  exibirMensagemCompra,
  exibirMensagemErro,
  exibirMensagemRetornoLoja,
} from "./menus/menuMensagensLoja";
import { menuLoja } from "./menus/menuLoja";
import { redirecionando } from "../../../utils/menuLoading";
import { menuAcaoPersonagem } from "../menuAcao";
import { comprarItem } from "./executarItens";
import { atualizarPersonagem } from "../../../context/gerenciadorPersonagem";

async function selecionarItemCompra(itensDisponiveis, categoria, personagem) {
  const escolha = await perguntarItemCompra();

  if (escolha === 0) {
    exibirMensagemRetornoLoja();
    return setTimeout(async () => {
      console.clear();
      await menuLoja();
    }, 3000);
  }

  const item = itensDisponiveis.find((i) => i.id === escolha);
  if (!item) {
    await redirecionando();
    return selecionarItemCompra(itensDisponiveis, categoria, personagem);
  }

  await processarCompra(item, categoria, personagem);
}

async function processarCompra(item, categoria, personagem) {
  const resultado = comprarItem(
    item.id,
    item.nome,
    item.preco,
    item.pontos,
    categoria,
    personagem
  );

  if (resultado.sucesso) {
    exibirMensagemCompra(resultado.nome, resultado.saldoRestante);
    return setTimeout(async () => {
      console.clear();
      atualizarPersonagem(resultado.personagemNovo);
      await menuAcaoPersonagem();
    }, 3000);
  }

  exibirMensagemErro(resultado.mensagem);
  setTimeout(async () => {
    console.clear();
    await menuLoja();
  }, 3000);
}

export { selecionarItemCompra };