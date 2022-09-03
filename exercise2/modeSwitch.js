let isDark = false;
function switchModes(){
    console.log(isDark);
    if(isDark === true){
        document.documentElement.style.setProperty("--col-01", "#000000");
        document.documentElement.style.setProperty("--col-02", "#ffffff");
        /*change the family font when click the switch mode button*/
        document.documentElement.style.setProperty("font-family","Times New Roman");
        document.getElementById("modeButton").innerHTML = "Dark Mode";
        isDark = false;
} else{
        document.documentElement.style.setProperty("--col-01", "#ffffff");
        document.documentElement.style.setProperty("--col-02", "#000000");
        /*change the family font when click the switch mode button*/
        document.documentElement.style.setProperty("font-family","terminal-grotesque");
        document.getElementById("modeButton").innerHTML = "Light Mode";
        isDark = true;
}
}

