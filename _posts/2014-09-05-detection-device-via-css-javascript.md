---
layout: post
title: D&eacute;tecter la taille du device en JS via CSS
published_date: 05 Septembre 2014
published: true
---
<section class="MainText">
<p>Avez-vous déjà eu le cas d’un script qui doit s’exécuter de manière différente selon la taille de l’écran ? Comment ne pas dupliquer les tailles des media-queries dans le fichier javascript ?</p>

<p>Des réponses sont apportées avec cette technique, issue de cet article <a href="http://davidwalsh.name/device-state-detection-css-media-queries-javascript" class="Link">Device State Detection with CSS Media Queries and JavaScript</a>.</p>

<p>Ce que j’aime ici c’est surtout utiliser le fichier css, où les media queries sont déjà insérées, comme d’un fichier de config pour le javascript.</p>

<p>J’ai déjà vu dans certains projets, l’utilisation de <a href="http://modernizr.com/" class="Link">modernizr</a> pour exécuter une partie de code seulement lorsque la taille de l’écran correspond à la media query, comme ceci : <code class="Code">Modernizr.mq('only all and (max-width: 400px)')</code></p>

<p><strong>Je ne trouve pas ça terrible, car nous devons dupliquer nos media queries dans fichier CSS, et le fichier javascript</strong>. Beaucoup plus difficile à maintenir.</p>

<h2 id="media-queries">Media queries</h2>
<p>Pour chaque media queries du site on rajoute une classe <code class="Code">.state-indicator</code></p>
</section>
<section class="CodeContainer">
<pre class="language-css"><code>/* default state */
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
</section>
<section class="MainText">
<p>Avec ça on définit un état de notre élément <code class="Code">.state-indicator</code> pour chacune de nos media queries. Cet élément sera positionner <em>off-screen</em>, pour qu’il n’interfère pas avec les autres éléments du site. Maintenant que nous avons défini cette classe <code class="Code">.state-indicator</code>, il va falloir insérer l’élément dans le DOM.</p>

<h2 id="javascript">Javascript</h2>
</section>
<section class="CodeContainer">

<pre class="language-javascript"><code class="javascript">// On crée l'élément et on l'insère
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
</section>
<section class="MainText">
<p>Ainsi, on peut simplement faire</p>
<code class="Code">if( getDeviceState() == 'tablet') { // Code executé pour les tablettes uniquement }</code>

<p>Avec ça, <strong>pas de calcul de taille en js</strong>, on laisse le navigateur gérer ça pour nous, et on récupère la chaine de caractère qui nous indique l’<em>état</em> du <em>device</em>. 
D’accord, mais si l’utilisateur redimensionne la fenêtre ? Alors il suffit de mettre notre fonction dans un <code class="Code">resize</code> event. Ce qui suit utilise, une fonction <a href="http://davidwalsh.name/function-debounce">debounce</a> pour performance et aussi une petite <a href="http://davidwalsh.name/pubsub-javascript">pub/sub</a> librairie.</p>
</section>
<section class="CodeContainer">
<pre class="language-javascript"><code>(function() {
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
</section>
<section class="MainText">
<p>Voilà, une façon assez claire et propre de savoir à n’importe quel moment en quel est l’état du <em>device</em>. Pratique également, si selon la taille de l’écran on doit déclencher tel ou tel script. On peut aussi aller plus loin, en ajoutant d’autres états, comme le mode <em>portrait</em> ou <em>paysage</em> ou encore la détection de retina. Le javascript ne s’occupe à <strong>aucun moment de la détection</strong> (comme le fait modernizr), il laisse faire le CSS, et récupère le CSS <em>computed</em> par le navigateur. Les media queries sont alors gérés à un seul endroit, mais aussi accessible depuis le javascript, c’est là le vrai bonus de cette technique.</p>
</section>