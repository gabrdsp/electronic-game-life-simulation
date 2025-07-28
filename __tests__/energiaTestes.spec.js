import { regularEnergia } from "../src/utils/controleEnergia"
import { descansoEnergiaGanha } from "../src/utils/controleEnergia"
import { trabalhoEnergiaGasta } from "../src/utils/controleEnergia"
import { atualizarPersonagem, getPersonagemAtual } from "../src/context/gerenciadorPersonagem"
import { menuTrabalhar } from "../src/utils/gerenciadorTrabalho"

describe('', () => {
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
describe('', () => {
    it('Deve receber o salario do dia ao trabalhar uma jornda padrão', () =>{ 
        // const personagem = {
        //     nome: "Cresim",
        //     asppiracao: "PINTURA",
        //     tempoDeVida: 360000,
        //     energia: 32,
        //     higiene: 28,
        //     cresceleons: 0,
        //     pontosDeHabilidade: {},
        //     trabalho: 3,
        // }
        // atualizarPersonagem(personagem)
        // await menuTrabalhar(getPersonagemAtual())
        // expect(personagem.cresceleons).toBe(110)
    })
    it('Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10', () =>{ 

    })
    it('Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10 e pontos de higiene menores que 4', () =>{ 

    })
    it('Deve validar para que o Cresim não consiga começar a trabalhar com os pontos de energia menores que 4', () =>{ 

    })
    it('Deve descontar 10 Cresceleons ao tomar banho', () =>{ 

    })
})