//Realizar un programa en JavaScript que multiplique dos matrices introducidas por el usuario. Para ello, en primer lugar, se piden las dimensiones de dichas matrices, se comprueba que son correctas [(m x n) * (n x p)] y si es así, se crean estas matrices, para que el usuario las rellene y posteriormente calcular su producto, que será otra matriz de dimensiones (m x p).
const prompts = require("prompts");
const chalk = require("chalk");

//ESTE SCRIPT FUNCIONA POR MEDIO DE PROMPTS, POR LO QUE SE DEBE EJECUTAR EN LA TERMINAL;
//VALIDACION CONTRA TODO TIPO DE TROLS;

//Arrays de Mensajes
const mensajes = [
  {
    type: "text",
    name: "dimensionUno",
    message:
      "Ingrese la dimension de la primer Matriz.UTILIZAR EL SIGUIENTE FORMATO: 3x4",
  },
  {
    type: "text",
    name: "dimensionDos",
    message:
      "Ingrese la dimension de la segunda Matriz.UTILIZAR EL SIGUIENTE FORMATO: 4x2",
  },
];

//funcion que identifica la posicion del caracter 'x' en las  dimensiones de las matrices;
const indentificarX = (paramDimensionUno, paramDimensionDos) => {
  // se obtiene la posicion en donde se encuentra el caracter 'x' en la primer dimension;

  const dimensionUnoIndentificarX = paramDimensionUno.indexOf("x");

  // se obtienen todos los caracteres que estan antes y despues del caracter 'x' en la primer dimension;
  const filasDimensionUnoo = paramDimensionUno.substring(
    0,
    dimensionUnoIndentificarX
  );
  const columnasDimensionUnoo = paramDimensionUno.substring(
    dimensionUnoIndentificarX + 1
  );

  // se obtiene la posicion en donde se encuentra el caracter 'x' en la segunda dimension;
  const dimensionDosIdentificarX = paramDimensionDos.indexOf("x");

  // se obtienen todos los caracteres que estan antes y despues del caracter 'x' en la segunda dimension;
  const columnasDimensionDoos = paramDimensionDos.substring(
    dimensionDosIdentificarX + 1
  );
  const filasDimensionDoos = paramDimensionDos.substring(
    0,
    dimensionDosIdentificarX
  );

  //se retorna un array con los datos obtenidos de la funcion indentificarX;

  return {
    filasDimensionUnoo,
    columnasDimensionUnoo,
    filasDimensionDoos,
    columnasDimensionDoos,
    dimensionUnoIndentificarX,
    dimensionDosIdentificarX,
  };
};

//funcion que crear una matriz biDimensional con los datos ingresados por el usuario;
const crearMatrizBiDimensional = async (
  paramFilas,
  paramColumnas,
  paramMatriz
) => {
  const mensajes2 = [
    {
      type: "number",
      name: "elementosMatriz1",
      message: `Ingrese  ${
        paramFilas * paramColumnas
      } elementos  para la ${paramMatriz}. ${paramFilas}x${paramColumnas}`,
    },
  ];
  const matriz = [];
  for (let i = 0; i < paramFilas; i++) {
    matriz[i] = [];
    for (let j = 0; j < paramColumnas; j++) {
      // se instancia la funcion que solicita los elementos de la matriz;
      const elementos = await prompts(mensajes2[0]);
      //si el usuario ingresa un valor vacio se descontara uno a la variable paramColumnas y se volvera a solicitar que ingrese un elemento para para esa columna
      matriz[i][j] =
        elementos.elementosMatriz1 === "" ? j-- : elementos.elementosMatriz1;
    }
  }
  //retorna la matriz creada;
  return matriz;
};

//funcion que multiplica las matrices;
const multiplicacionMatrices = (paramMatriz1, paramMatriz2) => {
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

  //retorna el resultado de la multiplicacion de las matrices;
  return matriz3;
};

//funcion que valida la entrada de datos del usuario;
const validDimensiones = async () => {
  for (let i = 0; true; ) {
    const dimension1 = await prompts(mensajes[0]);
    const dimension2 = await prompts(mensajes[1]);

    const { dimensionUno } = dimension1;
    const { dimensionDos } = dimension2;

    //se instancia a la funcion que identifica la posicion del caracter 'x' en las  dimensiones de las matrices;
    const filasColumnasDimensionUnoDos = indentificarX(
      dimensionUno,
      dimensionDos
    );

    //se destructuran los datos obtenidos de la funcion indentificarX;
    const {
      dimensionDosIdentificarX,
      dimensionUnoIndentificarX,
      filasDimensionUnoo,
      columnasDimensionDoos,
    } = filasColumnasDimensionUnoDos;

    //se valida que la dimension de la primer matriz sea igual a la dimension de la segunda matriz y que se respete el formato establecido;
    if (dimensionUnoIndentificarX == -1 || dimensionDosIdentificarX == -1) {
      console.log(chalk.red("Ingrese una dimension valida para Multiplicar!"));
      console.log(" ");
    }

    //si hay conincidencia entre las dimensiones de las matrices se retorna un array con los datos obtenidos de la funcion indentificarX;
    if (filasDimensionUnoo == columnasDimensionDoos) {
      return [filasColumnasDimensionUnoDos];
    }
  }
};

// se instancia la funcion que solicita la entrada de datos del usuario, los valida y retorna un array con las dimensiones de las matrices y se guarda en la constante resultValidaciones;
const resultValidaciones = validDimensiones().then((result) => {
  //cuando se resuelve la promesa se destructuran los datos obtenidos de la funcion validDimensiones;

  const [filasColumnasDimensionUnoDos] = result;
  const {
    filasDimensionUnoo,
    columnasDimensionUnoo,
    filasDimensionDoos,
    columnasDimensionDoos,
  } = filasColumnasDimensionUnoDos;

  // se almacenan las filas y columnas  de las matrices en las siguientes constantes;
  const filasMatriz1 = filasDimensionUnoo;
  const filasMatriz2 = filasDimensionDoos;

  const columnasMatriz1 = columnasDimensionUnoo;
  const columnasMatriz2 = columnasDimensionDoos;

  // se instancia la funcion que crea la matriz biDimensional con los datos ingresados por el usuario para la primera matriz y se almacena en la constante matriz1;
  const Matriz1 = crearMatrizBiDimensional(
    parseInt(filasMatriz1),
    parseInt(columnasMatriz1),
    "primera Matriz"
  ).then((matriz1) => {
    //cuando se resuelve la promesa de la funcion crearMatrizBiDimensional se instancia la funcion que crea la matriz biDimensional con los datos ingresados por el usuario para la segunda matriz y se almacena en la constante matriz2;
    console.log("Primera Matriz");
    console.table(matriz1);

    const Matriz2 = crearMatrizBiDimensional(
      parseInt(filasMatriz2),
      parseInt(columnasMatriz2),
      "segunda Matriz"
    ).then((matriz2) => {
      //cuando se resuelve la promesa de la funcion crearMatrizBiDimensional se instancia la funcion que multiplica las matrices y se almacena en la constante matriz3;

      console.log("Segunda Matriz");
      console.table(matriz2);

      const Matriz3 = multiplicacionMatrices(matriz1, matriz2);
      console.log("Resultado de la multiplicacion de las matrices:");
      console.log(" ");
      console.table(Matriz3);
    });
  });
});
