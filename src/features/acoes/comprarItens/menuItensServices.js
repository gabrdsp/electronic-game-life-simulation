import axios from "axios";
import { exibirItens} from "./menus/menuItens.js";
import { selecionarItemCompra } from "./menuComprarItens.js";
import { getPersonagemAtual } from "../../../context/gerenciadorPersonagem.js";

async function menuItens(categoria) {
  const personagem = getPersonagemAtual();
  const itens = await buscarItensPorCategoria(categoria);

  if (itens.length === 0) {
    return console.log("Nenhum item disponível nesta categoria.");
  }

  exibirItens(itens, categoria, personagem.cresceleons);
  await selecionarItemCompra(itens, categoria, personagem);
}

async function buscarItensPorCategoria(categoria) {
  try {
    const { data } = await axios.get("https://emilyspecht.github.io/the-cresim/itens-habilidades.json");
    return data[categoria] || [];
  } catch (err) {
    console.error("Erro ao buscar os itens da loja:", err);
    return [];
  }
}

export { menuItens };