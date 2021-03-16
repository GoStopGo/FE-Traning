import productApi from '@/api/product'

const state = {
  products: [],
  productCreation: {
    imgUrl: '',
    name: '',
    originalPrice: null,
    finalPrice: null,
    available: false
  }
}

const getters = {
  availableProducts: state => state.products.filter(p => p.available)
}

const mutations = {
  SET_PRODUCTS: (state, data) => {
    state.products = data
  },
  SET_PRODUCT_CREATION: (state, data) => {
    state.productCreation = data
  }
}

const actions = {
  async createProduct ({ commit }, payload) {
    const response = await productApi.createProduct(payload)
    return response
  },

  async updateProduct ({ commit }, { code, payload }) {
    const response = await productApi.updateProduct(code, payload)
    return response
  },

  async fetchProducts ({ commit }, configs) {
    commit('SET_PRODUCTS', [])
    const response = await productApi.fetchProducts(configs)
    const { data } = response.data

    commit('SET_PRODUCTS', data)
    return response
  },

  async deleteProduct ({ commit }, { code, payload }) {
    const response = await productApi.deleteProduct(code, payload)
    return response
  },

  updateProductCreation ({ commit }, object) {
    commit('SET_PRODUCT_CREATION', object)
  }
}

export default { state, getters, mutations, actions, namespaced: true }
