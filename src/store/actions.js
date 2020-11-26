export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // 1.判断是否已经有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                // 2.如果有就让count+1
            if (oldProduct) {
                context.commit('addCounter', oldProduct)
                resolve('该商品数量 +1')
            } else {
                // 3.如果没有就push到cartList
                payload.count = 1
                context.commit('addToCart', payload)
                resolve('商品已添加到购物车!')
            }
        })
    }
}