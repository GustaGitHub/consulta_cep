function getApi(){
   let divCEPFound =  document.querySelector('.cepFound')
   let cepValue = document.querySelector('#cep').value
   let pattern =  /^[0-9]{5}-[0-9]{3}$/
   
   let testPattern = pattern.test(cepValue)

   if(testPattern){   
      axios.get(`http://localhost:1425/api/${cepValue}`,)
      .then(res => {
         if(res.data.erro){
            divCEPFound.innerHTML = "ERRO : CPF NÃO ENCONTRADO"
         }
         else{
            window.location.href = "#cepFound"

            let { cep, logradouro, complemento, bairro, localidade, uf } = res.data
            
            divCEPFound.innerHTML = `
               <h1>CEP Encontrado:</h1>
                  <ul>
                     <li>CEP: ${cep} </li>
                     <li>Logradouro: ${logradouro} </li>
                     <li>Complemento: ${complemento} </li>
                     <li>Bairro: ${bairro} </li>
                     <li>Cidade: ${localidade} </li>
                     <li>UF: ${uf} </li>
                  </ul>
                     <input type="hidden" id="cepHidden" value="${cep}">
                  <br/><br/>
                  <button onclick="downloadApi(1)">
                     Informações Deste CEP em formato .txt 
                  </button>
                  <button onclick="downloadApi(2)">
                     Informações Deste CEP em formato .json 
                  </button>
            `
         }
      })

   }else{
      alert('CEP INVÁLIDO')
   }
   
}

function downloadApi(format){
   let cepHidden = document.querySelector('#cepHidden').value
   if(format == 1){
      window.location.href = `http://localhost:1425/api/download/${cepHidden}/txt`
   }
   else if(format == 2){
      window.location.href = `http://localhost:1425/api/download/${cepHidden}/json`
   }
}