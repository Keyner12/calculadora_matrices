<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Calculadora Matrices</title>
    <!-- Bootstrap Css -->
    <link href="{{ URL::asset('build/css/bootstrap.min.css') }}" id="bootstrap-style" rel="stylesheet" type="text/css" />
    <!-- Icons Css -->
    <link href="{{ URL::asset('build/css/icons.min.css') }}" rel="stylesheet" type="text/css" />
    <!-- App Css-->
    <link href="{{ URL::asset('build/css/app.min.css') }}" id="app-style" rel="stylesheet" type="text/css" />
    <!-- custom Css-->
    <link href="{{ URL::asset('build/css/custom.min.css') }}" id="app-style" rel="stylesheet" type="text/css" />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css">
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        .cuadricula {
            background-color: white !important;
            background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) !important;
            background-size: 20px 20px !important;
        }
        .auth-one-bg {
            background: linear-gradient(to right, #efa729,#f7b84bd1, #efa729) !important;
            background-position: center;
            background-size: cover;
        }
        .shape {
            /* position: absolute; */
            /* top: 0;
            left: 0; */
            width: 100%;
            z-index: 0; /* Colocar el elemento detrás de otros elementos */
        }
        body, html {
            align-items: center !important;
            justify-content: center !important;
            background-color: #ffffff !important; /* Cambia el color de fondo */
        }
        .btn-active {
            border: 3px solid #f7b84b !important;
            background-color: #cfd1d4 !important;
        }
    </style>

</head>
<body class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div id="app" class="container mx-auto my-auto">
        <div id="authPageWrapper" class="auth-page-wrapper pt-5">
            <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
                <div class="shape">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                        <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                    </svg>
                </div>
            </div>
            <div class="card mx-auto col-12" style="background: black !important;">
                <div class="card-header" style="background: black !important;">
                    <div class="row">
                        <div class="col-12">
                                <button
                                @click="CambiarTab('matrices')"
                                type="button"
                                class="btn rounded-pill waves-effect me-2"
                                :style="{
                                backgroundColor: tabActivo == 'matrices' ? '#f7b84b' : '#fff',
                                color: 'black'
                                }"
                            >
                                Matrices
                            </button>
                            <button
                                @click="CambiarTab('sistemas_ecuaciones')"
                                type="button"
                                class="btn rounded-pill waves-effect"
                                :style="{
                                backgroundColor: tabActivo == 'sistemas_ecuaciones' ? '#f7b84b' : '#fff',
                                color: 'black'
                                }"
                            >
                                Sistema Ecuaciones
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body text-center" >
                    <div v-show="tabActivo == 'matrices'">
                        <div class="row">
                            <!-- Matriz A -->
                            <div class="col-6">
                                <div class="row">
                                    <!-- Filas A -->
                                    <div class="col-6 mb-4 text-center">
                                        <h4 style="color: #f7b84b !important;">Filas A:</h4>
                                        <div class="input-step-wrapper d-flex flex-column align-items-center mt-2">
                                            <div class="input-step d-flex align-items-center" style="width: 80%; height: 40px;">
                                                <button type="button" class="minus me-2 fs-3" @click="filasA > 1 && filasA--">–</button>
                                                <input type="number" class="product-quantity text-center fs-5 flex-grow-1" @focus="seleccionarTexto" v-model="filasA">
                                                <button type="button" class="plus ms-2 fs-3" @click="filasA++">+</button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Columnas A -->
                                    <div class="col-6 mb-4 text-center">
                                        <h4 style="color: #f7b84b !important;">Columnas A:</h4>
                                        <div class="input-step-wrapper d-flex flex-column align-items-center mt-2">
                                            <div class="input-step d-flex align-items-center" style="width: 80%; height: 40px;">
                                                <button type="button" class="minus me-2 fs-3" @click="columnasA > 1 && columnasA--">–</button>
                                                <input type="number" class="product-quantity text-center fs-5 flex-grow-1" @focus="seleccionarTexto" v-model="columnasA">
                                                <button type="button" class="plus ms-2 fs-3" @click="columnasA++">+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Matriz B -->
                            <div class="col-6">
                                <div class="row">
                                    <!-- Filas B -->
                                    <div class="col-6 mb-4 text-center">
                                        <h4 style="color: #f7b84b !important;">Filas B:</h4>
                                        <div class="input-step-wrapper d-flex flex-column align-items-center mt-2">
                                            <div class="input-step d-flex align-items-center" style="width: 80%; height: 40px;">
                                                <button type="button" class="minus me-2 fs-3" @click="filasB > 1 && filasB--">–</button>
                                                <input type="number" class="product-quantity text-center fs-5 flex-grow-1" @focus="seleccionarTexto" v-model="filasB">
                                                <button type="button" class="plus ms-2 fs-3" @click="filasB++">+</button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Columnas B -->
                                    <div class="col-6 mb-4 text-center">
                                        <h4 style="color: #f7b84b !important;">Columnas B:</h4>
                                        <div class="input-step-wrapper d-flex flex-column align-items-center mt-2">
                                            <div class="input-step d-flex align-items-center" style="width: 80%; height: 40px;">
                                                <button type="button" class="minus me-2 fs-3" @click="columnasB > 1 && columnasB--">–</button>
                                                <input type="number" class="product-quantity text-center fs-5 flex-grow-1" @focus="seleccionarTexto" v-model="columnasB">
                                                <button type="button" class="plus ms-2 fs-3" @click="columnasB++">+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center align-items-start">
                            <!-- Matriz A -->
                            <div class="mb-4 col-lg-5">
                                <h4 style="color: #f7b84b !important;">A</h4>
                                <div class="d-flex justify-content-center align-items-center">
                                    <div class="matriz-container">
                                        <div v-for="(fila, i) in getMatriz('A')" :key="i" class="text-center">
                                            <input type="number" @focus="seleccionarTexto" v-for="(valor, j) in fila" :key="j"
                                                v-model="getMatriz('A')[i][j]"
                                                class="form-control d-inline-block m-1 text-center px-1 fs-5"
                                                :style="{ width: '50px', height: '50px' }">
                                        </div>
                                    </div>
                                </div>
                                <<div class="mt-3 col-12 ">
                                    <div class="row">
                                        <div class="col-12 d-flex justify-content-center gap-3">
                                            <button @click="transponerMatriz('A')" class="btn btn-light" :class="{'btn-active': btnActivo == 'transpuesta-A'}">Transpuesta</button>

                                            <div class="d-flex align-items-center gap-2">
                                                <button @click="multiplicarPorEscalar('A')" class="btn btn-light" :class="{'btn-active': btnActivo == 'escalar-A'}">Escalar Por</button>

                                                <!-- Contenedor del input con botones al estilo de la Matriz B -->
                                                <div class="input-step-wrapper" style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
                                                    <div class="input-step" style="display: flex; align-items: center; width: 110px; height: 40px;">
                                                        <button type="button" class="minus" style="margin-right: 5px; font-size: 25px;" @click="escalarA--">–</button>
                                                        <input type="number" class="product-quantity" style="width: 90%; text-align: center; font-size: 15px;" @focus="seleccionarTexto" v-model="escalarA">
                                                        <button type="button" class="plus" style="margin-left: 5px; font-size: 25px;" @click="escalarA++">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" mt-3 col-12 d-flex justify-content-center gap-3">
                                            <button @click="inversa('A')" class="btn btn-light" :class="{'btn-active': btnActivo == 'inversa-A'}">Inversa</button>
                                            <button @click="potencia('A')" class="btn btn-light" :class="{'btn-active': btnActivo == 'potencia-A'}">Potencia Por</button>
                                            <div class="input-step-wrapper" style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
                                                <div class="input-step" style="display: flex; align-items: center; width: 110px; height: 40px;">
                                                    <button type="button" class="minus" style="margin-right: 5px; font-size: 25px;" @click="potenciaA--">–</button>
                                                    <input type="number" class="product-quantity" style="width: 90%; text-align: center; font-size: 15px;" @focus="seleccionarTexto" v-model="potenciaA">
                                                    <button type="button" class="plus" style="margin-left: 5px; font-size: 25px;" @click="potenciaA++">+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-3 col-12 d-flex justify-content-center gap-3">
                                            <button @click="determinante('A')" class="btn btn-light" :class="{'btn-active': btnActivo == 'determinante-A'}">Determinante</button>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <!-- Botones en el centro de y Intercambiar, suma, resta y multiplicación -->
                            <div class="col-lg-2 mb-3 d-flex flex-column justify-content-center align-self-stretch align-items-center">
                                <button @click="intercambiarMatrices" class="btn my-1 btn-light"  :class="{'btn-active': btnActivo === 'intercambiar'}" style="width: 80px;"><i class="ri-arrow-left-right-line "></i></button>
                                <button @click="sumarMatrices" class="btn my-1 btn-light" :class="{'btn-active': btnActivo === 'suma'}" style="width: 80px;"> A <i class="ri-add-fill"></i> B</button>
                                <button @click="restarMatrices" class="btn my-1 btn-light" :class="{'btn-active': btnActivo === 'resta'}" style="width: 80px;"> A <i class="ri-subtract-fill"></i> B</button>
                                <button @click="multiplicarMatrices" class="btn my-1 btn-light" :class="{'btn-active': btnActivo === 'multiplicacion'}" style="width: 80px;"> A <i class="ri-close-line"></i> B</button>
                            </div>


                            <!-- Matriz B -->
                            <div class="mb-3 col-lg-5">
                                <h4 style="color: #f7b84b !important;">B</h4>
                                <div class="d-flex justify-content-center align-items-center">
                                    <div class="matriz-container">
                                        <div v-for="(fila, i) in getMatriz('B')" :key="i" class="text-center">
                                            <input type="number" @focus="seleccionarTexto" v-for="(valor, j) in fila" :key="j"
                                                v-model="getMatriz('B')[i][j]"
                                                class="form-control d-inline-block m-1 text-center px-1 fs-5"
                                                :style="{ width: '50px', height: '50px' }">
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3 col-12 ">
                                    <div class="row">
                                        <div class="col-12 d-flex justify-content-center gap-3">
                                            <button @click="transponerMatriz('B')" class="btn btn-light" :class="{'btn-active': btnActivo == 'transpuesta-B'}">Transpuesta</button>
                                            <div class="d-flex align-items-center gap-2">
                                                <button @click="multiplicarPorEscalar('B')" class="btn btn-light" :class="{'btn-active': btnActivo == 'escalar-B'}">Escalar Por</button>
                                                <div class="input-step-wrapper" style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
                                                    <div class="input-step" style="display: flex; align-items: center; width: 110px; height: 40px;">
                                                        <button type="button" class="minus" style="margin-right: 5px; font-size: 25px;" @click="escalarB--">–</button>
                                                        <input type="number" class="product-quantity" style="width: 90%; text-align: center; font-size: 15px;" @focus="seleccionarTexto" v-model="escalarB">
                                                        <button type="button" class="plus" style="margin-left: 5px; font-size: 25px;" @click="escalarB++">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-3 col-12 d-flex justify-content-center gap-3">
                                            <button @click="inversa('B')" class="btn btn-light" :class="{'btn-active': btnActivo == 'inversa-B'}">Inversa</button>
                                            <button @click="potencia('B')" class="btn btn-light" :class="{'btn-active': btnActivo == 'potencia-B'}">Potencia Por</button>
                                            <div class="input-step-wrapper" style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
                                                <div class="input-step" style="display: flex; align-items: center; width: 110px; height: 40px;">
                                                    <button type="button" class="minus" style="margin-right: 5px; font-size: 25px;" @click="potenciaB--">–</button>
                                                    <input type="number" class="product-quantity" style="width: 90%; text-align: center; font-size: 15px;" @focus="seleccionarTexto" v-model="potenciaB">
                                                    <button type="button" class="plus" style="margin-left: 5px; font-size: 25px;" @click="potenciaB++">+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-3 col-12 d-flex justify-content-center gap-3">
                                            <button @click="determinante('B')" class="btn btn-light" :class="{'btn-active': btnActivo == 'determinante-B'}">Determinante</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-4">
                            <!-- Resultado -->
                            <h4 class="mt-4 text-center" style="color: #f7b84b !important;">Resultado</h4>
                            <div v-for="fila in resultado" class="text-center">
                                <span v-for="valor in fila"
                                    class="border p-2 d-inline-block m-1 fs-5"
                                    style="min-width: 60px; background-color: white;">
                                    @{{ valor }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div v-show="tabActivo == 'sistemas_ecuaciones'" >
                        <comp-sistemas-ecuaciones :n="2"></comp-sistemas-ecuaciones>
                        <comp-sistemas-ecuaciones :n="3"></comp-sistemas-ecuaciones>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/calculadora_matrices/componentes/comp-sistemas-ecuaciones.js') }}"></script>
    <script src="{{ asset('js/calculadora_matrices/calculadora_matrices.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
