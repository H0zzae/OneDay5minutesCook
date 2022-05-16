
class YoutubeRecipe {
    constructor() {
        this.prevNum = 20;
        this.resultNum = 20;
        this.url = 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PLoABXt5mipg6mIdGKBuJlv5tmQFAQ3OYr&part=snippet';
        this.key = 'AIzaSyAu4tqResCBND7Lc7QYc7SpxLyCX0N_2y4';
    }
    increaseNum(){
        if (this.prevNum!==this.resultNum) {
            this.prevNum+=10;
        }
        this.resultNum += 10;
    }
    async getInfo(){
        let requestURL = this.url+'&maxResults='+this.resultNum.toString()+'&key='+this.key
        let responseData = await (await fetch(requestURL)).json();
        if (this.prevNum!==this.resultNum) {
            responseData.items.splice(0,this.prevNum)
            return responseData.items;
        }else {
            return responseData.items;
        }
    }
}
class RecipeList {
    constructor(videoUrl, title, videoId, thumbsnail) {
        this.videoUrl = videoUrl;
        this.title = title;
        this.videoId = videoId
        this.thumbsnail = thumbsnail
    }
    AddRecipeList() {
        document.querySelector('#recipeList').innerHTML += '<div class="recipe" onClick ="window.open('+"'"+this.videoUrl+"')"+'"/><h1 class="menu">'+this.title+'</h1></div>';
    }
    Addexample() {
        document.querySelector('.exampleImage').innerHTML +='<a href='+'https://youtu.be/'+this.videoId+'>'+'<img src='+this.thumbsnail+'></a>';
    }
}

function loadMore(){
    if (youtubeRecipe.resultNum < 50) {
        youtubeRecipe.increaseNum();
        readContents();
    }else {
        alert("불러올 수 있는 레시피의 최대 갯수입니다.");
    }
}
const youtubeRecipe = new YoutubeRecipe()
async function readContents() {
    const responseData = await youtubeRecipe.getInfo();
    responseData.map((item) => {
        const videoUrl = "https://h0zzae.github.io/OneDay5minutesCook/recipePage.html?videoId=" + item.snippet.resourceId.videoId;
        let recipe = new RecipeList(videoUrl, item.snippet.title, item.snippet.resourceId.videoId, item.snippet.thumbnails.high.url)
        recipe.Addexample();
        recipe.AddRecipeList();
    })
}

window.onload = function(){
    readContents();
    let imgList = document.querySelector(".exampleImage");
    if ((414 < document.body.clientWidth)) {
        window.onload = function () {
            let imgCnt = 0;
            imgList.querySelectorAll("img").forEach(() => {
                imgCnt++;
            });
            imgList.style.width = (imgList.offsetWidth * imgCnt) + "px";

            SlideShow(imgList, imgCnt);
        };
    }
}
function SlideShow(imgList, imgCnt) {
    imgList.style.left = "0px";
    let curIndex = 0;

    setInterval(()=>{
        imgList.style.transition = "transform 2s ease-out";
        imgList.style.transform = "translate3d(-" + 212*(curIndex+1)+"px, 0px, 0px";
        curIndex++;

        if(curIndex ===imgCnt-4) {
            curIndex =-1;
        }
    },3000);
}