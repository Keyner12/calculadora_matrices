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
            background: linear-gradient(to right, #0b4897, #6495ed, #0b4897) !important;
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
            border: 2px solid #687cfe !important;
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
            <div class="card mx-auto col-12">
                <!-- <div class="card-header text-center">
                    <h2>Calculadora de Matrices</h2>
                </div> -->
                <div class="card-body text-center" >
                    <!-- Tamaño de la matriz -->
                    <div class="row">
                        <!-- Filas -->
                        <div class="col-5 mb-4 text-center">
                            <h4>Filas:</h4>
                            <div class="input-step-wrapper" style="display: flex; justify-content: center; flex-direction: column; align-items: center; margin-top: 10px;">
                                <div class="input-step" style="display: flex; align-items: center; width: 40%; height: 40px;">
                                    <button type="button" class="minus" style="margin-right: 5px; font-size: 25px;" @click="decrementarFilas">–</button>
                                    <input type="number" class="product-quantity" style="width: 90%; text-align: center; font-size: 15px;" @focus="seleccionarTexto" v-model="filas">
                                    <button type="button" class="plus" style="margin-left: 5px; font-size: 25px;" @click="filas++">+</button>
                                </div>
                            </div>
                        </div>

                        <div class="col-2 mb-4 text-center">
                        </div>
                        <!-- Columnas -->
                        <div class="col-5 mb-4 text-center">
                            <h4>Columnas:</h4>
                            <div class="input-step-wrapper" style="display: flex; justify-content: center; flex-direction: column; align-items: center; margin-top: 10px;">
                                <div class="input-step" style="display: flex; align-items: center; width: 40%; height: 40px;">
                                    <button type="button" class="minus" style="margin-right: 5px; font-size: 25px;" @click="decrementarColumnas">–</button>
                                    <input type="number" class="product-quantity" style="width: 90%; text-align: center; font-size: 15px;" @focus="seleccionarTexto" v-model="columnas">
                                    <button type="button" class="plus" style="margin-left: 5px; font-size: 25px;" @click="columnas++">+</button>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div class="row d-flex justify-content-center align-items-start">
                        <!-- Matriz A -->
                        <div class="mb-4 col-lg-5">
                            <h4>A</h4>
                            <div class="d-flex justify-content-center align-items-center">
                                <div class="matriz-container">
                                    <div v-for="(fila, i) in getMatriz('A')" :key="i" class="text-center">
                                        <input type="number" @focus="seleccionarTexto" v-for="(valor, j) in fila" :key="j"
                                            v-model="getMatriz('A')[i][j]"
                                            class="form-control d-inline-block m-1 text-center"
                                            :style="{ width: '50px', height: '50px' }">
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3 col-12 d-flex justify-content-center gap-3">
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

                        </div>
                        <!-- Botones en el centro de y Intercambiar, suma, resta y multiplicación -->
                        <div class="col-lg-2 mb-3 d-flex flex-column justify-content-center align-self-stretch align-items-center">
                            <button @click="intercambiarMatrices" class="btn my-1 btn-light"  :class="{'btn-active': btnActivo === 'intercambiar'}" style="width: 80px;"><i class="ri-arrow-left-right-line"></i></button>
                            <button @click="sumarMatrices" class="btn my-1 btn-light" :class="{'btn-active': btnActivo === 'suma'}" style="width: 80px;"> A <i class="ri-add-fill"></i> B</button>
                            <button @click="restarMatrices" class="btn my-1 btn-light" :class="{'btn-active': btnActivo === 'resta'}" style="width: 80px;"> A <i class="ri-subtract-fill"></i> B</button>
                            <button @click="multiplicarMatrices" class="btn my-1 btn-light" :class="{'btn-active': btnActivo === 'multiplicacion'}" style="width: 80px;"> A <i class="ri-close-line"></i> B</button>
                        </div>


                        <!-- Matriz B -->
                        <div class="mb-3 col-lg-5">
                            <h4>B</h4>
                            <div class="d-flex justify-content-center align-items-center">
                                <div class="matriz-container">
                                    <div v-for="(fila, i) in getMatriz('B')" :key="i" class="text-center">
                                        <input type="number" @focus="seleccionarTexto" v-for="(valor, j) in fila" :key="j"
                                            v-model="getMatriz('B')[i][j]"
                                            class="form-control d-inline-block m-1 text-center"
                                            :style="{ width: '50px', height: '50px' }">
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3 col-12 d-flex justify-content-center gap-3">
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
                        </div>
                    </div>

                    <!-- Resultado -->
                    <h4 class="mt-4 text-center">Resultado</h4>
                    <div v-for="fila in resultado" class="text-center">
                        <span v-for="valor in fila"
                            class="border p-2 d-inline-block m-1"
                            style="width: 50px; background-color: white;">
                            @{{ valor }}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/calculadora_matrices/calculadora_matrices.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
