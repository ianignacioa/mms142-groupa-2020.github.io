/**
 * This webpage is for 
 */

!function(exports){
    /**
     * @type {SecurityPolicyViolationEvent}
     * @see System();
     * 
     * @see console.log(exports[1]().hasOwnProperty('a'));
     * @see console.log(exports[1]().a.call());
     */
    function System(worker){
        for(;worker.length;){
            const fn = worker.shift();
            var obj = new fn();
            
            "function" == typeof fn && "object" == typeof worker && obj.hasOwnProperty('a') ? console.log(true) : console.log(false);
            
        }
    }
    System(exports);
}

([
    /**
     * @type {module}
     */
    (function(exports, module){
    
    }),

    /**
     * @type {EventListenerObject}
     */
    function(){
        this.a = function(){
            return "hello";
        }
    
        this.b = function(){
        
        }
        return this;
},
(function(){
    
})]),

function (){
    
}();