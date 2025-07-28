import { regularEnergia } from "../src/utils/controleEnergia"
import { descansoEnergiaGanha } from "../src/utils/controleEnergia"
import { trabalhoEnergiaGasta } from "../src/utils/controleEnergia"
import { atualizarPersonagem, getPersonagemAtual } from "../src/context/gerenciadorPersonagem"
import { menuTrabalhar, trabalho } from "../src/utils/gerenciadorTrabalho"

describe('testes energia', () => {
    it('Deve validar os pontos de energia do personagem para que não passem de 32 pontos', () =>{ 
        const personagem = { 
            tempoDeVida: 360000,
            energia: 40
        }
        atualizarPersonagem(personagem)
        regularEnergia()
        expect(personagem.energia).toBe(32)
    })
    it('Deve validar os pontos de energia do personagem para que não fiquem negativados', () =>{ 
        const personagem = { 
            tempoDeVida: 360000,
            energia: -10
        }
        atualizarPersonagem(personagem)
        regularEnergia()
        expect(personagem.energia).toBe(0)
    })
    it('Deve conseguir dormir e receber seus pontos de energia', () =>{ 
        const personagem = { 
            tempoDeVida: 360000,
            energia: 22
        }
        atualizarPersonagem(personagem)
        const resultado = descansoEnergiaGanha(5000, personagem)
        expect(resultado[0].energia).toBe(26)
    })
    it('Deve perder os pontos de energia ao trabalhar uma jornada padrão', () =>{ 
        const personagem = {
            tempoDeVida: 360000,
            energia: 32
        }
        atualizarPersonagem(personagem)
        trabalhoEnergiaGasta(personagem, 'jornadaPadrao')
        const resultado = personagem.energia
        
        expect(resultado).toBe(22)
    })
})
describe('testes trabalho', () => {
    it('Deve receber o salario do dia ao trabalhar uma jornda padrão', async () =>{ 
        const personagem = {
            nome: "Cresim",
            asppiracao: "PINTURA",
            tempoDeVida: 360000,
            energia: 32,
            higiene: 28,
            cresceleons: 0,
            pontosDeHabilidade: {},
            trabalho: 3,
        }
        atualizarPersonagem(personagem)
        const salarioRecebido = trabalho(personagem, 110).aReceber
        expect(salarioRecebido).toBe(110)
    })
    it('Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10', () =>{ 
        const personagem = {
            nome: "Cresim",
            asppiracao: "PINTURA",
            tempoDeVida: 360000,
            energia: 9,
            higiene: 28,
            cresceleons: 0,
            pontosDeHabilidade: {},
            trabalho: 3,
        }
        atualizarPersonagem(personagem)
        const salarioRecebido = trabalho(personagem, 110).aReceber
        
        expect(salarioRecebido).toBe(73.7)
    })
    it('Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10 e pontos de higiene menores que 4', () =>{ 
        const personagem = {
            nome: "Cresim",
            asppiracao: "PINTURA",
            tempoDeVida: 360000,
            energia: 9,
            higiene: 3,
            cresceleons: 0,
            pontosDeHabilidade: {},
            trabalho: 3,
        }
        atualizarPersonagem(personagem)
        const salarioRecebido = trabalho(personagem, 110).aReceber
        
        expect(salarioRecebido).toBe(66.33)
    })
    it('Deve validar para que o Cresim não consiga começar a trabalhar com os pontos de energia menores que 4', () =>{ 
        const personagem = {
            tempoDeVida: 360000,
            energia: 3
        }
        atualizarPersonagem(personagem)
        const resultado = trabalhoEnergiaGasta(personagem, 'recalculo')
        
        expect(resultado).toBe(null)
    })
})