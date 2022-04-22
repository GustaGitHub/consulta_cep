const contentFile_TXT = (cep) => {
   return ` 
CEP : ${cep.cep},
LOGRADOURO: ${cep.logradouro},
COMPLEMENTO: ${cep.complemento},
BAIRRO: ${cep.bairro},
CIDADE : ${cep.localidade},
UF: ${cep.uf},
IBGE: ${cep.ibge},
GIA: ${cep.gia},
DDD: ${cep.ddd},
SIAFI: ${cep.siafi}
`
}

module.exports = contentFile_TXT