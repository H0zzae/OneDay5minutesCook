class YoutubeRecipe { //유뷰트에서 데이터를 불러올 구조
    constructor() {
        this.prevNum = 20;
        this.resultNum = 20;
        this.url = 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PLoABXt5mipg6mIdGKBuJlv5tmQFAQ3OYr&part=snippet';
        this.key = 'AIzaSyAu4tqResCBND7Lc7QYc7SpxLyCX0N_2y4';
    }
    increaseNum(){ //레시피 더 불러오기시 사용
        if (this.prevNum!==this.resultNum) {
            this.prevNum+=10;
        }
        this.resultNum += 10;
    }
    async getInfo(){ //youtube api를 호출해 원하는 resultNum만큼 정보 요청
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
class RecipeList { //recipe각각의 class
    constructor(videoUrl, title, videoId, thumbsnail) {
        this.videoUrl = videoUrl;
        this.title = title;
        this.videoId = videoId
        this.thumbsnail = thumbsnail
    }
    AddRecipeList() { //html에 불러온 레시피 리스트 추가
        document.querySelector('#recipeList').innerHTML += '<div class="recipe" onClick="window.location='+"'"+this.videoUrl+"'"+'"/><h1 class="menu">'+this.title+'</h1></div>';
    }
    Addexample() { //html에 불러온 영상의 example 추가
        document.querySelector('.exampleImage').innerHTML +='<a href='+'https://youtu.be/'+this.videoId+'>'+'<img src='+this.thumbsnail+'></a>';
    }
}

const youtubeRecipe = new YoutubeRecipe() //youtubeRecipe 객체 생성

function loadMore(){ //레시피 더보기 클릭시 실행되는 함수
    if (youtubeRecipe.resultNum < 50) { //youtube-api에서 제공하는 최대 정보 갯수가 50이므로, 50이상 요청시 사용자에게 알림
        youtubeRecipe.increaseNum();
        readContents();
    }else {
        alert("불러올 수 있는 레시피의 최대 갯수입니다.");
    }
}
async function readContents() { //레시피 더보기 클릭시, youtuberecipe에 getInfo를 통해 바뀐 maxResult값만큼 정보를 더 불러옴
    const responseData = await youtubeRecipe.getInfo();
    responseData.map((item) => {
        const videoUrl = './recipePage.html?videoId='+item.snippet.resourceId.videoId;
        let recipe = new RecipeList(videoUrl, item.snippet.title, item.snippet.resourceId.videoId, item.snippet.thumbnails.high.url)
        recipe.Addexample();
        recipe.AddRecipeList();
    })
}

window.onload = function(){ //페이지 첫 로드시 실행
    readContents(); //처음 데이터 불러옴
    let imgList = document.querySelector(".exampleImage");
    //일정 크기의 화면 이하시, 아래 example 이미지가 슬라이드 형식으로 애니메이션 실행되게끔 구현
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
function SlideShow(imgList, imgCnt) { //슬라이드 함수
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