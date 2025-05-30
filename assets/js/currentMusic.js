const currentPlaying = document.getElementById("music-cur");
async function getCurrentMusic(){
    const res = await fetch("https://portfolio-backend-jt4c.onrender.com/api/spotify/now-playing");
    if(res.status === 204){
        const fallback = await fetch("https://portfolio-backend-jt4c.onrender.com/api/spotify/last-activity");
        if(fallback.status === 200){
            const data = await fallback.json();
            currentPlaying.innerHTML = `Last active on spotify: ${data.lastPlayed}`;
        }
        else{
        currentPlaying.innerHTML = "Currently Listening to: The sound of silence...";
    }
        return;
    }
    const data = await res.json();
    currentPlaying.innerHTML = `Currently Listening to: ${data.song}`;
    
}
getCurrentMusic();
setInterval(getCurrentMusic, 30000); // Update every 30 seconds