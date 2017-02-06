import Slider from './slider'

/**
 * Declare jQuery plugin for slider-360
 * @param options
 * @returns {jQuery}
 */
jQuery.fn.slider = function(options) {
    this.data('slider', new Slider(this, options));

    return this;
};