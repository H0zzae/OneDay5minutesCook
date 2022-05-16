let url, videoId, responseData, recipeInfo;
window.onload = async function (){
    url = location.href;
    videoId = url.slice(url.indexOf('?')+1, url.length).split('=')[1];
    const fetchurl ='https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+videoId+'&key=AIzaSyAu4tqResCBND7Lc7QYc7SpxLyCX0N_2y4';
    responseData = await (await fetch(fetchurl)).json();
    recipeInfo = new recipeDetail(responseData.items[0], videoId);
    recipeInfo.fillHTML();
}
class recipeDetail{
    constructor(responseData, videoId) {
        this.videoId = videoId
        this.thumbnail = responseData.snippet.thumbnails.maxres.url;
        this.menuTitle = responseData.snippet.title;
        this.description = responseData.snippet.description;
        this.metarial = this.description.split('재료 ]')[1].split('[')[0];
        this.detail = this.description.split('재료 ]')[1].split(']')[1];
        this.like = false;
    }
    fillHTML() {
        document.querySelector('.image').src = this.thumbnail;
        document.querySelector('.recipeName').innerHTML = this.menuTitle;
        document.querySelector('.youtube').href = "https://youtu.be/"+this.videoId;
        document.querySelector('.meterials').innerHTML = '재료 :'+this.metarial.split('[')[0];
        let rd = document.querySelector('.recipeDetail');
        let recipeArray = this.detail.split('다.');
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
    likeClicked () {
        const saved = JSON.parse(sessionStorage.getItem("like"));
        if (this.like){
            document.querySelector('#Heart').style.transition = 'background 1s';
            document.querySelector('#Heart').style.background = 'url("./Img/unclickedHeart.svg") no-repeat';
            document.querySelector('#Heart').style.backgroundSize = 'contain';
            document.querySelector('#Heart').style.outline = 'none';
            this.like = !this.like;
            const session = saved ? JSON.stringify(saved.splice(-0, 1)) : JSON.stringify([])
            sessionStorage.setItem("like", session);
        }else{
            document.querySelector('#Heart').style.transition = 'background 1s';
            document.querySelector('#Heart').style.background = 'url("./Img/clickedHeart.svg") no-repeat';
            document.querySelector('#Heart').style.backgroundSize = 'contain';
            document.querySelector('#Heart').style.outline = 'none';
            this.like = !this.like;
            const session = saved ? JSON.stringify(saved.concat(videoId)) : JSON.stringify([videoId])
            sessionStorage.setItem("like", session);
        }
    }
}