import { LocalStorage } from "node-localstorage"

export const useLocalStorage = () => {
  const localStorage = new LocalStorage('../../../db')

  const setString = (key, value) => {
    localStorage.setItem(key, value)
  }

  const setObject = (key, obj) => {
    const objString = JSON.stringify(obj)

    localStorage.setItem(key, objString)
  }

  const getString = (key) => {
    return localStorage.getItem(key)
  } 

  const getObject = (key) => {
    const json = localStorage.getItem(key)

    if (json) {
      return JSON.parse(json)
    }

    return null
  }

  const removerPersonagemPorId = (id) => {
  let personagens = getObject("listaPersonagens") || [];

  const novaLista = personagens.filter(personagem => personagem.id !== id);

  setObject("listaPersonagens", novaLista);
}

  return {
    setString,
    setObject,
    getString,
    getObject,
    removerPersonagemPorId
  }
}
