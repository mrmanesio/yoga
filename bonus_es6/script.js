window.addEventListener('DOMContentLoaded', function () {

    class Options {
        constructor(height, width, bg, fontSize, textAlign) {
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
        }

        createBlock(str) {
            let div = document.createElement('div');
            let param = `height: ${this.height}px; 
                         width: ${this.width}px; 
                         background: ${this.bg}; 
                         font-size: ${this.fontSize}px; 
                         text-align: ${this.textAlign}`
            div.style.cssText = param;
            
            div.textContent = str;

            return div;
        }
    }



    let option = new Options(200, 300, 'gray', 18, 'center');
    let elem = option.createBlock('hello bitch');

    document.querySelector('.app').append(elem);

});