class Saved {  // 저장된 레시피를 담을 class
    constructor() {
        this.saveList = [];
        this.section = document.getElementById('recipeList');
    }
    publishSaved(){ //저장된 레시피를 html에 출력
        console.log(this.saveList)
        if (this.saveList) {
            this.saveList.map(async (id) => {
                const fetchurl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + id + '&key=AIzaSyAu4tqResCBND7Lc7QYc7SpxLyCX0N_2y4';
                let responseData = await (await fetch(fetchurl)).json();
                let recipeInfo = responseData.items[0].snippet
                let link = location.href.replace("like.html", '') + "/recipePage.html?videoId=" + id;
                this.section.innerHTML += '<div class="recipe" onClick ="window.open(' + "'" + link + "')" + '"/><h1 class="menu">' + recipeInfo.title + '</h1></div>'
            })
        }else {
            this.section.innerHTML += '<p>저장한 레시피가 없습니다.</p>'
        }
    }
    putSessionRecipeId(id){
        try {
            if (!this.sessionIncludeRecipeID(id[0])) {
                const session = JSON.stringify(this.saveList.concat(id))
                sessionStorage.setItem("like", session);
            }
            return true;
        }
        catch (e){
            console.log(e);
            return false;
        }
    }
    removeSessionRecipeId(id){
        try {
            const session = this.saveList.remove(id)
            sessionStorage.setItem("like", session);
            return true;
        }
        catch (e){
            console.log(e);
            return false
        }
    }
    sessionIncludeRecipeID(id){
        return this.saveList.includes(id)
    }
    getSessionStorage(){
        const session = JSON.parse(sessionStorage.getItem("like"));
        this.saveList = session
        this.putSessionRecipeId(session)
    }
}
window.onload = ()=>{ //페이지 로드시 실행
    const liked = new Saved();
    liked.getSessionStorage()
    liked.publishSaved();
}