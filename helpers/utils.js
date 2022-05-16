const fs = require("fs"); // Or `import fs from "fs";` with ESM
const Path = require('path')
const downloadsFolder = require('downloads-folder');
class Util {
    checkFileExists(filePath) {
        let path = downloadsFolder();
        try {
            // console.log(path + "/" + filePath)
            return fs.statSync(path + "/" + filePath).isFile();
        }
        catch (err)
        {
            return false;
        }
    }

    findFileOnDownloadDirectory(name) {
        let path = downloadsFolder();
        let filenames = fs.readdirSync(path);
        let result = false;
        // console.log("\nFilenames in directory:");
        filenames.forEach((file) => {
            // console.log("File:", file);
            if(file.includes(name)) {
                // console.log("FILE FOUND")
                result = true;
            }
        });
        return result;
    }

    between(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
      }

      getUrl(system) {
        let urlData = fs.readFileSync('data/' + system + '/url.json');
        let myUrl = JSON.parse(urlData);
        let enviroment = process.env.ENV
        return myUrl[enviroment]; 
      }

      getStringCapitalized(cadena) {
        return cadena.charAt(0).toUpperCase() + cadena.slice(1);
      }

      dateCheck(dateFrom,dateTo,dateCheck) {

          var d1 = dateFrom.split("/");
          var d2 = dateTo.split("/");
          var c = dateCheck.split("/");
          
          var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
          var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
          var check = new Date(c[2], parseInt(c[1])-1, c[0]);
          
    
          if((check > from && check < to)) {
            return true;
          }
          return false;
      }

      writeJson(datos){
        // read file and make object
       let content = JSON.parse(fs.readFileSync(datos, 'utf8'));
       // edit or add property
       content.numeroPM = 999999999999;
       //write file
       fs.writeFileSync(datos, JSON.stringify(content));
      }

      convertDecimal(num){
        //convierte un numero en decimal ej: 5.000,89
        //lo convierte en 5000.89
         let valor = num.replace(".", "")
         let dec = valor.replace(",", ".")
         return dec;
      }

      convertTo(numero){
        //convierte un numero 5000.89 en 5000,89 para poder ingresar en los valores en la página
        let valor = numero.replace(".", ",")
        return valor;
      }

      getRandomValueFromJson(jsonFile) {
        const values = Object.values(jsonFile)
        const randomValue = values[parseInt(Math.random() * values.length)]
        return randomValue
      }

      getPatente() {
        //BB-BB·10
        const chars ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomArray = Array.from(
            { length: 4 },
            (v, k) => chars[Math.floor(Math.random() * chars.length)]
          );
        const randomString = randomArray.join("");
        const num = this.between(10, 99)
        return randomString + num;
      }
      
      getIva(monto){
         let iva = monto * 19/100
         return iva
      }

      getDateNow(){
        const fecha = new Date();
        const annoActual = fecha.getFullYear();
        const hoy = fecha.getDate();
        let mesActual = fecha.getMonth() + 1; 
        if(mesActual < 10){
          mesActual = '0' + mesActual;
        }
        const fechaNow =  hoy+'-'+mesActual+'-'+annoActual;   
        return fechaNow
      }

      getDateMenor(dias){
        var dt = new Date();
        dt.setDate(dt.getDate() - dias);
        return this.formatDDMMYYYY(dt)
      }
     
      getDate(dias){
        var dt = new Date();
        dt.setDate(dt.getDate() + dias);
        return this.formatDDMMYYYY(dt)
      }

      formatDDMMYYYY(date){
        var curr_date = date.getDate();
        var curr_month = date.getMonth() + 1;
        if(curr_month < 10){
          curr_month = '0' + curr_month;
        }
        var curr_year = date.getFullYear();
        return (curr_date + "-" + curr_month + "-" + curr_year);
      }

      getFutureDate(){
        const fecha = new Date();
        const annoActual = fecha.getFullYear();
        const annoFuture = annoActual + 1
        const hoy = fecha.getDate();
        const mesActual = fecha.getMonth() + 1; 
        const fechaFuture =  hoy+'-'+mesActual+'-'+annoFuture;   
        return fechaFuture
      }
}
export default new Util();
