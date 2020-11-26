import BackTop from 'components/content/backTop/BackTop'

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBT: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 200)
        },
        getIsShowBT(position) {
            this.isShowBT = position.y < -1000
        }
    }
}