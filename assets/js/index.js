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
            document.documentElement.style.backgroundColor="#faf8f5";
            document.body.style.color = "#1a1a1a";
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
//Typing effect
const element = document.getElementById('hero-line1');
const rawHTML = element.innerHTML.trim();
element.innerHTML = ''; // clear it to start

let typeSpeed = 50;
let resetDelay = 2500;

function typeHTML(el, html, i = 0) {
    let tag = false;
    let text = '';
    function type() {
        let char = html[i++];
        if (char === '<') {
            tag = true;
        }
        text += char;
        if (char === '>') {
            tag = false;
        }

        el.innerHTML = text;
        if (i < html.length) {
            setTimeout(type, tag ? 0 : typeSpeed);
        } else {
            // Finished typing — reset after delay
            setTimeout(() => {
                el.innerHTML = '';
                typeHTML(el, html); // restart animation
            }, resetDelay);
        }
    }

    type();
}
typeHTML(element, rawHTML);
