# <img src="https://github.com/LuciusPinhal/VoxusChallege/assets/106531308/fe10baf9-9671-4ffe-9655-d00df5c0734d" alt="Voxus" style="width: 100%px; height: 200px;"> <br> <br>  Voxus Challege

&nbsp;&nbsp;&nbsp;
 


### 📚 [Um Pouco Sobre Mim](./UmPoucoSobreMim.md)



&nbsp;&nbsp;


# Microserviço de Sunrise/Sunset

Este projeto contém um microserviço Node.js que fornece informações sobre o nascer e pôr do sol com base em coordenadas de latitude e longitude.

## Requisitos Prévios

- Docker instalado: [Download do Docker](https://www.docker.com/get-started)

# Instruções de Execução

### 🚀 Back-End (Node.js)

*  Abra o terminal e navegue até o diretório onde está o arquivo app.js na pasta BackEnd:
 ```bash
 cd BackEnd
```
&nbsp;

*  **Construir a Imagem Docker:**

 ```bash
docker build -t Docker-challenge-Voxus .
```
&nbsp;

*  **Iniciar o Contêiner:**

 ```bash
docker run -p 3000:3000 Docker-challenge-Voxus
```
&nbsp;

### 🧪 Tests (Jest.js)

*  **Construir a Imagem Docker teste:**

 ```bash
docker build -t microservico-test -f Dockerfile.test .
```
&nbsp;

*  **Iniciar o Contêiner:**

 ```bash
docker run microservico-test
```
&nbsp;

### 🚀 Front-End (Vue.js)

 * Navegue até o diretório do projeto Vue.js:
 ```bash
 cd FrontEnd/Voxus
```
&nbsp;

* Instale as dependências do projeto:
```bash
npm install
```
&nbsp;

* Inicie o servidor Vue.js:
```bash
npm run serve
```
&nbsp;

💡 Isso iniciará o servidor de desenvolvimento Vue.js, e você poderá acessar a aplicação pelo navegador em http://localhost:8080 (a menos que a porta padrão tenha sido alterada).

&nbsp;

<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=1D52FB&height=120&section=footer"/>
