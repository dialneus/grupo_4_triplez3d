window.addEventListener("load",function(){
    
    let formulario = document.querySelector(".formulario");
    formulario.addEventListener('submit',function(e){
        e.preventDefault(); 

        let errores = [];

        let inputName = document.querySelector('input#name');
            if (inputName.value == ""){
               errores.push("Campo nombre vacio");
            } else if (inputName.value.length < 3){
                errores.push("El nombre debe tener almenos 4 caracteres")
            }

        let inputPrice = document.querySelector('input#price');
            if (inputPrice.value == ""){
                errores.push("Campo precio vacio");
            } else if (inputPrice.value < 100){
                errores.push("Con esta inflacion no vas a tener un precio de 2 digitos, pone mas!")
            }
        
        let inputImage = document.querySelector('input#image');
            if(typeof inputImage == undefined){
                errores.push("Se te olvido cargar la imagen");
            }
        
        if(errores.length > 0){
            let divErrores = document.querySelector('div.errores ul');
            for(i=0; i<errores.length; i++){
                divErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }

    })
})