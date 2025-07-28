//Arquivo criado por Adrian
import { atualizarPersonagem} from "../../../context/gerenciadorPersonagem";
import { useQuestion } from "../../../services/question/use-question";
import { voltarAoMenuAcoes } from "../menuAcao";
import { tomarBanho } from "../../executarAcoes";
import { exibirInfoPersonagem } from "../../infoPersonagens";
import { verificarCheat } from "../../gerenciadorCheats";

const DURACAO_BANHO_MS = 3000;
const INTERVALO_ANIMACAO_MS = 350;


//Função que mostra o menu com as opções tomar banho e voltar
async function menuTomarBanho(personagem) {
  console.log(`Nível de Higiene: ${personagem.higiene}\n`)

  const escolha = await useQuestion(
    `1 - Tomar banho (-10 Cresceleons)\n\nX - Voltar`
  );

  switch (escolha.toLowerCase()) {
    case "1": {
      const personagemAtualizado = await animacaoBanho(personagem);
      console.log(`Nível de Higiene: ${personagemAtualizado.higiene}\n`)
      atualizarPersonagem(personagemAtualizado);

      setTimeout(() => {
        voltarAoMenuAcoes();
      }, 3000)
      
      break;
    }

    case "x":
      voltarAoMenuAcoes();
      break;

    default:
      console.clear()
      await verificarCheat(escolha, () => menuTomarBanho(personagem))
      break;
  }
}

//Função que chama a animação durante o tempo necessário e atualiza a higiene do personagem
function animacaoBanho(personagem) {
  return new Promise((resolve) => {
    const intervaloAnimacao = iniciarAnimacao();

    setTimeout(() => {
      clearInterval(intervaloAnimacao);
      const personagemAtualizado = tomarBanho(personagem);
      resolve(personagemAtualizado);
    }, DURACAO_BANHO_MS);
  });
}

//Função que executa a animação na tela durante o banho do personagem
function iniciarAnimacao() {
  let etapa = 1;

  return setInterval(() => {
    console.clear();
    const espumas = Array(etapa).fill("🛁").join(" ");
    const gotas = Array(etapa - 1).fill("🧼").join(" ");
    console.log(`${espumas} ${gotas}`.trim());

    etapa = etapa >= 4 ? 1 : etapa + 1;
  }, INTERVALO_ANIMACAO_MS);
}

export { menuTomarBanho };
