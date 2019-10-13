var url = "https://www.googleapis.com/youtube/v3/search";
var apiKey = "AIzaSyBxiJKCFxR-vLxoR2j_zkDBxE_QYZVshfg";
var nxtToken, prevToken;
function main(){

    $("#go").on("click", function(e){
        e.preventDefault();
        var videoName = $("#search").val();
        $("#videos").html("");
        var word = $("#search").val();
        $.ajax({
            url: url,
            data : {
                key : apiKey,
                q : word,
                part: "id, snippet",
                maxResults : 10,
                type : "video",
            },
            dataType : "json",
            type : "GET",
            success : function(response){
                    loadData(response);
                    fixButton(response); 
            },
            error : function(err){
                console.log(err);
            }
        });
    });


    $("button").on("click", function(e){
        e.preventDefault();
        $("#videos").html("");
        var tk;
        var word = $("#search").val();
        if(e.target.id === "n"){
            tk = nxtToken;
        }else{
            tk = prevToken;
        }
        $.ajax({
            url : url,
            data : {
                key : apiKey,
                q : word,
                part: "id, snippet",
                maxResults : 10,
                type : "video",
                pageToken : tk,
            },
            dataType : "json",
            type : "GET",
            success : function(response){
                loadData(response);
                fixButton(response);
            },
            error : function(err){
                console.log(err);
            }
        });
    });
}

function loadData(response){
    console.log(response);
                    response.items.forEach((item)=>{
                    var element = $(`<li>
                                       <p>${item.snippet.title}</p>  
                                        <a target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}">
                                         <img src="${item.snippet.thumbnails.default.url}">
                                       </a> 
                                    </li>`);
                    $("#videos").append(element);
                });
}

function fixButton(response){
            if(response.nextPageToken){
                    $("#n").attr("class", "");
                    nxtToken = response.nextPageToken;
                }else{
                    $("#n").attr("class", "hide");
                    nxtToken = "";
                }

                if(response.prevPageToken){
                    $("#b").attr("class", "");
                    prevToken = response.prevPageToken;
                }else{
                    $("#b").attr("class", "hide");
                    prevToken = "";
                }
}

main();
