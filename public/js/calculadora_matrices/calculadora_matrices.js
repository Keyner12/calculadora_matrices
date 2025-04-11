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
        btnActivo: '',
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
                        valor = (numerador / denominador).toFixed(6);
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
            if (this.filasA !== this.filasB || this.columnasA !== this.columnasB) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Alerta',
                    text: 'Para sumar matrices, ambas deben tener las mismas dimensiones.',
                });
                return;
            }
            this.resultado = this.matrizA.map((fila, i) => fila.map((valor, j) => parseFloat(valor) + parseFloat(this.matrizB[i][j]) || 0));
        },

        restarMatrices() {
            this.btnActivo = 'resta';
            if (this.filasA !== this.filasB || this.columnasA !== this.columnasB) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Alerta',
                    text: 'Para restar matrices, ambas deben tener las mismas dimensiones.',
                });
                return;
            }
            this.resultado = this.matrizA.map((fila, i) => fila.map((valor, j) => parseFloat(valor) - parseFloat(this.matrizB[i][j]) || 0));
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
