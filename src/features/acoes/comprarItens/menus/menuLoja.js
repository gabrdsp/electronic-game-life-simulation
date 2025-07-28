import { useQuestion } from "../../../../services/question/use-question";
import { menuItens } from "../menuItensServices";
import { voltarAoMenuAcoes } from "../../menuAcao";
import { mostrarLoading, redirecionando } from "../../../../utils/menuLoading";

async function menuLoja() {
  const escolha = await useQuestion(`
🛍️========= BEM-VINDO À LOJA =========🛍️
  [1] 🍉 Gastronomia
  [2] 🎨 Pintura
  [3] 🎮 Jogos
  [4] 🪴 Jardinagem
  [5] 🎸 Música
  [X] ❌ Sair da loja
======================================

Digite o número da categoria desejada:
`);

  const categorias = {
    1: "GASTRONOMIA",
    2: "PINTURA",
    3: "JOGOS",
    4: "JARDINAGEM",
    5: "MUSICA",
  };

  if (escolha.toLowerCase() === "x") {
    console.log("\n Você saiu da loja. Até a próxima!");
    return voltarAoMenuAcoes();
  }

  const categoriaSelecionada = categorias[escolha];
  if (!categoriaSelecionada) {
    await redirecionando("Opção inválida! Redirecionando...");
    return menuLoja();
  }

  await mostrarLoading(`Carregando itens de {categoriaSelecionada}...`);
  return await menuItens(categoriaSelecionada);
}

export { menuLoja };