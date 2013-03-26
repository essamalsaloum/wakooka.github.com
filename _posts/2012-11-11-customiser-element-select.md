---
layout: blog_entry
title: Customiser un &eacute;l&eacute;ment &lt;select&gt;
published_date: 11 Novembre 2012
---

La problématique en question est d'avoir un `<select>` aux couleurs de la charte graphique du site, 
__tout en gardant l'élément accessible__ (touch events, navigation par clavier, souris, ...).

On ne modifiera pas la manière dont un élément `<select>`  se comporte. Il y a beaucoup trop d'appareils maintenant à prendre en compte, donc ne réinventons pas la roue et __laissons le navigateur et l'OS faire leur travail__. Par exemple, les smartphones ont une façon différentes d'afficher les options, d'un PC ou d'une tablette.

Juste quelques lignes de jQuery suffiront, à accomplir tout ça.

## TL;DR

[Essayer la démo](http://codepen.io/jeromesmadja/pen/uIpHm)

### HTML

On ajoute juste container et un `<span>` qui servira de placeholder pour le texte.

    <div class="select-wrapper">
        <span class="select-text"></span><!-- Placeholder that will update on the select change event -->
        <select>
                <option>France</option>
                <option>Australia</option>
                <option>Canada</option>
                <option>USA</option>
        </select>
    </div>

### jQuery

Ok, juste quelques lignes de jQuery pour mettre à jour le `<span>`.

    $(function() {

       // Get select elements
       var selects = $('.select-wrapper > select');
       if ( !selects.length ) return;

       // Add change event to selects, and trigger it on load, so the span is up to date
       selects.on('change', function() {
           
           var select = $(this),
               placeholder = select.prev('.select-text');

           if ( !placeholder.length ) return;

           // Get the text from the selected option
           var selected_text = select.children('option:selected').text();

           // Update the placeholder text
           placeholder.html(selected_text);

       }).change();

       // Workaround for Firefox that doesn't trigger the change event, 
       // if the user is using the keyboard to navigate through the options
       selects.on('keypress', function() {
           selects.trigger('change');
       });
   });

### CSS

La principale ligne à regarder ici est l'opacité. En gros, l'opacité du `<select>` est 0 ce qui le rend invisible pour l'utilisateur, mais restant au-dessus du `<span>`, le navigateur va alors déclencher le click event sur le `<select>`.

    .select-wrapper {   
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
         /* Replace the url with your own arrow image here */ 
        background: url('http://i50.tinypic.com/294gl55.png') no-repeat right center #e3e8f2;
        border: 1px solid #238db1;
        display: inline-block;
        font-family: Arial, Helvetica, sans-serif;
        height: 32px;
        min-width: 150px;
        padding-right: 35px;
        position: relative;
       
       /** If width is set you'll need overflow: hidden, otherwise it's optional **/
       overflow: hidden; 
       width: 200px;
        
    }   

    .select-text {
        border-right: 1px solid #ccc;
        color: #238db1;
        display: block;
        font-size: 14px;
        height: 32px;
        line-height: 32px;
        padding: 0 0 0 5px;
        width: 100%;
    }

    select { 
        /* Position the select over the span*/
        height: 32px;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;

        /*  The select is now positioned over the span
         *  We don't want to see the select, but we want to be able to click on it 
         *  So we set the opacity to 0  
         */
        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        -moz-opacity: 0;
        -khtml-opacity: 0;
        -webkit-opacity: 0;
        opacity: 0;
    }

Testé sous Windows 7 sur Chrome, Firefox, Safari, Interner Explorer 8+ (désolé pas de support pour IE7), et Safari pour iPad sous iOS 6.