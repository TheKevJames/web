jQuery.extend({
    easing: {
        // ******* back
        backEaseIn:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            var s = 1.70158; // default overshoot value, can be adjusted to suit
            return c*(p/=1)*p*((s+1)*p - s) + firstNum;
        },
        
        backEaseOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            var s = 1.70158; // default overshoot value, can be adjusted to suit
            return c*((p=p/1-1)*p*((s+1)*p + s) + 1) + firstNum;
        },
        
        backEaseInOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            var s = 1.70158; // default overshoot value, can be adjusted to suit
            if ((p/=0.5) < 1) 
                return c/2*(p*p*(((s*=(1.525))+1)*p - s)) + firstNum;
            else
                return c/2*((p-=2)*p*(((s*=(1.525))+1)*p + s) + 2) + firstNum;
        },
        
        // ******* bounce
        bounceEaseIn:function(p, n, firstNum, diff) {
            
            var c=firstNum+diff;
            var inv = this.bounceEaseOut (1-p, 1, 0, diff);
            return c - inv + firstNum;
        },
        
        bounceEaseOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;

            if (p < (1/2.75))
            {
                return c*(7.5625*p*p) + firstNum;
            }
            else if (p < (2/2.75))
            {
                return c*(7.5625*(p-=(1.5/2.75))*p + .75) + firstNum;
            }
            else if (p < (2.5/2.75))
            {
                return c*(7.5625*(p-=(2.25/2.75))*p + .9375) + firstNum;
            }
            else
            {
                return c*(7.5625*(p-=(2.625/2.75))*p + .984375) + firstNum;
            }
        },
        
        
        // ******* circ
        circEaseIn:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            return -c * (Math.sqrt(1 - (p/=1)*p) - 1) + firstNum;
        },
        
        circEaseOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            return c * Math.sqrt(1 - (p=p/1-1)*p) + firstNum;
        },
        
        circEaseInOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            if ((p/=0.5) < 1) 
                return -c/2 * (Math.sqrt(1 - p*p) - 1) + firstNum;
            else
                return c/2 * (Math.sqrt(1 - (p-=2)*p) + 1) + firstNum;
        },
        
        // ******* cubic
        cubicEaseIn:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            return c*(p/=1)*p*p + firstNum;
        },
        
        cubicEaseOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            return c*((p=p/1-1)*p*p + 1) + firstNum;
        },
        
        cubicEaseInOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            if ((p/=0.5) < 1)
                return c/2*p*p*p + firstNum;
            else
                return c/2*((p-=2)*p*p + 2) + firstNum;
        },
        
        // ******* elastic
        elasticEaseIn:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            if (p==0) return firstNum;
            if (p==1) return c;
            
            
            var peroid = 0.25;
            var s;
            var amplitude = c;
            
            if (amplitude < Math.abs(c)) 
            {
                amplitude = c;
                s = peroid/4;
            } 
            else 
            {
                s = peroid/(2*Math.PI) * Math.asin (c/amplitude);
            }
            
            return -(amplitude*Math.pow(2,10*(p-=1)) * Math.sin( (p*1-s)*(2*Math.PI)/peroid )) + firstNum;
        },
        
        elasticEaseOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            if (p==0) return firstNum;
            if (p==1) return c;
            
            var peroid = 0.25;
            var s;
            var amplitude = c;
            
            if (amplitude < Math.abs(c)) 
            {
                amplitude = c;
                s = peroid/4;
            } 
            else 
            {
                s = peroid/(2*Math.PI) * Math.asin (c/amplitude);
            }
        
            return -(amplitude*Math.pow(2,-10*p) * Math.sin( (p*1-s)*(2*Math.PI)/peroid )) + c;
        },
        
        // ******* expo
        expoEaseIn:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            return (p==0) ? firstNum : c * Math.pow(2, 10 * (p - 1)) + firstNum - c * 0.001;
        },
        
        expoEaseOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            return (p==1) ? c : diff * 1.001 * (-Math.pow(2, -10 * p) + 1) + firstNum;
        },
        
        expoEaseInOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            if (p==0) return firstNum;
            if (p==1) return c;
            
            if ((p/=0.5) < 1) 
                return c/2 * Math.pow(2, 10 * (p - 1)) + firstNum - c * 0.0005;
            else
                return c/2 * 1.0005 * (-Math.pow(2, -10 * --p) + 2) + firstNum;
        },
        
        // ******* quad
        quadEaseIn:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            return c*(p/=1)*p + firstNum;
        },
        
        quadEaseOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            return -c *(p/=1)*(p-2) + firstNum;
        },
        
        quadEaseInOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            if ((p/=0.5) < 1)
                return c/2*p*p + firstNum;
            else
                return -c/2 * ((--p)*(p-2) - 1) + firstNum;
        },

        // ******* quart
        quartEaseIn:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            return c*(p/=1)*p*p*p + firstNum;
        },
        
        quartEaseOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            return -c * ((p=p/1-1)*p*p*p - 1) + firstNum;
        },
        
        quartEaseInOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            if ((p/=0.5) < 1) 
                return c/2*p*p*p*p + firstNum;
            else
                return -c/2 * ((p-=2)*p*p*p - 2) + firstNum;
        },
        
        // ******* quint
        quintEaseIn:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            return c*(p/=1)*p*p*p*p + firstNum;
        },
        
        quintEaseOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            return c*((p=p/1-1)*p*p*p*p + 1) + firstNum;
        },
        
        quintEaseInOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            
            if ((p/=0.5) < 1)
                return c/2*p*p*p*p*p + firstNum;
            else
                return c/2*((p-=2)*p*p*p*p + 2) + firstNum;
        },
        
        // *******  sine
        sineEaseIn:function(p, n, firstNum, diff) {
            
            var c=firstNum+diff;
            return -c * Math.cos(p * (Math.PI/2)) +c + firstNum; 
        },
        
        sineEaseOut:function(p, n, firstNum, diff) {
            
            var c=firstNum+diff;
            return c * Math.sin(p * (Math.PI/2)) + firstNum;
        },
        
        sineEaseInOut:function(p, n, firstNum, diff) {

            var c=firstNum+diff;
            return -c/2 * (Math.cos(Math.PI*p) - 1) + firstNum;
        }   
    }
});
