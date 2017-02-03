import Slider from './slider'

(function($) {
    /**
     * Declare jQuery plugin for slider-360
     * @param options
     * @returns {jQuery}
     */
    $.fn.slider = function(options) {
        this.data('slider', new Slider(this, options));

        return this;
    };
}(jQuery));