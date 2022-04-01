//Realizar un programa en JavaScript que multiplique dos matrices introducidas por el usuario. Para ello, en primer lugar, se piden las dimensiones de dichas matrices, se comprueba que son correctas [(m x n) * (n x p)] y si es así, se crean estas matrices, para que el usuario las rellene y posteriormente calcular su producto, que será otra matriz de dimensiones (m x p).
const prompts = require("prompts");
const { randomInt } = require("crypto");
const chalk = require("chalk");

//Arrays de Mensajes
const mensajes = [
  {
    type: "text",
    name: "dimension1",
    message: "Ingrese la dimension de la primer Matriz. Ejemplo: mxn",
  },
  {
    type: "text",
    name: "dimension2",
    message: "Ingrese la dimension de la segunda Matriz. Ejemplo: nxp",
  },
  {
    type: "text",
    name: "enviarCorreo",
    message: "Quiere que se envie en el correo el archivo creado? Y/N",
  },
  {
    type: "text",
    name: "crearArchivo",
    message: "Quiere que se cree un nuevo archivo? Y/N",
  },
];

function crearMatrizBidimencional(paramFilas, paramColumnas) {
  const array = [];
  for (let i = 0; i < paramFilas; i++) {
    array[i] = [];
    for (let j = 0; j < paramColumnas; j++) {
      array[i][j] = 0;
    }
  }
  return array;
}

function multiplicacionMatrices(paramMatriz1, paramMatriz2) {
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

    if (dimension1.dimension1.charAt(2) == dimension2.dimension2.charAt(0)) {
      return [dimension1.dimension1, dimension2.dimension2];
    }

    console.log(chalk.red("Ingrese una dimension valida para Multiplicar!"));
    console.log(" ");
  }
};

const result = validDimenciones();

result.then((result) => {
  const filasMatriz1 = result[0].charAt(0);
  const filasMatriz2 = result[1].charAt();

  const columnasMatriz1 = result[0].charAt(2);
  const columnasMatriz2 = result[1].charAt(2);

  console.log(filasMatriz1);
  console.log(filasMatriz2);
  console.log(columnasMatriz1);
  console.log(columnasMatriz2);

  const matriz1 = crearMatrizBidimencional(
    parseInt(filasMatriz1),
    parseInt(columnasMatriz1)
  );
  const matriz2 = crearMatrizBidimencional(
    parseInt(filasMatriz2),
    parseInt(columnasMatriz2)
  );

  const matriz3 = multiplicacionMatrices(matriz1, matriz2);

  console.table(matriz1);

  console.table(matriz2);

  console.table(matriz3);
});
