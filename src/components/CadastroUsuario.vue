<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-row class="d-flex justify-center">
                    <v-col cols="6" class="d-flex justify-center">
                        <p class="display-1">
                            Dados Pessoais
                        </p>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-form
                    ref="form"
                    v-model="formValidated"
                    lazy-validation
                >
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field
                                label="Nome"
                                placeholder="Digite seu nome"
                                outlined
                                v-model="usuario.nome"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field
                                label="Data de Nascimento"
                                placeholder="Data de Nascimento"
                                outlined
                                v-mask="'##/##/####'"
                                v-model="usuario.dataNascimento"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field
                                label="E-mail"
                                placeholder="Digite seu email"
                                outlined
                                v-model="usuario.email  "
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="6">
                            <v-text-field
                            outlined
                            placeholder=" "
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            label=""
                            required
                            color="textColor"
                            class="input-group--focused"
                            @click:append="show = !show" :rules="requiredRule" 
                            v-model="usuario.senha" 
                            >
                            <template v-slot:label><span class="dialog-span">Senha</span></template>
                            </v-text-field>
                        </v-col>           
                        <v-col sm="6">
                            <v-text-field 
                                outlined 
                                placeholder=" " 
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'"
                                label=""
                                required 
                                color="textColor"
                                class="input-group--focused"
                                @click:append="show1 = !show1" :rules="confirmPasswordErrors && requiredRule" 
                                :error-messages="confirmPasswordErrors" 
                                v-model="usuario.confirma_senha" 
                                >
                                <template v-slot:label><span class="dialog-span">Confirma Senha</span></template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn style="width:100%" text @click="save()" large>Cadastre-se</v-btn>
                        </v-col>
                    </v-row>  
                </v-form>  
            </v-card-text>
        </v-card>
        
            
    </v-container>
</template>
<script>
export default {
    data: () => ({
        formValidated:'',
        show: false,
        show1: false,
        usuario: {},
        requiredRule: [
            v => (!!v) || 'Campo é requirido'
        ],
        confirm_user_password: ''
    }),
    computed:{
        confirmPasswordErrors() {

            const errors = [];
            if (this.usuario.senha != this.usuario.confirma_senha) {
            errors.push('Valores de senha devem ser iguais!');
            } 
            return errors;

        },
    },
    methods:{
        save(){
             if(this.$refs.form.validate()){
                                  
                 var usuario = {};
                 usuario.nome = this.usuario.nome;
                 usuario.dataNascimento = this.castDataNascimento(this.usuario.dataNascimento);
                 usuario.email = this.usuario.email;
                 usuario.senha = this.usuario.senha;
                 
                 this.$http.post("/pessoa", usuario)
                 .then((res)=>{
                     console.log(res+"cadastro realizado com sucesso");
                 }).catch((res)=>{
                    console.log(res+"cadastro realizado com sucesso");
                 })

             }
        },
        castDataNascimento(value){
            return value.substring(6,10)+"-"+value.substring(3,5)+"-"+value.substring(0,2)
        }
    }
}
</script>
<style>

</style>