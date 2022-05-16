class Saved {
    constructor(savedList) {
        this.saveList = savedList;
        this.section = document.getElementById('recipeList');
    }
    printSaved(){
        this.saveList.map(async (id) => {
            const fetchurl ='https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+id+'&key=AIzaSyAu4tqResCBND7Lc7QYc7SpxLyCX0N_2y4';
            let responseData = await (await fetch(fetchurl)).json();
            let recipeInfo = responseData.items[0].snippet
            let link = location.href.replace("like.html", '')+"/recipePage.html?videoId="+id;
            this.section.innerHTML +='<div class="recipe" onClick ="window.open('+"'"+link+"')"+'"/><h1 class="menu">'+recipeInfo.title+'</h1></div>'
        })
    }
}
window.onload = ()=>{
    const session = JSON.parse(sessionStorage.getItem("like"));
    const liked = new Saved(session);
    if (session){
        liked.printSaved();
    }
    else {
        liked.section.innerHTML += '<p>저장한 레시피가 없습니다.</p>'
    }
}