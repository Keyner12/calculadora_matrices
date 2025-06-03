let vue_calculadora_matrices = new Vue({
    el: '#app',
    data: {
        filasA: 2,
        columnasA: 2,
        filasB: 2,
        columnasB: 2,
        matrizA: [],
        matrizB: [],
        resultado: [],
        escalarA: 0,
        escalarB: 0,
        potenciaA: 0,
        potenciaB: 0,
        btnActivo: '',
        tabActivo: "matrices",
    },
    methods: {
        inicializarMatrices() {
            this.matrizA = this.crearMatriz(this.filasA, this.columnasA);
            this.matrizB = this.crearMatriz(this.filasB, this.columnasB);
            this.resultado = [];
        },
        crearMatriz(filas, columnas) {
            return Array.from({ length: filas }, () => Array(columnas).fill(0));
        },
        getMatriz(matriz) {
            return matriz == 'A' ? this.matrizA : this.matrizB;
        },
        validarEntrada(event, matriz, i, j) {
            let valor = event.target.value;

            valor = valor.replace(/[^0-9,/-]/g, '');
            valor = valor.replace(/,/g, '.');

            if (valor.includes('/')) {
                let partes = valor.split('/');
                if (partes.length == 2 && partes[1] != '0') {
                    let numerador = parseFloat(partes[0]);
                    let denominador = parseFloat(partes[1]);
                    if (!isNaN(numerador) && !isNaN(denominador)) {
                        valor = (numerador / denominador).toFixed(2);
                    }
                } else {
                    valor = '';
                }
            }

            if (matriz == 'A') {
                this.$set(this.matrizA[i], j, valor);
            } else {
                this.$set(this.matrizB[i], j, valor);
            }
        },
        intercambiarMatrices() {
            this.btnActivo = 'intercambiar';
            [this.matrizA, this.matrizB] = [this.matrizB, this.matrizA];
            [this.filasA, this.filasB] = [this.filasB, this.filasA];
            [this.columnasA, this.columnasB] = [this.columnasB, this.columnasA];
        },
        sumarMatrices() {
            this.btnActivo = 'suma';
            if (this.filasA != this.filasB || this.columnasA != this.columnasB) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Alerta',
                    text: 'Para sumar matrices, ambas deben tener las mismas dimensiones.',
                });
                return;
            }
            this.resultado = this.matrizA.map((fila, i) => 
                fila.map((valor, j) => parseFloat(valor) + parseFloat(this.matrizB[i][j]) || 0)
            );
        },
        restarMatrices() {
            this.btnActivo = 'resta';
            if (this.filasA != this.filasB || this.columnasA != this.columnasB) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Alerta',
                    text: 'Para restar matrices, ambas deben tener las mismas dimensiones.',
                });
                return;
            }
            this.resultado = this.matrizA.map((fila, i) =>
                fila.map((valor, j) => parseFloat(valor) - parseFloat(this.matrizB[i][j]) || 0)
            );
        },
        multiplicarMatrices() {
            if (this.columnasA != this.filasB) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Alerta',
                    text: 'El número de columnas de A debe ser igual al número de filas de B',
                });
                return;
            }
            this.btnActivo = 'multiplicacion';
            let resultado = Array.from({ length: this.filasA }, () => Array(this.columnasB).fill(0));
            for (let i = 0; i < this.filasA; i++) {
                for (let j = 0; j < this.columnasB; j++) {
                    for (let k = 0; k < this.columnasA; k++) {
                        resultado[i][j] += parseFloat(this.matrizA[i][k] || 0) * parseFloat(this.matrizB[k][j] || 0);
                    }
                }
            }
            this.resultado = resultado;
        },
        transponerMatriz(matriz) {
            this.btnActivo = 'transpuesta-' + matriz;
            let matrizSeleccionada = matriz == 'A' ? this.matrizA : this.matrizB;
            this.resultado = matrizSeleccionada[0].map((_, colIndex) => 
                matrizSeleccionada.map((row) => row[colIndex])
            );
        },
        multiplicarPorEscalar(matriz) {
            this.btnActivo = 'escalar-' + matriz;
            if (matriz == 'A') {
                this.resultado = this.matrizA.map((fila) => fila.map((valor) => valor * this.escalarA));
            } else if (matriz == 'B') {
                this.resultado = this.matrizB.map((fila) => fila.map((valor) => valor * this.escalarB));
            }
        },
        // Nuevo método para calcular la potencia de una matriz
        potencia(matriz) {
            this.btnActivo = 'potencia-' + matriz;
            // Selecciona el exponente correspondiente
            let expo = (matriz == 'A') ? this.potenciaA : this.potenciaB;
            // Se permite solo potencias hasta 4
            if (expo > 4) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Alerta',
                    text: 'Solo está permitido elevar a la potencia hasta 4.',
                });
                return;
            }
            // Verificar que la matriz sea cuadrada
            let matrizOriginal = (matriz == 'A') ? this.matrizA : this.matrizB;
            if (matrizOriginal.length != matrizOriginal[0].length) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Alerta',
                    text: 'La matriz debe ser cuadrada para elevarla a una potencia.',
                });
                return;
            }
            // Función interna para multiplicar dos matrices cuadradas
            const multiplyMatrices = (m1, m2) => {
                let n = m1.length;
                let res = this.crearMatriz(n, n);
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                        let sum = 0;
                        for (let k = 0; k < n; k++) {
                            sum += parseFloat(m1[i][k] || 0) * parseFloat(m2[k][j] || 0);
                        }
                        res[i][j] = sum;
                    }
                }
                return res;
            };

            // Convertir los valores de la matriz a números
            let current = matrizOriginal.map(row => row.map(val => parseFloat(val) || 0));
            let resultMatriz;
            // Caso potencia 0: la matriz identidad
            if (expo == 0) {
                resultMatriz = this.crearMatriz(matrizOriginal.length, matrizOriginal.length);
                for (let i = 0; i < matrizOriginal.length; i++) {
                    resultMatriz[i][i] = 1;
                }
            } 
            // Caso potencia 1: la misma matriz
            else if (expo == 1) {
                resultMatriz = current;
            } 
            // Para potencias mayores: multiplicación repetida
            else {
                resultMatriz = current;
                for (let i = 1; i < expo; i++) {
                    resultMatriz = multiplyMatrices(resultMatriz, current);
                }
            }
            this.resultado = resultMatriz;
        },
        determinante(matriz) {
            this.btnActivo = 'determinante-' + matriz;
            let matrizSeleccionada = matriz == 'A' ? this.matrizA : this.matrizB;
        
            // Verificar que la matriz sea cuadrada
            if (matrizSeleccionada.length != matrizSeleccionada[0].length) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Alerta',
                    text: 'La matriz debe ser cuadrada para calcular su determinante.',
                });
                return;
            }
        
            // Verificar que la matriz no sea de orden mayor a 3
            if (matrizSeleccionada.length > 3) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Alerta',
                    text: 'No tienes permisos para calcular el determinante de matrices de más de 3x3.',
                });
                return;
            }
        
            // Convertir los valores de la matriz a números
            let matrizNumerica = matrizSeleccionada.map(row => row.map(val => parseFloat(val) || 0));
        
            let n = matrizNumerica.length;
            let det = 1;
            let exchanges = 0; // Para llevar un seguimiento de los intercambios de filas
        
            // Algoritmo de eliminación gaussiana
            for (let i = 0; i < n; i++) {
                // Encontrar el pivote (el valor más grande en la columna i)
                let maxRow = i;
                for (let k = i + 1; k < n; k++) {
                    if (Math.abs(matrizNumerica[k][i]) > Math.abs(matrizNumerica[maxRow][i])) {
                        maxRow = k;
                    }
                }
        
                // Si el pivote es cero, el determinante es cero
                if (matrizNumerica[maxRow][i] == 0) {
                    det = 0;
                    break;
                }
        
                // Intercambiar filas si es necesario
                if (maxRow != i) {
                    [matrizNumerica[i], matrizNumerica[maxRow]] = [matrizNumerica[maxRow], matrizNumerica[i]];
                    exchanges++;
                }
                // Escalar la fila del pivote
                for (let j = i + 1; j < n; j++) {
                    let factor = matrizNumerica[j][i] / matrizNumerica[i][i];
                    for (let k = i; k < n; k++) {
                        matrizNumerica[j][k] -= factor * matrizNumerica[i][k];
                    }
                }
            }
        
            // Multiplicar los elementos de la diagonal para obtener el determinante
            for (let i = 0; i < n; i++) {
                det *= matrizNumerica[i][i];
            }
        
            // Ajustar el signo del determinante según el número de intercambios de filas
            if (exchanges % 2 == 1) {
                det = -det;
            }
        
            // Redondear el determinante a un valor entero si la diferencia es muy pequeña
            if (Math.abs(det - Math.round(det)) < 1e-10) {
                det = Math.round(det);
            }
        
            // Redondear a un número específico de decimales (por ejemplo, 6 decimales)
            det = parseFloat(det.toFixed(2));
        
            // Mostrar el resultado como una matriz 1x1
            this.resultado = [[det]];
        },
        inversa(matriz) {
            this.btnActivo = 'inversa-' + matriz;
            let matrizSeleccionada = matriz == 'A' ? this.matrizA : this.matrizB;
            
            // Verificar que la matriz sea cuadrada
            if (matrizSeleccionada.length != matrizSeleccionada[0].length) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Alerta',
                    text: 'La matriz debe ser cuadrada para calcular su inversa.',
                });
                return;
            }
            
            // Verificar que la matriz no sea de orden mayor a 3
            if (matrizSeleccionada.length > 3) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Alerta',
                    text: 'No tienes permisos para calcular la inversa de matrices de más de 3x3.',
                });
                return;
            }
            
            // Convertir los valores de la matriz a números
            let matrizNumerica = matrizSeleccionada.map(row => row.map(val => parseFloat(val) || 0));
            let n = matrizNumerica.length;
            
            // Calcular el determinante primero para verificar si la matriz tiene inversa
            let det = this.calcularDeterminanteInterno(matrizNumerica);
            
            // Redondear el determinante para evitar errores de punto flotante
            if (Math.abs(det - Math.round(det)) < 1e-10) {
                det = Math.round(det);
            }
            
            // Si el determinante es cero, la matriz no tiene inversa
            if (Math.abs(det) < 1e-10) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Alerta',
                    text: 'La matriz no tiene inversa porque su determinante es cero.',
                });
                return;
            }
            
            // Calcular la matriz inversa según el tamaño de la matriz
            let matrizInversa = [];
            
            // Caso 1x1
            if (n == 1) {
                matrizInversa = [[1 / matrizNumerica[0][0]]];
            }
            // Caso 2x2
            else if (n == 2) {
                matrizInversa = [
                    [matrizNumerica[1][1] / det, -matrizNumerica[0][1] / det],
                    [-matrizNumerica[1][0] / det, matrizNumerica[0][0] / det]
                ];
            }
            // Caso 3x3
            else if (n == 3) {
                // Calcular la matriz de cofactores
                let cofactores = [
                    [
                        // Cofactor (0,0): determinante de la submatriz eliminando fila 0, columna 0
                        matrizNumerica[1][1] * matrizNumerica[2][2] - matrizNumerica[1][2] * matrizNumerica[2][1],
                        // Cofactor (0,1): determinante de la submatriz eliminando fila 0, columna 1
                        -(matrizNumerica[1][0] * matrizNumerica[2][2] - matrizNumerica[1][2] * matrizNumerica[2][0]),
                        // Cofactor (0,2): determinante de la submatriz eliminando fila 0, columna 2
                        matrizNumerica[1][0] * matrizNumerica[2][1] - matrizNumerica[1][1] * matrizNumerica[2][0]
                    ],
                    [
                        // Cofactor (1,0): determinante de la submatriz eliminando fila 1, columna 0
                        -(matrizNumerica[0][1] * matrizNumerica[2][2] - matrizNumerica[0][2] * matrizNumerica[2][1]),
                        // Cofactor (1,1): determinante de la submatriz eliminando fila 1, columna 1
                        matrizNumerica[0][0] * matrizNumerica[2][2] - matrizNumerica[0][2] * matrizNumerica[2][0],
                        // Cofactor (1,2): determinante de la submatriz eliminando fila 1, columna 2
                        -(matrizNumerica[0][0] * matrizNumerica[2][1] - matrizNumerica[0][1] * matrizNumerica[2][0])
                    ],
                    [
                        // Cofactor (2,0): determinante de la submatriz eliminando fila 2, columna 0
                        matrizNumerica[0][1] * matrizNumerica[1][2] - matrizNumerica[0][2] * matrizNumerica[1][1],
                        // Cofactor (2,1): determinante de la submatriz eliminando fila 2, columna 1
                        -(matrizNumerica[0][0] * matrizNumerica[1][2] - matrizNumerica[0][2] * matrizNumerica[1][0]),
                        // Cofactor (2,2): determinante de la submatriz eliminando fila 2, columna 2
                        matrizNumerica[0][0] * matrizNumerica[1][1] - matrizNumerica[0][1] * matrizNumerica[1][0]
                    ]
                ];
                
                // Transponer la matriz de cofactores y dividir por el determinante
                matrizInversa = [
                    [cofactores[0][0] / det, cofactores[1][0] / det, cofactores[2][0] / det],
                    [cofactores[0][1] / det, cofactores[1][1] / det, cofactores[2][1] / det],
                    [cofactores[0][2] / det, cofactores[1][2] / det, cofactores[2][2] / det]
                ];
            }
            
            // Redondear los valores para evitar errores de punto flotante
            matrizInversa = matrizInversa.map(row => row.map(val => {
                // Redondear a un número entero si la diferencia es muy pequeña
                if (Math.abs(val - Math.round(val)) < 1e-10) {
                    return Math.round(val);
                }
                // De lo contrario, redondear a 6 decimales
                return parseFloat(val.toFixed(2));
            }));
            
            this.resultado = matrizInversa;
        },
        
        // Función auxiliar para calcular el determinante (usada por la función inversa)
        calcularDeterminanteInterno(matriz) {
            let n = matriz.length;
            
            // Caso 1x1
            if (n == 1) {
                return matriz[0][0];
            }
            // Caso 2x2
            else if (n == 2) {
                return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
            }
            // Caso 3x3
            else if (n == 3) {
                return matriz[0][0] * (matriz[1][1] * matriz[2][2] - matriz[1][2] * matriz[2][1]) -
                       matriz[0][1] * (matriz[1][0] * matriz[2][2] - matriz[1][2] * matriz[2][0]) +
                       matriz[0][2] * (matriz[1][0] * matriz[2][1] - matriz[1][1] * matriz[2][0]);
            }
            
            return 0;
        },

        seleccionarTexto(event) {
            event.target.select();
        },
        decrementarFilasA() {
            if (this.filasA > 1) this.filasA--;
        },
        decrementarColumnasA() {
            if (this.columnasA > 1) this.columnasA--;
        },
        decrementarFilasB() {
            if (this.filasB > 1) this.filasB--;
        },
        decrementarColumnasB() {
            if (this.columnasB > 1) this.columnasB--;
        },
        CambiarTab(tab) {
            this.tabActivo = tab;
        },
    },
    watch: {
        filasA() {
            this.matrizA = this.crearMatriz(this.filasA, this.columnasA);
        },
        columnasA() {
            this.matrizA = this.crearMatriz(this.filasA, this.columnasA);
        },
        filasB() {
            this.matrizB = this.crearMatriz(this.filasB, this.columnasB);
        },
        columnasB() {
            this.matrizB = this.crearMatriz(this.filasB, this.columnasB);
        },
    },
    mounted() {
        this.inicializarMatrices();
    },
});
