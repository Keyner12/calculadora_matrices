let vue_calculadora_matrices = new Vue({
    el: '#app',
    data: {
        filas: 2,
        columnas: 2,
        matrizA: [],
        matrizB: [],
        resultado: [],
        escalarA: 0,
        escalarB: 0,
        btnActivo: '',
    },
    methods: {
        inicializarMatrices() {
            this.matrizA = this.crearMatriz();
            this.matrizB = this.crearMatriz();
            this.resultado = this.crearMatriz();
        },
        crearMatriz() {
            return Array.from({ length: this.filas }, () => Array(this.columnas).fill(0));
        },
        getMatriz(matriz) {
            return matriz == 'A' ? this.matrizA : this.matrizB;
        },
        validarEntrada(event, matriz, i, j) {
            let valor = event.target.value;

            // Permitir solo números, coma decimal y fracción con barra /
            valor = valor.replace(/[^0-9,/-]/g, '');

            // Reemplazar comas por puntos para decimales
            valor = valor.replace(/,/g, '.');

            // Convertir fracciones a decimales (ej: "1/2" -> 0.5)
            if (valor.includes('/')) {
                let partes = valor.split('/');
                if (partes.length == 2 && partes[1] != '0') {
                    let numerador = parseFloat(partes[0]);
                    let denominador = parseFloat(partes[1]);
                    if (!isNaN(numerador) && !isNaN(denominador)) {
                        valor = (numerador / denominador).toFixed(6); // Redondear a 6 decimales
                    }
                } else {
                    valor = ''; // Si la fracción no es válida, limpiar el campo
                }
            }

            // Asignar el valor corregido a la matriz correspondiente
            if (matriz == 'A') {
                this.matrizA[i][j] = valor;
            } else {
                this.matrizB[i][j] = valor;
            }
        },
        intercambiarMatrices() {
            this.btnActivo = 'intercambiar';
            [this.matrizA, this.matrizB] = [this.matrizB, this.matrizA]; // Intercambia las matrices
        },
        sumarMatrices() {
            this.btnActivo = 'suma';
            this.resultado = this.matrizA.map((fila, i) => fila.map((valor, j) => parseFloat(valor) + parseFloat(this.matrizB[i][j]) || 0));
        },
        restarMatrices() {
            this.btnActivo = 'resta';
            this.resultado = this.matrizA.map((fila, i) => fila.map((valor, j) => parseFloat(valor) - parseFloat(this.matrizB[i][j]) || 0));
        },
        multiplicarMatrices() {
            // if (this.columnas != this.filas) {
            //     Swal.fire({
            //         icon: 'warning',
            //         title: 'Error',
            //         text: 'El número de columnas de A debe ser igual al número de filas de B',
            //     });
            //     return;
            // }
            this.btnActivo = 'multiplicacion';
            let resultado = Array.from({ length: this.filas }, () => Array(this.columnas).fill(0));
            for (let i = 0; i < this.filas; i++) {
                for (let j = 0; j < this.columnas; j++) {
                    resultado[i][j] = this.matrizA[i].reduce((sum, val, k) => sum + val * this.matrizB[k][j], 0);
                }
            }
            this.resultado = resultado;
        },
        transponerMatriz(matriz) {
            this.btnActivo = 'transpuesta-' + matriz;
            let matrizSeleccionada = matriz == 'A' ? this.matrizA : this.matrizB;
            this.resultado = matrizSeleccionada[0].map((_, colIndex) => matrizSeleccionada.map((row) => row[colIndex]));
        },
        multiplicarPorEscalar(matriz) {
            this.btnActivo = 'escalar-' + matriz;
            if (matriz === 'A') {
                this.resultado = this.matrizA.map((fila) => fila.map((valor) => valor * this.escalarA));
            } else if (matriz === 'B') {
                this.resultado = this.matrizB.map((fila) => fila.map((valor) => valor * this.escalarB));
            }
        },
        seleccionarTexto(event) {
            event.target.select();
        },
        decrementarFilas() {
            if (this.filas > 1) this.filas--;
        },
        decrementarColumnas() {
            if (this.columnas > 1) this.columnas--;
        },
    },
    watch: {
        filas() {
            this.inicializarMatrices();
        },
        columnas() {
            this.inicializarMatrices();
        },
    },
    mounted() {
        this.inicializarMatrices();
    },
});
