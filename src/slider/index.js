import { Component } from 'rgui-ui-base';
import { Movable } from 'rgui-ui-drag';
import { dom } from 'regularjs';
import template from './index.rgl';

/**
 * @class Slider
 * @extends Component
 * @param {Object}                  options.data                     =  绑定属性
 * @param {number=0}                options.data.value              <=> 数值
 * @param {number=0}                options.data.min                <=> 最小值
 * @param {number=100}              options.data.max                <=> 最大值
 * @param {number=0}                options.data.step               <=> 间隔
 * @param {boolean=false}           options.data.readonly            => 是否只读
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
        this.defaults({
            value: 0,
            min: 0,
            max: 100,
            step: 0,
            _grid: { x: 0, y: 0 },
        });
        this.supr();
        this.watch();
    },
    /**
     * @protected
     * @override
     */
    watch() {
        this.$watch('value', (value) => {
            const isOutOfRange = this.isOutOfRange(value);
            if (isOutOfRange)
                return this.data.value = isOutOfRange;

            this.$emit('change', {
                sender: this,
                value,
            });
        });

        this.$watch(['min', 'max'], (min, max) => {
            const isOutOfRange = this.isOutOfRange(this.data.value);
            if (isOutOfRange)
                this.data.value = isOutOfRange;
        });
    },
    computed: {
        percent: {
            get() {
                return (this.data.value - this.data.min)/(this.data.max - this.data.min)*100;
            },
            set(percent) {
                let value = +this.data.min + (this.data.max - this.data.min)*percent/100;
                if (this.data.step)
                    value = Math.round(value/this.data.step)*this.data.step;
                this.data.value = value;
            },
        },
    },
    isOutOfRange(value) {
        const min = +this.data.min;
        const max = +this.data.max;

        // minDate && date < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期
        return (value < min && min) || (value > max && max);
    },
    /**
     * @private
     */
    _onMouseDown($event) {
        if (this.data.readonly || this.data.disabled)
            return;

        const e = $event.event;
        const $handle = this.$refs.handle;
        const $parent = $handle.offsetParent;
        const dimension = dom.getDimension($parent, 'center');

        this.$set('percent', (e.clientX - dimension.left)/dimension.width*100);
    },
    /**
     * @private
     */
    _onDragStart($event) {
        this.data._grid.x = this.data.step/(this.data.max - this.data.min)*$event.range.width;
    },
    /**
     * @private
     */
    _onDrag($event) {
        this.$set('percent', $event.left/$event.range.width*100);
    },
});

export default Slider;
