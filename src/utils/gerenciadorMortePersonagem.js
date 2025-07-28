import { voltarAoMenuPrincipal } from "../..";
import { getPersonagemAtual, setPersonagemEmMemoria } from "../context/gerenciadorPersonagem";
import { useLocalStorage } from "../services/local-storage/use-local-storage";

//Função que verifica a morte e tira o personagem do armazenamento de personagens
function verificarMortePersonagem() {
  const personagem = getPersonagemAtual();
  const localStorage = useLocalStorage;

  if (!personagem) return console.warn("Nenhum personagem encontrado!");

  if (personagem.tempoDeVida < 0) {

    console.log("\n=================================");
    console.log(`🖤⚰️ O personagem ${personagem.nome} morreu de velhice`);
    console.log("=================================\n");

    localStorage.removerPersonagemPorId(personagem.id);
    setPersonagemEmMemoria(null);

    setTimeout(() => {
      voltarAoMenuPrincipal()
    }, 4000)
  }
}

export { verificarMortePersonagem };
