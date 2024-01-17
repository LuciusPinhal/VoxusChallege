<template>
  <div class="container">
    <MessageError :msg="msg" v-show="msg" />
    <h1 class="title">Sunset/Sunrise Info</h1>
    <form @submit.prevent="getSunInfo">
      <div class="file-input-wrapper form-group">
        <div class="file-input-container input-select">
            <label for="type" class="file-input">Type:</label>
                  <select v-model="type">
                  <option value="sunrise">Sunrise</option>
                  <option value="sunset">Sunset</option>
                </select>           
          </div>
      </div>
      <div class="file-input-wrapper form-group">               
          <div class="file-input-container input-container">
              <label for="latitude" class="file-input">Latitude:</label>
              <p class="file-input"></p>
              <input type="text" id="replaceTo" placeholder="Digite a latitude" v-model="latitude" required>
          </div>

           <div class="file-input-container input-container">
                <label for="longitude" class="file-input">Longitude:</label>
                <p class="file-input"></p>
                <input type="text" id="replaceTo" placeholder="Digite a longitude" v-model="longitude" required>
            </div>
        
      </div>
      <button id="copyBtn" type="submit">Get Info</button>
    </form>

    <div v-if="!isLoading">
      <div v-if="sunInfo" class="info">
        <hr>
        <h2>Results:</h2>
        <div v-if="inforemainingTime">
          <p><span class="topic">Remaining Time:</span> This event has already passed</p>
        </div>
        <div v-else>
          <p><span class="topic">Remaining Time:</span> {{ sunInfo.remainingTime }}</p>
        </div>
        <p><span class="topic">Exact DateTime:</span> {{ sunInfo.exactDateTime }}</p>
        <p><span class="topic">Request DateTime:</span> {{ sunInfo.requestDateTime }}</p>
      </div>
    </div>
    <div v-else>
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import MessageError from "../components/MessageError.vue"
export default {
  data() {
    return {
      msg: null,
      type: 'sunrise',
      latitude: '',
      longitude: '',
      sunInfo: null,
      autoRefresh: false,
      refreshTimer: null,
      inforemainingTime: false,
      isLoading: false,
      SunInfo: {
        type: '',
        latitude: '',
        longitude: '',
      },
    };
  },
  components: {
    MessageError,

  },

  methods: {
    startRefreshTimer() {
      this.refreshTimer = setInterval(() => {
        this.reloadInfo();
      }, 1000); 
    },
    async stopRefreshTimer() {
      clearInterval(this.refreshTimer);
    },
    async reloadInfo() { 
      try {
        const response = await this.$axios.post('http://localhost:3000/getSunInfo', {
          type: this.SunInfo.type,
          latitude: this.SunInfo.latitude,
          longitude: this.SunInfo.longitude,
        });
        this.sunInfo = response.data;
      } catch (error) {
        this.msg = 'Erro na requisição: ' + error.message;
        setTimeout(() => (this.msg = ''), 3000);
      }       
    },
    
    async getSunInfo() {
      this.isLoading = true;
      clearInterval(this.refreshTimer);
      if (!this.latitude || !this.longitude) {
        this.msg = 'Latitude e longitude são obrigatórias.';
        setTimeout(() => (this.msg = ''), 2000);
        return;
      }
      // Validar se o tipo (type) é válido
      const validTypes = ['sunset', 'sunrise'];
      const lowerCaseType = this.type.toLowerCase();

      if (!validTypes.includes(lowerCaseType)) {
        this.msg = 'Tipo inválido. Deve ser "sunset" ou "sunrise".';
        setTimeout(() => (this.msg = ''), 3000);
        return;
      }
      
      try {
        const response = await this.$axios.post('http://localhost:3000/getSunInfo', {
          type: lowerCaseType,
          latitude: this.latitude,
          longitude: this.longitude,
        });
        this.sunInfo = response.data;
        this.inforemainingTime = false;

        if (this.sunInfo.remainingTime == '00:00:00') {
            this.inforemainingTime = true;
        }
        this.startRefreshTimer();
        this.SunInfo.type = this.type;
        this.SunInfo.latitude = this.latitude;
        this.SunInfo.longitude = this.longitude;
        this.isLoading = false;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          this.msg = error.response.data.error;
        } else if (error.code === 'ECONNREFUSED') {
          this.msg = 'Erro de conexão: O servidor não está respondendo.';
        } else if (error.message.includes('Cannot read properties of undefined')) {
          this.msg = 'Erro: A resposta do servidor está vazia ou em um formato inesperado.';
        } else {
          this.msg = 'Erro na requisição: ' + error.message;
        }
        this.isLoading = false;
        this.sunInfo = null;
        setTimeout(() => (this.msg = ''), 3000);
      }
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 2rem;
} 
.info{
  margin-top: 20px;
}
.info > div,
.info > p,
.info > h2 {
  margin-top: 10px;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.container {
    margin-top:10vh !important;
    max-width: 800px;
    padding: 20px;
    border: 1px solid #ccc;
    margin: 0 auto;
}
.title{
    margin: 0 0px 1rem 0;
}
.file-input-wrapper {
    display: flex;
    width: 100%;
}
#sourceFile,
#destinationFile {
    width: 100%;
}
.file-input-container {
    flex: 1;
    position: relative;
    border: 2px solid #ccc;
    padding: 15px;
    margin-right: 10px;
}
.input-select{
    flex: 4;
}
.topic{
  font-weight: bold;
  font-size: 16px;
}

#attributeOneValue,
#attributeTwoValue,
#attributeTheeValue,
#attributeFourValue,
#attributeFiveValue{
  font-size: 11px;
  left: 12rem;
  top: -26px;
}

#attributeTheeValue{
  left: 10rem;
}

#attributeFourValue{
  left: 5rem;
  top: -25px;
}

.input-container{
    width: 42%;
}

.file-input {
    position: absolute;
    top: -9px;
    left: 12px;
    background-color: #fff;
    font-weight: bold;
    font-size: 14px;
    z-index: 1;
}
.file-input input[type="file"] {
    width: 100%;
}
.form-group {
    margin-bottom: 1rem;
} 
label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}
input[type="text"],
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
} 
#downloadButton {
    text-align: center;
    margin-top: 20px;
}
#attributeThreeValue{
  left: 35rem;
  top: -28px;

}
button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
    font-weight: bold;
    transition: background-color 0.3s;
}
button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
button:hover {
    background-color: #0056b3;
}
input[type=file]::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #007bff;
    padding: 10px 20px;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    transition: background .2s ease-in-out;
  }
  
input[type=file]::file-selector-button:hover {
  background: #0056b3;
}
.titles{
  display: flex;
  align-items: baseline;
  justify-content: space-between;

}
.table-container {
  max-height: 165px;
  overflow-y: auto;
  border: 1px solid #ccc;
}

.table-container p {
  margin: 0;
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

.table-container p:last-child {
  border-bottom: none;
}

.table-container table {
  width: 100%;
  border-collapse: collapse;
}

.table-container th,
.table-container td {
  padding: 8px 8px 8px 30px;
  width: 50%;
  text-align: left;
}

.table-container th {
  background-color: #f9f9f9;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.table-container td {
  border-bottom: 1px solid #eee;
}

#sheetCheckboxes {
  display: block;
  align-items: center;
}

.checkboxContainer {
  margin: 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0);
  transition: 0.4s;
}

.checkboxContainer input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  margin-right: 10px;
  
}
.checkboxContainer p{
 margin: 0;
}

.checkboxContainer:hover {
  background-color:  #084cdf;
  opacity: 0.8;
  border-radius: 4px;
  color: rgb(232, 231, 231); 
  transition: 0.4s;
}

#buttonSave{
  display: none;
  align-content: center;
  align-items: center;
  justify-content: center;
}
#saveButton{
  display: none;
  width: 80%;
} 



</style>
