var pattern = [];
var level = 1;
var userPattern = [];
var n;
var animating = false;

$(".start").click(function () {
    $(".start").hide();
    startLevel();
});

function startLevel() {
    animating = true;
    $("p").text("Level " + level);
    n = String(Math.floor(Math.random() * 4));
    userPattern = [];
    pattern.push(n);
    pattern.forEach((element, index) => {
        setTimeout(() => {
            var temp = "#" + element;
            $(temp).addClass("animate");
            setTimeout(() => {
                $(temp).removeClass("animate");
                if (index === pattern.length - 1) {
                    animating = false;
                }
            }, 300);
        }, index * 600);
    });
}
$(".block").click(function () {
    if (animating) return;
    if (userPattern.length < pattern.length) {
        var temp = "#" + this.id;
        $(temp).addClass("animate");
        setTimeout(() => {
            $(temp).removeClass("animate");
        }, 200);
        userPattern.push(this.id);
    }
    if (userPattern.length === pattern.length) {
        if (checkPattern()) {
            level++;
            setTimeout(startLevel, 500);
        }
        else {
            $("p").text("Game Over! You reached till level " + level);
            resetGame();
        }
    }
});

function checkPattern() {
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] !== userPattern[i]) {
            return false;
        }
    }
    return true;
}

function resetGame() {
    userPattern = [];
    pattern = [];
    level = 1;
    $(".start").show();
}