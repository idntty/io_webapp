function createBlob(options) {



    let points = [];
    let slice = (Math.PI * 2) / options.numPoints;
    let startAngle = 0;

    for (let i = 0; i < options.subkey.length; i++) {
        let angle = startAngle + i * slice;
        let rnd = Number("0x"+options.subkey.substring(i+0,i+1));
        let point = {
            x: options.centerX + Math.cos(angle) * (options.radius + rnd),
            y: options.centerY + Math.sin(angle) * (options.radius + rnd)
        };
        points.push(point);
    }


    let size = points.length;
    let path = "M" + points[0].x + " " + points[0].y + " C";

    for (let i = 0; i < size; i++) {
        let p0 = points[(i - 1 + size) % size];
        let p1 = points[i];
        let p2 = points[(i + 1) % size];
        let p3 = points[(i + 2) % size];

        let x1 = p1.x + (p2.x - p0.x) / 6;
        let y1 = p1.y + (p2.y - p0.y) / 6;

        let x2 = p2.x - (p3.x - p1.x) / 6;
        let y2 = p2.y - (p3.y - p1.y) / 6;

        path += " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + p2.x + " " + p2.y;
    }

    return path + "z";
}



export var generateSvgAvatar = (function () {
    return function (seed, raw) {
        let pubKey = localStorage.getItem('svgKey') || Math.floor(Math.random()*65535*65535).toString(16) + Math.floor(Math.random()*65535*65535).toString(16) + Math.floor(Math.random()*65535*65535).toString(16) + Math.floor(Math.random()*65535*65535).toString(16) + Math.floor(Math.random()*65535*65535).toString(16) + Math.floor(Math.random()*65535*65535).toString(16) + Math.floor(Math.random()*65535*65535).toString(16) + Math.floor(Math.random()*65535*65535).toString(16);
        //pubKey = "73f47d4929d7b2b6598ca4999d52567f9bb5aef3e353e0a66b468096db6e4e88"
        if (!localStorage.getItem('svgKey')) {
            localStorage.setItem('svgKey', `${pubKey}`)
        }
        let particles = [];
        let gradients = ['#000000'];
        let defs = [];

        for (let a = 0; a<64; a = a + 8) {
            let blob = createBlob({
                numPoints: 8,
                centerX: 256,
                centerY: 256-a*4,
                radius: 16,
                subkey: pubKey.substring(a,a + 8)
            });

            let color =  "#" + pubKey.substring(a+2,a+8);
            let width = Number("0x"+pubKey.substring(a,a+1));
            let opacity = Number("0x"+pubKey.substring(a+1,a+2))/8;

            gradients.push(color);
            defs.push(`<radialGradient id="a-${a}" cx="0" cy="0" r="0.75" fx="0.35" fy="0.5" spreadMethod="reflect"><stop offset="0%" stop-color="${gradients[gradients.length-1]}"/><stop offset="100%" stop-color="${gradients[gradients.length]}"/></radialGradient>`);
            particles.push(`<path d="${blob}" stroke="url(#a-${a})" stroke-width="${width}" stroke-opacity = "${opacity}" fill="transparent"/>`);

        }


        let ph = "";
        let off = 4 + Number("0x"+pubKey.substring(0,1));
        let rotate = 0;
        for (var i = 0; i < off; i++){
            ph = ph + `<use xlink:href="#pattern-${pubKey}" mask="url(#mask)" class="segment" style="transform-origin:center center;transform: scaleY(1) rotate(${rotate}deg)"></use>,` + "\n";
            rotate = rotate + 360/off;
        }




        var svg = [
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" preserveAspectRatio="xMidYMid slice" viewBox="0 0 512 512">',
            '<defs>',
            '<radialGradient id="e" cx="0" cy="0" r="0.75" fx="0.35" fy="0.5" spreadMethod="reflect">',
            '<stop offset="0%" stop-color="red"/>',
            '<stop offset="100%" stop-color="blue"/>',
            '</radialGradient>',defs.join('\n'),
            '</defs>',
            '<symbol id="pattern-' + pubKey + '">',
            particles.join(''),
            '</symbol>',
            '<g style="transform-origin:center center; transform: rotate(' + pubKey + 'deg)">',
            ph,
            '</g>',
            '</svg>',
        ].join('');
        // document.getElementById("myImg").src = raw ? svg : 'data:image/svg+xml;base64,' + btoa(svg);
        return raw ? svg : 'data:image/svg+xml;base64,' + btoa(svg);
    };

})();
