<template>
    <v-content>
        <v-container fluid>
              <v-row align="center" align-content="stretch" justify="end">
                  <v-col cols="10">
                      <div class="display">
                          Gerenciamento de Perguntas
                      </div>
                  </v-col>
                  <v-col align="end" align-content="stretch" justify="end" cols="2">
                      <v-btn class="ma-2" small fab color="primary" @click="openDialog()">
                          <v-icon color="white">add</v-icon>
                      </v-btn>
                  </v-col>     
              </v-row>
              <v-row>
                  <v-col>
                      <v-alert type="success" v-if="sucessMessage">
                        Operação realizada com sucesso.
                      </v-alert>
                      <v-data-table
                      :headers="headers"
                      :items="perguntaParametroList.perguntas"
                      item-key="descricao"
                      class="elevation-1"
                      >
                      <template v-slot:item.ativo="{ item }">
                          <v-chip :color="getColor(item.ativo)" dark>{{ item.ativo === 'T' ? 'Ativo':'Inativo' }}</v-chip>
                      </template>
                      <template v-slot:item.acoes="{ item }">
                          <v-row align="center" align-content="stretch" justify="center">
                          <v-col cols="3" sm="1">
                              <v-btn color="primary" text icon small @click="openDialog(item)">
                              <v-icon>edit</v-icon>
                              </v-btn>
                          </v-col>
                          <v-col cols="3" sm="1">
                              <v-switch color="blue" @change="inactive(item)" :input-value="item.ativo==='T'"></v-switch>
                          </v-col>
                          </v-row>
                      </template>
                      </v-data-table>
                  </v-col>
              </v-row>
              <!-- DIALOG -->
              <v-dialog v-model="dialog" persistent max-width="600px">
                <v-form
                  ref="form"
                  v-model="formValidated"
                  lazy-validation
                >
                  <v-card>
                      <v-card-title>
                          <span class="headline">{{pergunta.codigo ==null ? 'Inserir pergunta' : 'Atualizar pergunta'}}</span>
                      </v-card-title>
                      <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12">
                                <v-select
                                  v-model="perguntaParametro.codigo"
                                  :items="perguntaList"
                                  :rules="requiredRule" 
                                  label="Pergunta"
                                  solo
                                  required
                                  item-text="descricao" 
                                  item-value="codigo"                       
                                ></v-select>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-select
                                  v-model="perguntaParametro.tipoPergunta"
                                  @change="adicionarListParametros()"
                                  :items="tipoPerguntaList"
                                  :rules="requiredRule" 
                                  label="Tipo de Pergunta"
                                  solo
                                  required
                                  item-text="descricao" 
                                  return-object                    
                                ></v-select>
                              </v-col>
                            </v-row>
                            {{perguntaParametro}}
                            <!--1 Tipo Escolhe Unica-->
                            <div v-if="perguntaParametro.tipoPergunta && perguntaParametro.tipoPergunta.codigo == 1">
                              <v-row>
                                <v-col cols="12">
                                  <v-btn style="width:100%" color="primary" @click="addParam()">
                                      Adicionar Novo Parametro
                                  </v-btn>
                                </v-col>
                              </v-row>
                              <v-row v-for="(parametro, index) in parametrosModelList" :key="index">
                                <v-col>
                                  <v-select
                                    v-model="parametrosModelList[index].codigo"
                                    :items="parametrosList"
                                    :rules="requiredRule"
                                    label="Parametro"
                                    required
                                    solo
                                    item-text="descricao" 
                                    item-value="codigo"                   
                                  ></v-select>
                                </v-col>
                                <v-col>
                                  <v-radio-group v-model="parametrosModelList[index].inapta" row :mandatory='true'>
                                    <v-radio label="Inapto" value="S"></v-radio>
                                    <v-radio label="Apto" value="N"></v-radio>
                                  </v-radio-group>
                                </v-col>
                              </v-row>
                            </div>
                          </v-container>
                      </v-card-text>
                      <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
                          <v-btn color="blue darken-1" text @click="save()">Salvar</v-btn>
                      </v-card-actions>
                  </v-card>
                  </v-form>
              </v-dialog>
             
        </v-container>  
    </v-content>
</template>

<script>

//import perguntaModel from '@/model/pergunta'
//import PerguntaUnica from '../components/custom-components/modelos-perguntas/PerguntaUnica';

export default {
  components:{
  },
  created: function(){
    this.getAll();
      this.carregarPerguntas();
      this.carregarTiposPerguntas();
      this.carregarParametros();     
  },
  data: () => ({
    sucessMessage: false,
    dialog: false,
    perguntaParametro:{
      codigo: null,
      tipoPergunta:{
        codigo:null
      }
    },
    pergunta: {},
    selected: [],
    perguntaList: [],
    parametrosModelList:[],
    perguntaParametroList:[],
    tipoPerguntaList: [],
    parametrosList:[],
    formValidated:null,
    requiredRule: [
      v => !!v || 'Campo é requirido'
    ],
    headers: [
        {
          text: 'Descrição',
          align: 'left',
          sortable: true,
          value: 'descricao',
        },
        {
          text: 'Status',
          align: 'center',
          sortable: true,
          value: 'ativo',
        },
        { text: 'Ações', value: 'acoes', align: 'center' },

    ]
  }),
  methods:{
    addParam(){
      this.parametrosModelList.push({
        codigo:null,
        inapta:null
      });
    },
    carregarPerguntas(){
        this.$http.get('/pergunta').then((res)=>{
            this.perguntaList = res.data;
        });
    },
    carregarParametros(){
        this.$http.get('/parametro').then((res)=>{
            this.parametrosList = res.data;
        });
    },
    carregarTiposPerguntas(){
        this.$http.get('/tipo-pergunta').then((res)=>{
            this.tipoPerguntaList = res.data;
        });
    },
    adicionarListParametros(){
      this.perguntaParametro.tipoPergunta.parametros = [];
    },
    openDialog(pergunta){
      if(pergunta !== undefined){
        this.pergunta = pergunta;
      }else{
        this.pergunta = {};
      }
      this.dialog = true;
    },
    save(){
      if(this.$refs.form.validate()){
        if(this.pergunta.codigo==null){
        this.pergunta.ativo='T';
        this.perguntaParametro.tipoPergunta.parametros = this.parametrosModelList;
        this.insert(this.perguntaParametro).then(() => {
            this.dialog=false;
            this.sucessMessage = true;
            this.getAll();
            setTimeout(()=>{ this.sucessMessage = false; }, 3000);
        })
        }else{
          this.sucessMessage = true;
          this.update(this.pergunta).then(() => {
              this.dialog=false;
              this.getAll();
              setTimeout(()=>{ this.sucessMessage = false; }, 3000);
          });
        }
      }      
    },
    inactive(pergunta){
      pergunta.ativo = pergunta.ativo === 'T'? 'F':'T';
      this.update(pergunta).then(() => {
            this.getAll();
      });
    },
    getAll(){
      this.$http.get('/pergunta-parametro').then(res => {
        this.perguntaParametroList = res.data;
      });
    },
    update(pergunta){
      return this.$http.put('/pergunta-parametro',pergunta);
    },
    insert(pergunta){
      return this.$http.post('/pergunta-parametro',pergunta);
    },
    getColor (ativo) {
        if (ativo == 'T') return 'green'
        else return 'red'
    }
  }
}
</script>

<style>

</style>
