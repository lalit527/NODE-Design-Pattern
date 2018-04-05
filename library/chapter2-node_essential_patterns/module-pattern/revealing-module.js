const custModule = (() => {
    const privateFoo = () => {console.log("1")}; 
    const privateBar = [];
    const exported = { 
        publicFoo: () => {console.log("2")}, 
        publicBar: () => {console.log("3")} 
    };
    
    return exported; 
})(); 
console.log(custModule);

/**
 * Gives Error Module already defined, as module is used by node to wrap files
    const module = (() => {
        const privateFoo = () => {console.log("1")}; 
        const privateBar = [];
        const exported = { 
            publicFoo: () => {console.log("2")}, 
            publicBar: () => {console.log("3")} 
        };
        
        return exported; 
    })(); 
    console.log(module);
 */