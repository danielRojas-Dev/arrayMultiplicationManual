//Realizar un programa en JavaScript que multiplique dos matrices introducidas por el usuario. Para ello, en primer lugar, se piden las dimensiones de dichas matrices, se comprueba que son correctas [(m x n) * (n x p)] y si es así, se crean estas matrices, para que el usuario las rellene y posteriormente calcular su producto, que será otra matriz de dimensiones (m x p).
const prompts = require("prompts");
const chalk = require("chalk");

//Arrays de Mensajes
const mensajes = [
  {
    type: "text",
    name: "dimensionUno",
    message: "Ingrese la dimension de la primer Matriz.UTILIZAR EL SIGUIENTE FORMATO: 3x4",
  },
  {
    type: "text",
    name: "dimensionDos",
    message: "Ingrese la dimension de la segunda Matriz.UTILIZAR EL SIGUIENTE FORMATO: 4x2",
  },
];


const crearMatrizBidimencional =  async (paramFilas, paramColumnas, paramMatriz) => {

  const mensajes2 =  [
    {
      type: "number",
      name: "elementosMatriz1",
      message: `Ingrese  ${paramFilas * paramColumnas} elementos  para la ${paramMatriz}. ${paramFilas}x${paramColumnas}`
    },
    
  ]

  const matriz = [];
  for (let i = 0; i < paramFilas; i++) {
    matriz[i] = [];
    for (let j = 0; j < paramColumnas; j++) {
 const elementos = await prompts(mensajes2[0]);
 matriz[i][j] = elementos.elementosMatriz1 === '' ? j--: elementos.elementosMatriz1; 
    }
  }
  return matriz;
}

const  multiplicacionMatrices = (paramMatriz1, paramMatriz2) => {
  
  const matriz3 = [0];
  for (let i = 0; i < paramMatriz1.length; i++) {
    matriz3[i] = [0];
    for (let j = 0; j < paramMatriz2[0].length; j++) {
      matriz3[i][j] = 0;
      for (let k = 0; k < paramMatriz1[0].length; k++) {
        matriz3[i][j] += paramMatriz1[i][k] * paramMatriz2[k][j];
      }
    }
  }
  return matriz3;
}

const validDimenciones = async () => {
  for (let i = 0; true; ) {
    const dimension1 = await prompts(mensajes[0]);
    const dimension2 = await prompts(mensajes[1]);

    const {dimensionUno} = dimension1;
    const {dimensionDos} = dimension2;

    if (dimensionUno.indexOf('x') === -1 || dimensionDos.indexOf('x') === -1) {
      console.log(chalk.red("Ingrese una dimension correcta"));

    }
      
    
    if (dimensionUno.charAt(dimensionUno.indexOf('x')) == dimensionDos.charAt(dimensionDos.indexOf('x'))) {
      return [dimensionUno, dimensionDos];
    }

    console.log(chalk.red("Ingrese una dimension valida para Multiplicar!"));
    console.log(" ");
  }
}

const result = validDimenciones();

result.then((result) => {
  console.log(result);
  const filasMatriz1 = result[0].charAt(0);
  const filasMatriz2 = result[1].charAt();

  const columnasMatriz1 = result[0].charAt(2);
  const columnasMatriz2 = result[1].charAt(2);



  const Matriz1 =  crearMatrizBidimencional(
    parseInt(filasMatriz1),
    parseInt(columnasMatriz1),'primera Matriz'
  ).then((matriz1) => { 
    console.table(matriz1);


    const Matriz2 =  crearMatrizBidimencional(
      parseInt(filasMatriz2),
      parseInt(columnasMatriz2),'segunda Matriz'
    ).then((matriz2) => {
      console.table(matriz2);



      const Matriz3 = multiplicacionMatrices(matriz1,matriz2)

      console.table(Matriz3);
 
    });

   


  });

 
 


 


  
});
