
export const defaultTemplate =
    `<template>
    <div class="root">
    <%-code%>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    mixins: [],
    props: {},
    data () {
        return {
            <% data.forEach(function(item){%><%-item%>,
            <% }) %>
        }
    },
    watch: {
    },
    computed: {
    },
    created () {
    },
    mounted () {
        // 页面缓存
        this.$store.dispatch("getCache").then(res => {
            if (res.success) {
                Object.assign(this.$data, res.model)
                if (res.refresh) {
                    this.init()
                }
            } else {
                this.init()
            }
        })
    },
    methods: {
        <% events.forEach(function(item){%><%-item%>
        <% }) %>
    }
}
</script>

<style lang="scss" scoped>
</style>`
