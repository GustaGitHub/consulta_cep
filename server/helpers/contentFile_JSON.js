const contentFile_JSON = (cep) => {
   return `
{
   "cep": "${cep.cep}",
   "logradouro": "${cep.logradouro}",
   "complemento": "${cep.complemento}",
   "bairro": "${cep.bairro}",
   "localidade": "${cep.localidade}",
   "uf": "${cep.uf}",
   "ibge": ${cep.ibge},
   "gia": ${cep.gia},
   "ddd": ${cep.ddd},
   "siafi": ${cep.siafi}
}
`
}

module.exports = contentFile_JSON