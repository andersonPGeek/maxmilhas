<template>
  <div id="search-cpf">
    <h1>Consulta CPF</h1>

    <div class="form-group">
      <input
        type="text"
        name="cpf"
        v-model="cpfSearch"
        placeholder="CPF"
        class="form-control"
        v-on:keyup="searchCPF"
      >
    </div>
    <p>{{this.message.title}}</p>
    <div class="form-btn">
      <button :disabled="isFree" v-on:click="insertCPF" class="btn btn-primary">Inserir</button>
      <button :disabled="isBlock" v-on:click="deleteCPF" class="btn btn-primary">Remover</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: {},
      cpfSearch: ""
    };
  },

  created: function() {
    this.searchCPF();
  },

  computed: {
    isFree() {
      return this.message.title === 'BLOCK' || this.message.title === 'CPF inválido';
    },
    isBlock() {
        console.log(this.message.title);
      return this.message.title === 'CPF inválido' || this.message.title === 'FREE';
    }
  },

  methods: {
    searchCPF: function() {
      this.$http
        .get("http://localhost:3000/consulta/?cpf=" + this.cpfSearch)
        .then(response => {
          this.message = response.body;
        });
    },
    insertCPF: function() {
      console.log(this.cpfSearch);
      this.$http
        .post("http://localhost:3000/inserir/", { cpf: this.cpfSearch })
        .then(response => {
          this.message = response.body;
        });
    },
    deleteCPF: function() {
      this.$http
        .delete("http://localhost:3000/delete/" + this.cpfSearch)
        .then(response => {
          this.message = response.body;
        });
    }
  }
};
</script>
