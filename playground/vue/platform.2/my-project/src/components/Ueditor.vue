<template>
    <div ref="editor"></div>
</template>

<script>
    module.exports = {
        props: {
            value: {
                type: String,
                default: null
            },
            config: {
                type: Object,
                default: function () { return {} }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 保证 this.$el 已经插入文档
                let id = 'ueditor-demo'

                this.$refs.editor.id = id
                this.editor = UE.getEditor(id, this.config)

                this.editor.ready(function () {
                    this.editor.setContent(this.value);

                    this.editor.addListener("contentChange", function () {
                        this.$emit('input', this.editor.getContent())
                    }.bind(this))

                    this.$emit('ready', this.editor)
                }.bind(this))
            })
        },
        watch:{
            value(newVal){
                this.editor.setContent(newVal);
            }
        },
        beforeDestroy:function(){
            this.editor.destroy();
        }
    }
</script>
<style scoped>
</style>
