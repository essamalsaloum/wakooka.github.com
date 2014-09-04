---
layout: blog_entry
title: La d&eacute;tection de l'état du device via CSS accessible en JS
published_date: 05 <br> Sept <br> 2014
published: true
---

Avez-vous déjà eu le cas d'un script qui doit s'exécuter de manière différente selon la taille de l'écran ? Comment ne pas dupliquer les tailles des media-queries dans le fichier javascript ?

Des réponses sont apportées avec cette technique, issue de cet article [Device State Detection with CSS Media Queries and JavaScript](http://davidwalsh.name/device-state-detection-css-media-queries-javascript).

Ce que j'aime ici c'est surtout utilisé le fichier css, où les media queries sont déjà insérés, comme d'un fichier de config pour le javascript.

J'ai déjà <s>utilisé</s> vu dans certains projets, l'utilisation de [modernizr](http://modernizr.com/) pour exécuter une partie de code seulement lorsque la taille de l'écran correspond à la media query, comme ceci : <code>Modernizr.mq('only all and (max-width: 400px)')</code>

__Je ne trouve pas ça terrible, car nous devons dupliquer nos media queries dans fichier CSS, et le fichier javascript__. Beaucoup plus difficile à maintenir.

## Media queries
Pour chaque media queries du site on rajoute une classe `.state-indicator`
<pre><code>/* default state */
.state-indicator {
    position: absolute;
    top: -999em;
    left: -999em;
    z-index: 1;
}
.state-indicator:before { content: 'desktop'; }
/* small desktop */
@media all and (max-width: 1200px) {
    .state-indicator { z-index: 2; }
    .state-indicator:before { content: 'small-desktop'; }
}
/* tablet */
@media all and (max-width: 1024px) {
    .state-indicator { z-index: 3; }
    .state-indicator:before { content: 'tablet'; }
}
/* mobile phone */
@media all and (max-width: 768px) {
    .state-indicator { z-index: 4; }
    .state-indicator:before { content: 'mobile'; }
}
</code></pre>

Avec ça on définit un état de notre élément `.state-indicator` pour chacune de nos media queries. Cet élément sera positionner _off-screen_, pour qu'il n'interfère pas avec les autres éléments du site. Maintenant que nous avons défini cette classe `.state-indicator`, il va falloir insérer l'élément dans le DOM.

## Javascript
<pre><code classs="javascript">// On crée l'élément et on l'insère
var indicator = document.createElement('div');
indicator.className = 'state-indicator';
document.body.appendChild(indicator);

// Une methode pour retourner la chaine de caractère qui est définie dans `.state-indicator:before`
function getDeviceState() {
    return window.getComputedStyle( 
        document.querySelector('.state-indicator'), ':before'
    ).getPropertyValue('content');
}
</code></pre>

Ainsi, on peut simplement faire
<pre><code>if( getDeviceState() == 'tablet') { // Code executé pour les tablettes uniquement }
</code></pre>

Avec ça, __pas de calcul de taille en js__, on laisse le navigateur gérer ça pour nous, et on récupère la chaine de caractère qui nous indique l'_état_ du _device_. 
D'accord, mais si l'utilisateur redimensionne la fenêtre ? Alors il suffit de mettre notre fonction dans un `resize` event. Ce qui suit utilise, une fonction [debounce](http://davidwalsh.name/function-debounce) pour performance et aussi une petite [pub/sub](http://davidwalsh.name/pubsub-javascript) librairie.

<pre><code class="javascript">(function() {
var lastDeviceState = getDeviceState();
    window.addEventListener('resize', debounce(function() {
        var state = getDeviceState();
        if(state != lastDeviceState) {
            // Sauvegard du nouvel état
            lastDeviceState = state;

            // Publie le changement d'état, on pourrait aussi utiliser un évènement custom
            publish('/device-state/change', state);
        }
    }, 20));
})();
// Usage
subscribe('/device-state/change', function(state) {
    if(state == 'tablet') { 
        // Rentrera ici si la fenêtre est redimensionné, et que la taille correspond à une tabllette
    }
});
</code></pre>

Voilà, une façon assez claire et propre de savoir à n'importe quel moment en quel est l'état du _device_. Pratique également, si selon la taille de l'écran on doit déclencher tel ou tel script. On peut aussi aller plus loin, en ajoutant d'autres états, comme le mode _portrait_ ou _paysage_ ou encore la détection de retina. Le javascript ne s'occupe à __aucun moment de la détection__ (comme le fait modernizr), il laisse faire le CSS, et récupère le CSS _computed_ par le navigateur. Les media queries sont alors gérés à un seul endroit, mais aussi accessible depuis le javascript, c'est là le vrai bonus de cette technique.