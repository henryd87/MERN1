/*--------------- Good example of promise */
let p = new Promise((resolve,reject) =>{
    let a = 1+1;
    if (a==2){
        resolve("Success");
    } else {
        reject("Failed");
    }
})
p.then((message)=>{
    console.log('this is in the then '+message);
}).catch((message)=>{
    console.log('this is in the catch '+message);
})
/*---------Another example without promises----*/
let userLeft = false;
let userWatchingCatMeme=true;

function watchTutorial(callBack,errorCall){
    if(userLeft){
        errorCall({
            name:"Your cat",
            place:"Pizza Hut",
        })
    } else if (userWatchingCatMeme){
        errorCall({
            name:"My map",
            place:"MDonalds",
        })
    }else{
        callBack('QUEEEN');
    }
}
/*The watch Tutorial basically has 2 calls, one for error and one for good things.
If everything goes well, the true message will type out success.*/
watchTutorial(
    (message)=>{
        console.log("this was a success" + message);
    },
    (error)=>{
        console.log("This was a failure" + error.name + error.place);
    }


)

/**** same example but with promises */
function watchTutorialPromise(){
    return new Promise((resolve,reject)=>{
        if(userLeft){
            reject({
                name:"Your cat",
                place:"Pizza Hut",
            })
        } else if (userWatchingCatMeme){
            reject({
                name:"My map",
                place:"MDonalds",
            })
        }else{
            resolve('QUEEEN');
        }
    })
    
}
watchTutorialPromise().then(
    (message)=>{
        console.log("this was a success" + message);
    })
    .catch(
    (error)=>{
        console.log("This was a failure" + error.name + error.place);
    })


/*----------------*/



