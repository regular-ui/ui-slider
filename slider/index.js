import { Component } from 'rgui-ui-base';
import template from './index.rgl';
import { dom } from 'regularjs';
import 'rgui-ui-drag';

/**
 * @class Slider
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string='Hello World'}    options.data.message            <=> 消息
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
const Slider = Component.extend({
    name: 'slider',
    template,
    /**
     * @protected
     * @override
     */
    config() {
        this.data = Object.assign({
            percent: 0,
        }, this.data);
        this.supr();

        this.$watch('percent', (newValue, oldValue) => {
            this.$emit('change', {
                sender: this,
                percent: newValue,
            });
        });
    },
    /**
     * @private
     */
    _onMouseDown($event) {
        if(this.data.readonly || this.data.disabled)
            return;

        const e = $event.event;
        const $handle = this.$refs.handle;
        const $parent = $handle.offsetParent;
        const position = dom.getPosition($parent);
        this.data.percent = (e.clientX - position.left)/$parent.offsetWidth*100;
    },
    /**
     * @private
     */
    _onDrag($event) {
        this.data.percent = $event.left/$event.range.right*100;
    },
});

export default Slider;
