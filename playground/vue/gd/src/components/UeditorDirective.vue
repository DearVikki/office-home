<template>
  <div v-ueditor="content" v-ueditor.config="config">
    <div></div>
  </div>
</template>
<script>
    import Vue from 'vue';
    Vue.directive('ueditor', {
        bind: function (el, binding, vnode) {
            el.childNodes[0].id = 'ueditor_demo';
            el.editor = UE.getEditor('ueditor_demo', binding.modifiers.config)
            console.log(binding.value)
            el.editor.ready(function () {
                el.editorReady = true
                el.editor.setContent(binding.value)
                el.editor.addListener("contentChange", function () {
                    vnode.data.content = el.editor.getContent()
                })
            })
        },
        update: function (el, binding) {
            if (el.editorReady) {
                el.editor.setContent(binding.value || '')
            }
        },
        unbind: function (el) {
            el.editor.destroy()
        }
    })
    export default{
        name: 'ueditor',
        props: {
          config: {
              type: Object,
              default: null
          },
          content: String
        }
    }
</script>
