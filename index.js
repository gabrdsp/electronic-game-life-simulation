//Arquivo Modificado por Adrian

import { useQuestion } from './src/services/question/use-question'
import { useLocalStorage } from './src/services/local-storage/use-local-storage'
import { listarPersonagens } from './src/features/menuInicial/listarPersonagens'
import { menuDeletar } from './src/features/menuInicial/deletarPersonagem'
import { criarPersonagem } from './src/features/menuInicial/criarPersonagem'
import { selecionarPersonagem } from './src/features/menuInicial/selecionarPersonagem'
import { redirecionando } from './src/utils/menuLoading'

async function menuPrincipal() {
  const storage = useLocalStorage()

  exibirLetreiroDoJogo()

  const escolha = await useQuestion(`
\x1b[36m
Escolha uma opção:

  1 - ✨ Criar Personagem
  2 - 🎯 Escolher Personagem
  3 - 📜 Listar Personagens
  4 - 🗑️  Deletar Personagem
  x - ❌ Finalizar Jogo
\x1b[0m
`)

  console.clear()

  switch (escolha.toLowerCase()) {
    case '1':
      const novoPersonagem = await criarPersonagem()
      if (novoPersonagem) {
        const personagens = storage.getObject('listaPersonagens') || []
        personagens.push(novoPersonagem)
        storage.setObject('listaPersonagens', personagens)
      }
      break

    case '2':
      await selecionarPersonagem(storage.getObject('listaPersonagens'))
      break

    case '3':
      listarPersonagens(storage.getObject('listaPersonagens'))
      break

    case '4':
      menuDeletar(storage.getObject('listaPersonagens'), storage)
      break

    case 'x':
      console.log('\nSaindo do jogo... Até logo!\n')
      return

    default:
      console.log('\x1b[31mOpção inválida. Tente novamente.\x1b[0m')
      await redirecionando()
      menuPrincipal()
  }
}

function exibirLetreiroDoJogo() {
  console.clear();
  console.log("\x1b[92m \n" +
" .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------. \n" +
"| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |\n" +
"| |     ______   | || |  _______     | || |  _________   | || |    _______   | || |     _____    | || | ____    ____ | |\n" +
"| |   .' ___  |  | || | |_   __ \\    | || | |_   ___  |  | || |   /  ___  |  | || |    |_   _|   | || ||_   \\  /   _|| |\n" +
"| |  / .'   \\_|  | || |   | |__) |   | || |   | |_  \\_|  | || |  |  (__ \\_|  | || |      | |     | || |  |   \\/   |  | |\n" +
"| |  | |         | || |   |  __ /    | || |   |  _|  _   | || |   '.___`-.   | || |      | |     | || |  | |\\  /| |  | |\n" +
"| |  \\ `.___.'\\  | || |  _| |  \\ \\_  | || |  _| |___/ |  | || |  |`\\____) |  | || |     _| |_    | || | _| |_\\/_| |_ |\n" +
"| |   `._____.'  | || | |____| |___| | || | |_________|  | || |  |_______.'  | || |    |_____|   | || ||_____||_____|| |\n" +
"| |              | || |              | || |              | || |              | || |              | || |              |\n" +
"| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |\n" +
" '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------' \n" +
"\x1b[0m");


  console.log('\x1b[37m              Bem-vindo ao universo de CRESIMS!\x1b[0m\n')
}

function voltarAoMenuPrincipal() {
  console.clear()
  menuPrincipal()
}

export { voltarAoMenuPrincipal }

if (require.main === module) {
  menuPrincipal()
}