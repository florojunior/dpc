import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicial from '../components/Inicial'
import CadastroUsuario from '../components/CadastroUsuario'
import Parametro from '../components/Parametro'
import TipoPergunta from '../components/TipoPergunta'
import Pergunta from '../components/Pergunta'
import Formulario from '../components/Formulario'
import Questionario from '../components/Questionario'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Inicial',
    component: Inicial
  },
  {
    path: '/usuario',
    name: 'CadastroUsuario',
    component: CadastroUsuario
  },
  {
    path: '/parametro',
    name: 'Parametro',
    component: Parametro
  },
  {
    path: '/tipo-pergunta',
    name: 'tipoPergunta',
    component: TipoPergunta
  },
  {
    path: '/pergunta',
    name: 'Pergunta',
    component: Pergunta
  },
  {
    path: '/formulario',
    name: 'Formulario',
    component: Formulario
  },
  {
    path: '/questionario',
    name: 'questionario',
    component: Questionario
  }
]

const router = new VueRouter({
  routes
})

export default router
