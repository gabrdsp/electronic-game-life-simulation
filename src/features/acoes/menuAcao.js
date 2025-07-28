//Arquivo criado por Adrian e Gabriel
import { useQuestion } from "../../services/question/use-question";
import { voltarAoMenuPrincipal } from "../../../index";
import { verificarCheat } from "../gerenciadorCheats";
import { menuTomarBanho } from "./banho/tomarBanho";
import { getPersonagemAtual } from "../../context/gerenciadorPersonagem";
import { menuLoja } from "../acoes/comprarItens/menus/menuLoja";
import { menuTreinar } from "../acoes/habilidades/treinarHabilidades";
import { verificarMortePersonagem } from "../../utils/gerenciadorMortePersonagem";
import { executarListagemPersonagens } from ".././acoes/interacoes/interacaoServices";
import { menuTrabalhar } from "../../utils/gerenciadorTrabalho";
import { menuDormir } from "../../utils/controleEnergia";


//Função que mostra o menu de ações para o usuário

async function menuAcaoPersonagem() {
  const personagemAtual = getPersonagemAtual();

  if (!personagemAtual) {
    console.log("Nenhum personagem atual definido. Voltando ao menu principal.");
    voltarAoMenuPrincipal();
    return;
  }

  if (personagemAtual.tempoDeVida <= 0) {
    voltarAoMenuPrincipal();
    return;
  }

  if (getPersonagemAtual().energia === 0) {
    let escolhaDormir = await useQuestion(
      `Você está muito cansado! Escolha a opção de dormir\n1.Dormir\n\nx.Voltar ao menu principal`
    );
    switch (escolhaDormir.toLowerCase()) {
      case "1":
        await menuDormir(getPersonagemAtual())
        break;
      case "x":
        console.clear();
        voltarAoMenuPrincipal();
        break;
      default:
        console.clear();
        await verificarCheat(escolhaDormir, voltarAoMenuAcoes());
    }

    return;
  }

  let escolha = await useQuestion(`

╔════════════════════════════════════════╗
║ Escolha uma das opções:                ║
║                                        ║
║   1 - 💼   Trabalhar                   ║
║   2 - 🏋️‍♂️   Treinar Habilidade          ║
║   3 - 🛏️    Dormir                      ║
║   4 - 🛁   Tomar Banho                 ║
║   5 - 🛒   Comprar Item                ║
║   6 - 🤝   Interagir Com Outros        ║
║   x - ❌   Voltar ao Menu Principal    ║
║                                        ║
╚════════════════════════════════════════╝
`);

  switch (escolha.toLowerCase()) {
    case "1":
      await menuTrabalhar(getPersonagemAtual())
      break;

    case "2":
      await menuTreinar(getPersonagemAtual());
      break;

    case "3":
      await menuDormir(getPersonagemAtual())
      break;

    case "4":
      await menuTomarBanho(getPersonagemAtual())
      break;

    case "5":
      await menuLoja();
      break;

    case "6":
      await executarListagemPersonagens();
      break;

    case "x":
      console.clear();
      voltarAoMenuPrincipal();
      break;

    default:
      await verificarCheat(escolha, voltarAoMenuAcoes())
  }
}

//Função para retornar ao menu de ações
function voltarAoMenuAcoes() {
  console.clear();
  menuAcaoPersonagem();
}

export { menuAcaoPersonagem, voltarAoMenuAcoes };