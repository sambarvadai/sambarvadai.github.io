const locationElement = document.getElementById("cur-loc").innerHTML.split("Current Location: ")[1].trim();
const curTime = document.getElementById("cur-time");
async function getLocation(city){
    const res = await fetch(`https://portfolio-backend-jt4c.onrender.com/api/geocode?q=${encodeURIComponent(city)}`);
    const data = await res.json();
    const {lat,lng} = data?.results?.[0]?.geometry;
    return {lat,lng};
}
async function getTime(lat,lng){
    const res = await fetch(`https://portfolio-backend-jt4c.onrender.com/api/timezone?lat=${lat}&lng=${lng}`);
    const data = await res.json();
    const serverTime = data.formatted;
    let current = new Date(serverTime);
    setInterval(() =>{
        current.setSeconds(current.getSeconds() + 1);
        const timeStr = current.toLocaleTimeString("en-US",{
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        curTime.innerHTML = `Time at location: ${timeStr}`;
    },1000);
}
function setupTime()
{
    getLocation(locationElement).then(coords=>{
        if(coords){
            getTime(coords.lat,coords.lng);
        }
    });
}
setupTime();
