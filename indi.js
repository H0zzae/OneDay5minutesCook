class recipeDatail{
    constructor(responseData) {
        this.
    }
}
let likeClicked = false;
function like(){
    const url = location.href;
    const videoId= url.slice(url.indexOf('?')+1, url.length).split('=')[1];
    const saved = JSON.parse(sessionStorage.getItem("like"));
    console.log(saved);
    if (likeClicked){
        document.querySelector('#Heart').style.transition = 'background 1s';
        document.querySelector('#Heart').style.background = 'url("./Img/unclickedHeart.svg") no-repeat';
        document.querySelector('#Heart').style.backgroundSize = 'contain';
        document.querySelector('#Heart').style.outline = 'none';
        likeClicked = false;
        const session = saved ? JSON.stringify(saved.splice(-0, 1)) : JSON.stringify([])
        sessionStorage.setItem("like", session);
    }else{
        document.querySelector('#Heart').style.transition = 'background 1s';
        document.querySelector('#Heart').style.background = 'url("./Img/clickedHeart.svg") no-repeat';
        document.querySelector('#Heart').style.backgroundSize = 'contain';
        document.querySelector('#Heart').style.outline = 'none';
        likeClicked = true;
        const session = saved ? JSON.stringify(saved.concat(videoId)) : JSON.stringify([videoId])
        sessionStorage.setItem("like", session);
    }
}
async function main(){
    const url = location.href;
    // test
    // const url = 'https://haori.kmuwink.com/recipePage.html?videoId=v32NjYn5pSc';
    // console.log(url);
    const videoId= url.slice(url.indexOf('?')+1, url.length).split('=')[1];
    const fetchurl ='https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+videoId+'&key=AIzaSyAu4tqResCBND7Lc7QYc7SpxLyCX0N_2y4';
    const responseData = await (await fetch(fetchurl)).json();
    const thumbnails = responseData.items[0].snippet.thumbnails.maxres.url;
    document.querySelector('.image').src = thumbnails;
    const menuTitle = responseData.items[0].snippet.title;
    document.querySelector('.recipeName').innerHTML = menuTitle;
    document.querySelector('.youtube').href = "https://youtu.be/"+videoId.toString();

    const description = responseData.items[0].snippet.description;
    // console.log(description);
    let array = description.split('재료 ]');
    const metarial = array[1];
    let meterials = document.querySelector('.meterials');
    meterials.innerHTML = '재료 :'+metarial.split('[')[0];
    console.log(metarial);
    console.log(array);

    const recipeDetail = array[1].split(']')[1];
    console.log(recipeDetail);
    let rd = document.querySelector('.recipeDetail');
    let recipeArray = recipeDetail.split('다.');
    for (let i=0;i<recipeArray.length-1; i++){
        if (recipeArray[i].includes('Tip')){
            if (recipeArray[i].includes('Tip. ')){
                document.querySelector('.tip p').innerHTML +='* '+recipeArray[i].split('Tip. ')[1]+'다.'+'<br>';
            }
            else if(recipeArray[i].includes('Tip: ')){
                document.querySelector('.tip p').innerHTML +='* '+recipeArray[i].split('Tip: ')[1]+'다.'+'<br>';
            }
        }
        else{
            rd.innerHTML+= recipeArray[i]+'다.'+'<br>';
        }
    }
}
main();