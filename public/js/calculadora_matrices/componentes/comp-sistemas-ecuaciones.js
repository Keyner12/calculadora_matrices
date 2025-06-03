Vue.component('comp-sistemas-ecuaciones', {
	props: {
		n: {
			type: Number,
			default: 3,
			validator: v => [2, 3].includes(v)
		}
	},
	data() {
		return {
			coef: [],
			b: [],
			resultado: null,
			tipoSistema: ''
		};
	},
	created() {
	  this.reset(); // Inicializar datos ANTES del renderizado
	},
	methods: {
		reset() {
			this.coef = Array.from({ length: this.n }, () => Array(this.n).fill(0));
			this.b = Array(this.n).fill(0);
			this.resultado = null;
			this.tipoSistema = '';
		},
		resolver() {
			const A = this.coef.map(r => r.map(v => parseFloat(v) || 0));
			const B = this.b.map(v => parseFloat(v) || 0);
			const M = A.map((r, i) => [...r, B[i]]);

			const detA = this.determinante(A);
			const rangoA = this.rango(A);
			const rangoM = this.rango(M);

			if (detA !== 0) {
			this.tipoSistema = 'Compatible Determinado';
			this.resultado = this.resolverCramer(A, B);
			} else if (rangoA === rangoM && rangoA < this.n) {
			this.tipoSistema = 'Compatible Indeterminado';
			this.resultado = 'Infinitas soluciones';
			} else {
			this.tipoSistema = 'Incompatible';
			this.resultado = 'No tiene solución';
			}
		},
		determinante(mat) {
			const n = mat.length;
			if (n === 2) {
			return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
			}
			if (n === 3) {
			const [a, b, c] = mat[0];
			const [d, e, f] = mat[1];
			const [g, h, i] = mat[2];
			return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
			}
			return 0;
		},
		resolverCramer(A, B) {
			const detA = this.determinante(A);
			return A[0].map((_, j) => {
			const Aj = A.map((row, i) => row.map((v, k) => (k === j ? B[i] : v)));
			const detAj = this.determinante(Aj);
			return parseFloat((detAj / detA).toFixed(2));
			});
		},
		rango(mat) {
			const M = mat.map(r => [...r]);
			const filas = M.length;
			const cols = M[0].length;
			let rnk = 0;

			for (let c = 0, r = 0; c < cols && r < filas; c++) {
			let piv = r;
			for (let i = r + 1; i < filas; i++) {
				if (Math.abs(M[i][c]) > Math.abs(M[piv][c])) piv = i;
			}
			if (Math.abs(M[piv][c]) < 1e-8) continue;
			[M[r], M[piv]] = [M[piv], M[r]];
			for (let j = c + 1; j < cols; j++) {
				M[r][j] /= M[r][c];
			}
			for (let i = 0; i < filas; i++) {
				if (i !== r) {
				const factor = M[i][c];
				for (let j = c + 1; j < cols; j++) {
					M[i][j] -= factor * M[r][j];
				}
				}
			}
			r++;
			rnk++;
			}
			return rnk;
		},
		seleccionarTexto(event) {
			event.target.select();
		},
	},
	template:  /* vue-html */ `
		<div class="sistema-ecuaciones p-4 my-3">
			<h4 style="color: #f7b84b !important;">Sistema {{ n }}×{{ n }}</h4>

			<div v-for="i in n" :key="'fila' + i" class="d-flex align-items-center justify-content-center mb-2 gap-2">
				<input
					v-for="j in n"
					:key="'coef' + i + j"
					v-model.number="coef[i - 1][j - 1]"
					type="number"
					:placeholder="'a' + i + j"
					class="form-control text-center"
					style="width: 60px"
					@focus="seleccionarTexto"
				/>
				<span class="text-white">=</span>
				<input
					v-model.number="b[i - 1]"
					type="number"
					:placeholder="'b' + i"
					class="form-control text-center"
					style="width: 60px"
					@focus="seleccionarTexto"
				/>
			</div>

			<div class="text-center mt-3">
				<button @click="resolver" class="btn btn-warning">Calcular</button>
				<button @click="reset" class="btn btn-secondary ms-2">Limpiar</button>
			</div>

			<div v-if="resultado != null" class="mt-4">
				<h4 style="color: #f7b84b !important;">Resultado</h4>
				<h5 class="text-white">Tipo de sistema: {{ tipoSistema }}</h5>
				<div v-if="Array.isArray(resultado)" class="text-white">
					<!--<div v-for="(x, idx) in resultado" :key="'res' + idx">
						<strong>x{{ idx + 1 }}</strong> = {{ x }}
					</div>-->
					<div v-if="Array.isArray(resultado)" class="text-white">
						<div v-for="(x, idx) in resultado" :key="'res' + idx">
							<strong>{{ ['x', 'y', 'z'][idx] || 'x' + (idx + 1) }}</strong> = {{ x }}
						</div>
					</div>

				</div>
				<div v-else class="text-white">
					{{ resultado }}
				</div>
			</div>
		</div>
	`
});
