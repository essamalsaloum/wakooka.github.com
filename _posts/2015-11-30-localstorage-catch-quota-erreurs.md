---
layout: post
title: Quota localStorage atteint, catching des erreurs
published_date: 30 Novembre 2015
published: true
---
<section class="MainText">
<p>Petite introduction très rapide, le <em>localStorage</em> (et <em>sessionStorage</em>) permettent de sauvegarder des données côté client.</p>
<p>Les cookies font la même chose donc ? Pas tout à fait, déjà le <em>localStorage</em> n'est pas envoyé dans les en-têtes des requêtes http contrairement aux cookies, de plus la taille limite de sauvegarde est bien plus élevée que celle des cookies.</p>
<p><strong>Tout ce qui est dit dans cet article à propos du <em>localStorage</em> est également vrai pour le <em>sessionStorage</em></strong>.</p>

<h2>Support des navigateurs</h2>
<p>Après une <a href="http://caniuse.com/#search=localstorage" class="Link">recherche rapide sur caniuse.com</a> on peut voir que <em>localStorage</em> est très bien supporté, remontant jusqu'à la version 8 d'Internet explorer.</p>
<p>Cependant, en regardant les <em>known issues</em>, on s'aperçoit que pas mal de choses pourraient ne pas fonctionner. De plus, opéra mini ne supporte simplement pas <em>localStorage</em>.</p>
<p>On peut retenir ici 2 informations importantes :</p>
<blockquote class="Blockquote">
  <p>In iOS 5 &amp; 6 localStorage data is stored in a location that may occasionally be cleared out by the OS.</p>
</blockquote>
<blockquote class="Blockquote">
  <p>In private browsing mode, Safari, iOS Safari and the Android browsers do not support setting sessionStorage or localStorage.</p>
</blockquote>
<p>Sur iOS5 &amp; 6, le <em>localStorage</em> peut être complètement vidé par l'OS, pas idéal si votre site/webapp fait un usage intensif du <em>localStorage</em>.</p>
<p>Le <em>localStorage</em> est en mode <em>read-only</em> en navigation privé sur les navigateurs Android, Safari, et iOS Safari. C'est pour cela qu'il faut tester l'accès au <em>localStorage</em> avant de l'utiliser, autrement des erreurs seront lancées.</p>
<h2>Les différents cas possibles</h2>


<h3>1er cas : Désactivation du <em>localStorage</em> par l'utilisateur</h3>
<p>Il faut prévoir le cas d'une désactivation par l'utilisateur. Si cela rend votre application complètement inutilisable il faut donc l'en informer.</p>
<p>Ici on pourrait penser à faire un check sur le type <em>localStorage</em>, par exemple : </p>
<pre class="language-javascript">
<code>typeof window.localStorage !== undefined</code>
</pre>
<p>Cela va malheuresement nous retourner la même erreur que lorsqu'on essaie d'accéder au <em>localStorage</em> via <code class="Code">.getItem()</code> ou <code class="Code">.setItem()</code>. C'est exactement ce qu'on essaie de résoudre.</p>
<p><code class="Code">try</code> et <code class="Code">catch</code> à la rescousse, pour être certain qu'on peut utiliser le <em>localStorage</em> de manière sure.</p>
</section>
<section class="CodeContainer">
    <pre class="language-javascript"><code>
(function() {
    var localStorage;
    try {
        localStorage = window.localStorage;
    } catch(e) {
        console.log(e)
        // Pas d'accès au localStorage
    }
})();
    </code></pre>
</section>
<section class="MainText">
<p>Il faut bien faire attention à <strong>ne pas être dans le scope global</strong> sinon on écraserait <code class="Code">window.localStorage</code>.</p>
<p>En cas d'erreur le <em>console.log</em> nous renvoie ceci :</p>
</section>
<section class="CodeContainer">
<pre class="language-javascript"><code>
[
SecurityError: "The operation is insecure."
code: 18
...]
</code></pre>
</section>
<section class="MainText">
<p>On va donc s'appuyer sur le code erreur qui est retourné, ici 18. </p>
</section>
<section class="CodeContainer">
<pre class="language-javascript"><code>
    (function() {
        var localStorage;
        try {
            localStorage = window.localStorage;
        } catch(e) {
            if ( e.code == 18 ) {
                // On informe l'utilisateur par exemple d'activer le localStorage
            }
        }
        if ( localStorage ) {
            // Ici on peut utiliser localStorage car on sait qu'il existe, 
            // qu'il est activé ou encore qu'il n'est pas plein
            localStorage.setItem('key','value');
        }
    })();
</code></pre>
</section>
<section class="MainText">
<p>Dans le <code class="Code">try</code> on essaie d'accéder à <code class="Code">window.localStorage</code> ce qui génère une erreur on va donc entrer dans le <code class="Code">catch</code>. Notre variable <code class="Code">localStorage</code> est <code class="Code">undefined</code> si <code class="Code">window.localStorage</code> génère une erreur. On fait ensuite notre check  à chaque fois que l'on s'apprête à utiliser le <em>localStorage</em> comme ceci :</p>

<h3>2ème cas : Le localStorage est plein</h3> 
<p>Lorsque le <em>localStorage</em> est plein, et que la fonction <code class="Code">setItem()</code> est appelée une erreur de ce type sera renvoyée. :</p>
<blockquote class="Blockquote">
    "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to add something to storage that exceeded the quota."
</blockquote>
<p>Comme on l'a cité dans l'introduction, cette erreur sera également présente si on est par exemple en mode privé sur Safari, Safari iOS ou encore le navigateur Android.</p>
<p>On va donc encore une fois utiliser un <code class="Code">try</code> <code class="Code">catch</code> et s'appuyer sur le code erreur retourné, ici : 22.</p>
</section>
<section class="CodeContainer">
<pre class="language-javascript">
<code>
    try {
      localStorage.setItem(key, value);
    } catch(e) {
      if (e.code == 22) {
        // localstorage est plein, on informe l'utilisateur
      }
    }
</code></pre>
</section>
<section class="MainText">
    <h2>Solution finale</h2>
    <p>On ajoute alors cette dernière vérification dans le code que l'on a écrit précédemment ce qui donnera ceci : </p>
</section>
<section class="CodeContainer">
<pre class="language-javascript"><code>
    (function() {
        var localStorage;
        try {
            // Ici on va tenter d'écrire dans le localStorage
            // pour être sur que le localStorage n'est pas en mode read-only 
            // ou plein
            window.localStorage.setItem('LocalStorageOK','1');
            window.localStorage.removeItem('LocalStorageOK');
            localStorage = window.localStorage;
        } catch(e) {
            if ( e.code == 18 ) {
                // On informe l'utilisateur par exemple d'activer le localStorage
            }
            if (e.code == 22) {
                // localStorage est plein ou bien l'utilisateur est en mode privé
                // sur Safari, Safari iOS, ou le navigateur Android 
            }
        }
        if ( localStorage ) {
            // Ici on peut utiliser localStorage car on sait qu'il existe, 
            // qu'il est activé ou encore qu'il n'est pas plein
            localStorage.setItem('key','value');
        }
    })();
</code></pre>
</section>
<section class="MainText">
    <p>Une fois le <code class="Code">try</code> <code class="Code">catch</code> mis en place, il faut bien penser à <strong>toujours englober ses appels</strong> au <em>localStorage</em> par ceci : </p>
<pre class="language-javascript">
<code>if ( localStorage ) { 
    // Notre code utilisant setItem ou getItem 
}</code>
</pre>
    <p>Cette solution devrait couvrir tous les cas d'erreurs liés au localStorage, et est assez simple à mettre en place en début de projet.</p>
</section>
