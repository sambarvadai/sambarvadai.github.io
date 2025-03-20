var isDarkMode = localStorage.getItem("darkMode")==="true"? true: false;

window.onload = function(){
    var mybtn = document.getElementById("toggle-txt");
    function toggleDarkMode() {
        if(isDarkMode)
        {
            //Change to light mode:

            mybtn.innerHTML = "Light Mode";
            document.documentElement.style.backgroundColor = "#192929";
            document.body.style.color = "#F7F7F7"
            document.documentElement.style.setProperty("--underline-default","#F7F7F7");
        }
        else
        {   
            //change to dark mode:
            mybtn.innerHTML = "Dark Mode";
            document.documentElement.style.backgroundColor="#F7F7F7";
            document.body.style.color = "#192929";
            document.documentElement.style.setProperty("--underline-default","#192929");
            
        }
    }
    function applyDarkMode(){
        isDarkMode = !isDarkMode;
        localStorage.setItem("darkMode",isDarkMode.toString());
        toggleDarkMode();
    }
    mybtn.addEventListener("click", applyDarkMode);
    toggleDarkMode();
};
