import defaultOptions from './options'

class Slider {
    /**
     *
     * @param {jQuery} container
     * @param {object} options
     */
    constructor (container, options) {
        this.container = container;
        this.options = jQuery.extend(defaultOptions, options);

        this.init();
    }

    /**
     * Initialize the slider
     */
    init () {
        this.images = this.container.find('img');
        this.images.first().addClass('active');
        this.currentImage = 0;
        this.loadedImages = 0;
        this.loaded = false;
        this.dragging = false;

        this.container.on('mousedown touchstart', jQuery.proxy(this.dragStartEventHandler, this));
        jQuery(window).on('mouseup touchend', jQuery.proxy(this.dragEndEventHandler, this));
        jQuery(window).on('mousemove touchmove', jQuery.proxy(this.dragMoveEventHandler, this))
        jQuery(window).on('resize', jQuery.proxy(this.windowResizeEventHandler, this))

        this.images.one('load', (event) => {
            let image = jQuery(event.target);

            this.container.css({
                'height': image.height(),
                'width': image.width(),
            });

            this.loaded = (++this.loadedImages === this.images.length);
        }).each((index, element) => {
            if (element.complete) {
                let image = jQuery(element);

                this.container.css({
                    'height': image.height(),
                    'width': image.width(),
                });

                this.loaded = (++this.loadedImages === this.images.length);
            }
        });
    }

    /**
     * Handle window resize event
     * @param {Event} event
     */
    windowResizeEventHandler (event) {
        if (this.loaded) {
            this.container.css({
                'height': '',
                'width': ''
            });
            let image = this.images.first();

            this.container.css({
                'height': image.height(),
                'width': image.width(),
            });
        }
    }

    /**
     * Handle drag start event (mousedown, touchdown)
     * @param {Event} event
     */
    dragStartEventHandler (event) {
        let X = event.pageX;
        // Normalize touch X position
        if (event.type === 'touchstart') {

            if (event.touches.length === 1) {
                X = event.touches[0].pageX;
            } else {
                return;
            }
        } else {
            event.preventDefault();
        }

        this.dragging = true;
        this.dragStartPosition = {
            currentImage: this.currentImage,
            X,
        };


    }

    /**
     * Handle drag end event (mouseup, touchup)
     * @param {Event} event
     */
    dragEndEventHandler (event) {
        this.dragging = false;
    }

    /**
     * Handle drag move
     * @param {Event} event
     */
    dragMoveEventHandler (event) {
        if (this.dragging) {
            let X = event.pageX;

            // Normalize touch X position
            if (event.type === 'touchmove') {
                if (event.touches.length === 1) {
                    X = event.touches[0].pageX;
                } else {
                    return;
                }
            }

            let distanceFromStart = this.dragStartPosition.X - X;
            let slidesToMove = Math.floor(distanceFromStart / this.options.threshold);
            let nextImage = (this.dragStartPosition.currentImage + slidesToMove) % this.images.length;

            this.images.eq(this.currentImage).removeClass('active');
            this.images.eq(nextImage).addClass('active');
            this.currentImage = nextImage;
        }
    }
}

export default Slider;