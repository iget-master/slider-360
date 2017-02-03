# Slider 360

This is a simple and responsive 360º Slider.

## Usage example

```
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div id="my-slider-id" class="slider-360">
                    <img src="img/0.jpg">
                    <!-- ... -->
                    <img src="img/15.jpg">
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="./js/slider-360.min.js"></script>

    <script>
        $("#my-slider-id").slider({
            threshold: 20
        });
    </script>
```