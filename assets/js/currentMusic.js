const currentPlaying = document.getElementById("music-cur");
async function getCurrentMusic(){
    const res = await fetch("https://portfolio-backend-jt4c.onrender.com/api/spotify/now-playing");
    const data = await res.json();
    if(res.status === 204){
        currentPlaying.innerHTML = "Currently Listening to: The sound of silence...";
        return;
    }
    else
    {
        currentPlaying.innerHTML = `Currently Listening to: ${data.song}`;
    }
}
getCurrentMusic();
setInterval(getCurrentMusic, 1000); // Update every 30 seconds