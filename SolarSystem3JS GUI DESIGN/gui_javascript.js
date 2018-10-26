var toggleMenu = true;
var slideFakeValue = 50;
$(function () {

    butonClickAnim();
    resimAyarla();
    var wMtitle = $(".settingMenuContainer .menuTitle").css("height");
    $(".settingMenuContainer .menuTitle").css("line-height", wMtitle);

    $(".rotate.brdr.menuTitle").click(function () {
        butonAnimasyon();
    });
    butonEvent();

});

var option;
window.onresize = function (event) {
    var wMtitle = $(".settingMenuContainer .rotate.menuTitle").css("height");
    $(".settingMenuContainer .menuTitle").css("line-height", wMtitle);
    resimAyarla();
    butonEvent();
};
function butonClickAnim() {
    $(".options").click(function () {
        if ($(this).hasClass("not-active")) return undefined;

        $(this).css("animation", "butonClickAnim 0.35s linear forwards");
        option = $(this);
        setTimeout(butonAnimSil, 350);
    });
}
function butonAnimSil() {
    option.css("animation", "");
}
function resimAyarla() {
    var genislik = innerWidth;
    var uzunluk = innerHeight;

    if (genislik < 400 || uzunluk < 300) {
        $(".imgSet").attr("src", "ico/setting16x16.ico");
        $(".imgNew").attr("src", "ico/gEkle16x16.ico");
        $(".imgLine").attr("src", "ico/line16x16.ico");
        $(".imgOrb").attr("src", "ico/circle16x16.ico");
        $(".imgInfo").attr("src", "ico/info16x16.ico");
        $(".imgUp").attr("src", "ico/arti16x16.ico");
        $(".imgDown").attr("src", "ico/eksi16x16.ico");
        $("p.parlatAnim").css("font-size", "0.25em");

    } else if (genislik < 825 || uzunluk < 450) {
        $(".imgSet").attr("src", "ico/setting32x32.ico");
        $(".imgNew").attr("src", "ico/gEkle32x32.ico");
        $(".imgLine").attr("src", "ico/line32x32.ico");
        $(".imgOrb").attr("src", "ico/circle32x32.ico");
        $(".imgInfo").attr("src", "ico/info32x32.ico");
        $(".imgUp").attr("src", "ico/arti32x32.ico");
        $(".imgDown").attr("src", "ico/eksi32x32.ico");
        $("p.parlatAnim").css("font-size", "0.5em");
    } else {
        $(".imgSet").attr("src", "ico/setting64x64.ico");
        $(".imgNew").attr("src", "ico/gEkle64x64.ico");
        $(".imgLine").attr("src", "ico/line64x64.ico");
        $(".imgOrb").attr("src", "ico/circle64x64.ico");
        $(".imgInfo").attr("src", "ico/info64x64.ico");
        $("p.parlatAnim").css("font-size", "0.75em");
    }
}
function butonAnimasyon() {
    if (toggleMenu) {
        for (let i = 1; i <= 5; i++) {
            $(".settingMenuContainer .option" + i).css("transition-delay", (i - 1) * 0.3 + "s");
            if ($(".settingMenuContainer .option" + i).hasClass("not-active")) {
                $(".settingMenuContainer .option" + i).css("opacity", "0.15");
            } else {
                $(".settingMenuContainer .option" + i).css("opacity", "1");
            }
        }
        $(".settingMenuContainer .options").css("transform", "rotateX(0deg)");
        toggleMenu = false;
    } else {
        for (let i = 5; i >= 1; i--) {
            $(".settingMenuContainer .option" + i).css("transition-delay", (5 - i) * 0.3 + "s");
        }
        $(".settingMenuContainer .options").css("transform", "rotateX(90deg)");

        $(".settingMenuContainer .options").css("opacity", "0");
        toggleMenu = true;
    }
}
function butonEvent() {
    var intervalId;
    if (innerWidth < 800 || innerHeight < 500) {
        $('.camZoomContainer .ustCizgi').on("touchstart", msliderVolumeUp);
        $('.camZoomContainer .altCizgi').on("touchstart", msliderVolumeDown);

        $('.camZoomContainer .ustCizgi').on("touchmove", msliderVolumeUp);
        $('.camZoomContainer .altCizgi').on("touchmove", msliderVolumeDown);

        $('.camZoomContainer .ustCizgi').on("touchend", slideShadowOFF);
        $('.camZoomContainer .altCizgi').on("touchend", slideShadowOFF);
    } else {

        $('.camZoomContainer .ustCizgi').mousedown(function () {
            sliderVolumeUp();
            intervalId = setInterval(sliderVolumeUp, 250);
        }).mouseup(function () {
            clearInterval(intervalId);
            slideShadowOFF();
        }).mouseleave(function () {
            clearInterval(intervalId);
            slideShadowOFF();
        });
        $(".camZoomContainer .altCizgi").mousedown(function () {
            intervalId = setInterval(sliderVolumeDown, 250);
        }).mouseup(function () {
            clearInterval(intervalId);
            slideShadowOFF();
        }).mouseleave(function () {
            clearInterval(intervalId);
            slideShadowOFF();
        });

        $('.camZoomContainer .ustCizgi').on("touchstart", undefined);
        $('.camZoomContainer .altCizgi').on("touchstart", undefined);

        $('.camZoomContainer .ustCizgi').on("touchmove", undefined);
        $('.camZoomContainer .altCizgi').on("touchmove", undefined);

        $('.camZoomContainer .ustCizgi').on("touchend", undefined);
        $('.camZoomContainer .altCizgi').on("touchend", undefined);
    }
}

function sliderVolumeUp(event) {
    if (slideFakeValue <= 20) return undefined;
    slideFakeValue -= 5;
    $(".camZoomContainer .ortaCizgi .slideNokta").css('top', slideFakeValue + "%");
    $(".camZoomContainer .ortaCizgi").css("box-shadow", "0 0 5px white");
    $(".camZoomContainer .ustCizgi").css("box-shadow", "0 0 5px white");
}
function sliderVolumeDown() {
    if (slideFakeValue >= 80) return undefined;
    slideFakeValue += 5;
    $(".camZoomContainer .ortaCizgi .slideNokta").css('top', slideFakeValue + "%");
    $(".camZoomContainer .ortaCizgi").css("box-shadow", "0 0 5px white");
    $(".camZoomContainer .altCizgi").css("box-shadow", "0 0 5px white");
}
function msliderVolumeUp(event) {
    if (slideFakeValue <= 20) return undefined;
    slideFakeValue -= 1;
    $(".camZoomContainer .ortaCizgi .slideNokta").css('top', slideFakeValue + "%");
    $(".camZoomContainer .ortaCizgi").css("box-shadow", "0 0 5px white");
    $(".camZoomContainer .ustCizgi").css("box-shadow", "0 0 5px white");
}
function msliderVolumeDown() {
    if (slideFakeValue >= 80) return undefined;
    slideFakeValue += 1;
    $(".camZoomContainer .ortaCizgi .slideNokta").css('top', slideFakeValue + "%");
    $(".camZoomContainer .ortaCizgi").css("box-shadow", "0 0 5px white");
    $(".camZoomContainer .altCizgi").css("box-shadow", "0 0 5px white");
}
function slideShadowOFF() {
    $(".camZoomContainer .ortaCizgi").css("box-shadow", "");
    $(".camZoomContainer .altCizgi").css("box-shadow", "");
    $(".camZoomContainer .ustCizgi").css("box-shadow", "");
}