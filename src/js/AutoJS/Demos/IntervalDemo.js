class IntervalDemo
{
    constructor()
    {
        props['example.interval.counter'] = 0;
        var testInterval = setInterval(function(){
            props['example.interval.counter']++;
            console.log("Example with interval..");
            window.autojs.render(false,'my-counter');
            if (props['example.interval.counter']==10) {
                clearInterval(testInterval);
            }
        },1000);
    }
}

export default IntervalDemo;
