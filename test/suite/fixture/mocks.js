const Mock = {
    hexadecimal: {
        init: `
            .class {
                color: #ffffff;
                background: #000000;
                border: 1px solid #ff44cc;
                background-color: #f1f2f2;
                color: #000;
            }
        `,
        expected: `
            .class {
                color: #fff;
                background: #000;
                border: 1px solid #f4c;
                background-color: #f1f2f2;
                color: #000;
            }
        `
    },
    unitWithZero: {
        init: `
            .class {
                padding: 2px 0px 3px 0;
                font-size: 0.9em;
                font-size: 0em;
                margin: 0em 0ex 10% 10px;
                height: 2in;
                width: 0%;
                line-height: 100cm;
                border: 0cm;
                margin-top: 0pc;
                margin-bottom: 0ch;
                margin-left: 0vh;
                margin-bottom: 0vw;
                transform: rotation(0deg);
                brackground-image: url(../../imag010.jpg);
                margin: calc(0px + 100%);
            }
        `,
        expected: `
            .class {
                padding: 2px 0 3px 0;
                font-size: 0.9em;
                font-size: 0;
                margin: 0 0 10% 10px;
                height: 2in;
                width: 0;
                line-height: 100cm;
                border: 0;
                margin-top: 0;
                margin-bottom: 0;
                margin-left: 0;
                margin-bottom: 0;
                transform: rotation(0);
                brackground-image: url(../../imag010.jpg);
                margin: calc(0 + 100%);
            }
        `
    },
    floatValue: {
        init: `
            .class {
                border: 1px solid rgba(73, 83, 88, 0.6);
                padding: 0.2px 0px 3px 0;
                font-size: 0.9em;
                font-size: 0.2em;
                margin: 0.04em 0ex 10% 10px;
                height: 2.0in;
                width: 0%;
                line-height: 100cm;
                border: 0cm;
                margin-top: 0pc;
                margin-bottom: 0ch;
                margin-left: 0.2vh;
                margin-bottom: 0vw;
                transform: rotation(0deg);
                brackground-image: url(../../imag010.jpg);
            }
        `,
        expected: `
            .class {
                border: 1px solid rgba(73, 83, 88, .6);
                padding: .2px 0px 3px 0;
                font-size: .9em;
                font-size: .2em;
                margin: .04em 0ex 10% 10px;
                height: 2.0in;
                width: 0%;
                line-height: 100cm;
                border: 0cm;
                margin-top: 0pc;
                margin-bottom: 0ch;
                margin-left: .2vh;
                margin-bottom: 0vw;
                transform: rotation(0deg);
                brackground-image: url(../../imag010.jpg);
            }
        `
    },
    whiteSpaces: {
        init: `
            .accordion [data-toggle='collapse']
            .my-form[disabled=true] .my-input {
                cursor: not-allowed;
            }
            body:not(.logged-in)     .greeting{}
            #firstnam   , 
            p,
            div p ,
            div       p,
            div     >  p,
            div    +    p,
            p   ~    ul ,
            [target=_blank] ,
            [title~=flower] ,
            [lang|=en],
            a[href^="https"] ,
            a[href$=" .pdf  "] ,
            a[href*="w3schools"],
            a:active, 
            p::after,
            p::before,
            input:checked,
            input:disabled,
            p:empty,
            input:enabled,
            p:first-child,
            p::first-letter,
            p::first-line,
            p:first-of-type,
            input:focus,
            a:hover,
            input:in-range,
            input:invalid,
            p:lang(it),
            p:last-child,
            p:last-of-type,
            a:link,
            :not(p),
            p:nth-child(2),
            p:nth-last-child(2),
            p:nth-last-of-type(2),
            p:nth-of-type(2),
            p:only-of-type,
            p:only-child,
            input:optional,
            input:out-of-range,
            input:read-only,
            input:read-write,
            input:required,
            :root,
            ::selection,
            #news:target     ,
            input:valid ,
            a:visited {
            height: 2px;
            width:    0.0129rem;
            margin: calc(0px + 100%);
            margin: calc(0px * 100%);
            margin: calc(0px / 100%);
            margin: calc(0px - 100%);
            margin: calc(0px % 100%);
            width: calc((100% / 3) - 20px);
            width: calc(20px + (100% / 3) - 20px);
            width: calc(20px * (100% / 3) / 20px);
            font-size: 2px   !important;
            padding: 2px 2px    2px;
            content: "";
            content: "     ";
            content: "a";
            content: "a   ";
            }
            #aptApp * {
                box-sizing: content-box;
                @import url("//fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900");
            }
            @media only screen and (min-width: 375px) {}
            @media (max-width: 600px) {}
            @media (min-width: 700px) and (orientation: landscape) {}
            @media tv and (min-width: 700px) and (orientation: landscape) {}
            @media (min-width: 700px), handheld and (orientation: landscape) {}
            @media not all and (monochrome) {}
            @media not (all and (monochrome)) {}
            @media not screen and (color), print and (color) {}
        `,
        expected: `
            .accordion [data-toggle='collapse']
            .my-form[disabled=true] .my-input{
            cursor:not-allowed;
            }
            body:not(.logged-in) .greeting{}
            #firstnam,
            p,
            div p,
            div p,
            div>p,
            div+p,
            p~ul,
            [target=_blank],
            [title~=flower],
            [lang|=en],
            a[href^="https"],
            a[href$=".pdf"],
            a[href*="w3schools"],
            a:active,
            p::after,
            p::before,
            input:checked,
            input:disabled,
            p:empty,
            input:enabled,
            p:first-child,
            p::first-letter,
            p::first-line,
            p:first-of-type,
            input:focus,
            a:hover,
            input:in-range,
            input:invalid,
            p:lang(it),
            p:last-child,
            p:last-of-type,
            a:link,
            :not(p),
            p:nth-child(2),
            p:nth-last-child(2),
            p:nth-last-of-type(2),
            p:nth-of-type(2),
            p:only-of-type,
            p:only-child,
            input:optional,
            input:out-of-range,
            input:read-only,
            input:read-write,
            input:required,
            :root,
            ::selection,
            #news:target,
            input:valid,
            a:visited{
            height:2px;
            width:0.0129rem;
            margin:calc(0px + 100%);
            margin:calc(0px * 100%);
            margin:calc(0px / 100%);
            margin:calc(0px - 100%);
            margin:calc(0px % 100%);
            width:calc((100% / 3) - 20px);
            width:calc(20px + (100% / 3) - 20px);
            width:calc(20px * (100% / 3) / 20px);
            font-size:2px!important;
            padding:2px 2px 2px;
            content: "";
            content: "";
            content: "a";
            content: "a   ";
            }
            #aptApp *{
                box-sizing:content-box;
                @import url("//fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900");
            }
            @media only screen and (min-width:375px){}
            @media(max-width:600px){}
            @media(min-width:700px) and (orientation:landscape){}
            @media tv and (min-width:700px) and (orientation:landscape){}
            @media(min-width:700px),handheld and (orientation:landscape){}
            @media not all and (monochrome){}
            @media not (all and (monochrome)){}
            @media not screen and (color),print and (color){}
        `
    },
    quotes: {
        init: `
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-image: url("../../../img.jpg")
            @import url("//fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900");
            a[href$=".pdf"]
            background-image: url('../../../img.jpg')
            @font-face{
                font-family:'pxgrotesk-regular';
                src:url('pxgrotesk-regular.eot');
                src:url('pxgrotesk-regular.eot?#iefix') format('embedded-opentype'), 
                url('pxgrotesk-regular.woff2') format('woff2'), 
                url('pxgrotesk-regular.woff') format('woff'), 
                url('pxgrotesk-regular.ttf') format('truetype'), 
                url('pxgrotesk-regular.svg#svgFontName') format('svg');
            }
        `,
        expected: `
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-image: url(../../../img.jpg)
            @import url(//fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900);
            a[href$=".pdf"]
            background-image: url(../../../img.jpg)
            @font-face{
                font-family:'pxgrotesk-regular';
                src:url(pxgrotesk-regular.eot);
                src:url(pxgrotesk-regular.eot?#iefix) format('embedded-opentype'), 
                url(pxgrotesk-regular.woff2) format('woff2'), 
                url(pxgrotesk-regular.woff) format('woff'), 
                url(pxgrotesk-regular.ttf) format('truetype'), 
                url(pxgrotesk-regular.svg#svgFontName) format('svg');
            }
        `
    },
    none: {
        init: `
            font-size-adjust: none;
            outline-style: none;
            list-style-type: none;
            display: none;
            border: none;
            text-decoration: none;
            clip-path: unset;
        `,
        expected: `
            font-size-adjust: 0;
            outline-style: none;
            list-style-type: none;
            display: none;
            border: 0;
            text-decoration: none;
            clip-path: unset;
        `,
    },
    minifiedCSS: "#element{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;outline:0;padding:0;margin:2px 0 0 0;margin:2px 0;letter-spacing:.046em;background-color:#fff;color:#495358;font-variant-ligatures:common-ligatures no-discretionary-ligatures no-historical-ligatures;border:1px solid rgba(73,83,88,.6);width:100%;-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2);margin:72px auto 0;-moz-transition:all .65s ease-in;height:calc(100% + 5px);background-image:url(bg-section10.jpg);background-image:url(bg-section10.jpg)}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.class{color:#fff;background:#000;border:1px solid #f4c;background-color:#f1f2f2;color:#000}.class{padding:2px 0 3px 0;font-size:.9em;font-size:0;margin:0 0 10% 10px;height:2in;width:0;line-height:100cm;border:0;margin-top:0;margin-bottom:0;margin-left:0;margin-bottom:0;transform:rotation(0);background-image:url(../../imag010.jpg)}body:not(.logged-in) .greeting{}#firstnam,p,div p,div p,div>p,div+p,p~ul,[target=_blank],[title~=flower],[lang|=en],a[href^=\"https\"],a[href$=\".pdf\"],a[href*=\"w3schools\"],a:active,p::after,p::before,input:checked,input:disabled,p:empty,input:enabled,p:first-child,p::first-letter,p::first-line,p:first-of-type,input:focus,a:hover,input:in-range,input:invalid,p:lang(it),p:last-child,p:last-of-type,a:link,:not(p),p:nth-child(2),p:nth-last-child(2),p:nth-last-of-type(2),p:nth-of-type(2),p:only-of-type,p:only-child,input:optional,input:out-of-range,input:read-only,input:read-write,input:required,:root,::selection,#news:target,input:valid,a:visited{height:2px;width:.0129rem;margin:calc(0 + 100%);font-size:2px!important;padding:2px 2px 2px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;background-image:url(../../../img.jpg);background-image:url(../../../img.jpg);font-size-adjust:0;outline-style:none;list-style-type:none;display:none;border:0;text-decoration:none;clip-path:unset}@font-face{font-family:'pxgrotesk-regular';src:url(pxgrotesk-regular.eot);src:url(pxgrotesk-regular.eot?#iefix)format('embedded-opentype'),url(pxgrotesk-regular.woff2)format('woff2'),url(pxgrotesk-regular.woff)format('woff'),url(pxgrotesk-regular.ttf)format('truetype'),url(pxgrotesk-regular.svg#svgFontName)format('svg')}#aptApp *{box-sizing:content-box}@import url(//fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900);@media only screen and (min-width:375px){}@media(max-width:600px){}@media(min-width:700px) and (orientation:landscape){}@media tv and (min-width:700px) and (orientation:landscape){}@media(min-width:700px),handheld and (orientation:landscape){}@media not all and (monochrome){}@media not (all and (monochrome)){}@media not screen and (color),print and (color){}"
};

module.exports = Mock;
