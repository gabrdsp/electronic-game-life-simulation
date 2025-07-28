import { useQuestion } from "../../../../services/question/use-question";

// Perguntar qual item o jogador quer comprar
async function perguntarItemCompra() {
  const resposta = await useQuestion("\nO que deseja comprar hoje?\nDigite o número do item: ");
  return parseInt(resposta, 10);
}

// Mostrar mensagem de compra concluída
function exibirMensagemCompra(item, saldoRestante) {
  console.log(`\n✅ ${item} comprado com sucesso!`);
  console.log(`Seu saldo agora é: R$${saldoRestante}`);
}

// Mostrar mensagens de erro
function exibirMensagemErro(mensagem) {
  console.log(`❌ Ops! ${mensagem}`);
}

// Mensagem ao retornar para o menu da loja
function exibirMensagemRetornoLoja() {
  console.log("\n↩️ Retornando para o menu da loja...\n");
}

export {
  perguntarItemCompra,
  exibirMensagemCompra,
  exibirMensagemErro,
  exibirMensagemRetornoLoja
};