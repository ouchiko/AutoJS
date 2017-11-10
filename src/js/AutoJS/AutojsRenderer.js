class AutojsRenderer
{
    constructor(props, debug) {
        this._props = props;
        this._debug = debug;

        this.events();
    }

    rundebugger()
    {
        // Debugging here.
    }

    events()
    {
        let elements = document.querySelectorAll("*[data-action]");
        console.dir(elements);
        if (elements && elements.length>0) {
            for (let i=0; i<elements.length; i++) {
                console.log("events");
                elements[i].addEventListener("click", function(){

                    let target = this.getAttribute("data-action");
                    let action = document.querySelector("*[data-id='"+target+"']");

                    // Assumes input, need to make this better.
                    let v = action.value; // YUK
                    let dataPointer = action.getAttribute("data-pointer");

                    window.autojs.data(dataPointer, v, "write");

                    console.log("changin name: " +target+" / " + dataPointer + " to " + v);

                    //data-id="change.name.input" data-target="login.name" data-pointer="login.name"
                });
            }
        }
    }

    data(id, data, mode)
    {
        switch (mode) {
            case "append":
                    if (typeof(data)=="object") {
                        window.props[id].push(data);
                    } else {
                        window.props[id] += data;
                    }
                break;
            case "write":
                    if (typeof(data)=="object") {
                        window.props[id] = data;
                    } else {
                        window.props[id] = data;
                    }

                break;
            case "null":
                    window.props[id] = null;
                break;
        }
        this.render();
    }

    render(initialRenderRequest=false, dataId=false)
    {
        let selector = (dataId) ? `[data-id='${dataId}']` : `[data-id]`;
        let elements = document.querySelectorAll(selector);
        if (elements && elements.length>0) {
            for (let i=0; i<elements.length; i++) {
                /* Obtain Relevant Elements we want to mess with */
                let elementName = elements[i].tagName;
                let dataState = elements[i].getAttribute("data-state");
                let dataId = elements[i].getAttribute("data-id");
                let dataPointer = elements[i].getAttribute("data-pointer");
                let dataTarget = elements[i].getAttribute("data-target");
                /* Should we proceed with this item? */
                let runRenderer = (dataState=="update" || dataState =="update-with-key" || initialRenderRequest);
                let runLoopProcess = (elementName == "LOOP");
                let hasPropData = (props[dataPointer]);
                /* Parse if we need to */
                if (runRenderer && hasPropData) {
                    if (runLoopProcess) {
                        let keyStart = 0;
                        if (dataState =="update-with-key") {
                            let targetNode = document.querySelector("*[data-id="+dataTarget+"]");
                            if (targetNode.children.length>0) {
                                console.log(targetNode.children.length);
                                if (targetNode.children.length>0) {
                                    keyStart = targetNode.children.length;
                                } else {
                                    keyStart = 0;
                                }
                            }
                        }
                        let block = elements[i].innerHTML;
                        let populate = "";
                        if (props[dataPointer].length>=keyStart) {
                            for  (let k=keyStart;k<props[dataPointer].length;k++) {
                                let block_copy = String(block);
                                for (let h in props[dataPointer][k]) {
                                    //console.log("Replacing {"+h+"} with " + props[dataPointer][k][h])
                                    block_copy = block_copy.replace("{"+h+"}", props[dataPointer][k][h]);
                                }
                                block_copy = block_copy.replace("{key}", k);
                                populate += block_copy;
                            }
                            let target = document.querySelector("*[data-id='"+dataTarget+"'");

                            if (dataState =="update-with-key") {
                                let tmp = (target.innerHTML!='undefined')?target.innerHTML:"";
                                target.innerHTML = tmp+""+populate;
                            } else {
                                target.innerHTML = populate;
                            }
                        }
                    } else {
                        if(props[dataPointer]){
                            elements[i].innerHTML = props[dataPointer];
                        }
                    }
                }
            }
        }
    }
}

export default AutojsRenderer;
