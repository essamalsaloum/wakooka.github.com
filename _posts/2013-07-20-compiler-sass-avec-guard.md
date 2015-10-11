---
layout: post
title: Compiler Sass avec un fichier Guard
published_date: 20 Juillet 2013
published: true
---
<section class="MainText">
<p class="Warning">Cet article commence à vieillir. Il y a des solutions plus faciles à mettre en place et mieux maintenues, je pense par exemple aux tasks runners à <a href="http://gulpjs.com/" class="Link">Gulp</a> ou <a href="http://gruntjs.com/" class="Link">Grunt</a>.</p>
<p>J’aime gagner du temps dans mon workflow, comme je le fais avec <a class="Link" href="/2013/03/23/git-flow.html">git en utilisant git-flow</a>. J’ai donc chercher un moyen d’<strong>automatiser la compilation de Sass</strong> dans mes projets, et je suis tombé sur cette vidéo de <a class="Link" href="http://net.tutsplus.com/tutorials/tools-and-tips/guard-is-your-best-friend/">Jeffrey Way, <em>Guard is your best friend</em></a>.</p>

<p>En gros, on crée un fichier (Guardfile) à la racine de notre projet, qui contient différents paramètres, comme par exemple: le dossier contenant les fichiers Sass, le dossier où les fichiers CSS sont générés, et aussi quel type de compilation ( <code class="Code">compressed</code>, <code class="Code">nested</code>, …).</p>

<p>Il devient alors très facile de compiler les fichiers <strong>en exécutant une seule commande</strong>. L’avantage est d’avoir notre configuration dans un fichier <a class="Link" href="https://github.com/guard/guard">Guard</a>. Mais ce n’est pas tout, Guard a une multitude de plugins, comme <a class="Link" href="https://github.com/guard/guard-livereload">live reload</a> et autres.</p>

<h2 id="installer-guard-et-son-plugin-sass">Installer Guard et son plugin Sass</h2>

<p>La première fois, il va falloir installer <a class="Link" href="http://rubyinstaller.org/">Ruby</a> et <a class="Link" href="http://rubyinstaller.org/">Ruby Gems</a> sur votre système, s’ils ne le sont pas déjà. Quand c’est fait,  on installe Guard :</p>
</section>
<section class="CodeContainer">
<pre class="language-bash"><code class="bash no-style">$ gem install guard
6 gems installed
</code></pre>
</section>
<section class="MainText">
<p>Et ensuite, le <a class="Link" href="https://github.com/hawx/guard-sass">plugin Sass</a> :</p>
</section>
<section class="CodeContainer">
<pre class="language-bash"><code class="bash no-style">$ gem install guard-sass
1 gem installed
</code></pre>
</section>
<section class="MainText">
<h2 id="crer-le-fichier-guard-et-automatiser-la-compilation">Créer le fichier Guard, et automatiser la compilation</h2>

<p>Maintenant que Guard, et le plugin Sass sont installés, on crée le <em>Guardfile</em> :</p>
</section>
<section class="CodeContainer">
<pre class="language-bash"><code>$ guard init
21:18:07 - INFO - Writing new Guardfile to c:/wamp/www/jeromesmadja/Guardfile
21:18:08 - INFO - sass guard added to Guardfile, feel free to edit it
</code></pre>
</section>
<section class="MainText">
<p><em>Guardfile</em> est alors créé dans le dossier actuel, et son contenu devrait ressembler à ça :</p>
</section>
<section class="CodeContainer">
<pre class="language-bash"><code># A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'sass', :input =&gt; 'sass', :output =&gt; 'css'
</code></pre>
</section>
<section class="MainText">
<p>Deux options par défaut :
- <code class="Code">:input</code> où les fichiers Sass sont localisés dans le project
- <code class="Code">:output</code> où Guard compilera les fichiers css</p>

<p>Le plugin contient une <a class="Link" href="https://github.com/guard/guard-sass#options">multitude d’autres options</a>. Par exemple pour minifier les fichiers css, il suffit d’ajouter : <code class="Code">:style =&gt; :compressed</code>.</p>

<p>Une fois que les paramètres sont corrects, il ne nous reste plus qu’une seule chose à faire, dire à Guard de regarder nos fichiers. Et pour ça il suffit de lancer :</p>
</section>
<section class="CodeContainer">
<pre class="language-bash"><code class="bash no-style">$ guard
21:19:04 - INFO - Guard uses TerminalTitle to send notifications.
21:19:04 - INFO - Guard is now watching at 'c:/wamp/www/jeromesmadja'
[1] guard(main)&gt;
</code></pre>
</section>
<section class="MainText">
<p>Oui, c’est tout !
Guard commencera alors à regarder les fichiers Sass qui sont dans le dossier que l’on a défini, et les compilera dans le dossier <code class="Code">output</code>. Aussi simple que ça.</p>

<h2 id="gagner-encore-plus-de-temps-avec-live-reload">Gagner encore plus de temps avec live reload</h2>

<p>Pour faire une présentation rapide de <em>live reload</em>, si vous ne connaissez pas, c’est une extension de navigateur qui permet à la touche f5 de votre de clavier se reposer, et de ne pas se faire taper dessus toutes les 5 secondes. A chaque fois qu’une sauvegarde dans un fichier a lieu, <em>live reload</em> rafraîchira la page automatiquement.</p>

<p>Il faut juste s’assurer que vous avez l’extension <em>live reload</em> installé dans votre navigateur préféré. Si vous ne l’avez pas encore vous <a class="Link" href="http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-">pouvez la trouver ici</a>.</p>

<p>Pour installer le plugin <em>live reload</em> pour Guard : </p>
</section>
<section class="CodeContainer">
<pre class="language-bash"><code class="bash no-style">$ gem install guard-livereload
5 gems installed
</code></pre>
</section>
<section class="MainText">
<p>Pour l’ajouter au <em>Guardfile</em> :</p>
</section>
<section class="CodeContainer">
<pre class="language-bash"><code class="bash no-style">$ guard init livereload
22:02:15 - INFO - livereload guard added to Guardfile, feel free to edit it
</code></pre>
</section>
<section class="MainText">
<p>Et le <em>Guardfile</em> devrait maintenant contenir les paramètres pour <em>live reload</em>  :</p>
</section>
<section class="CodeContainer">
<pre class="language-bash"><code># A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'sass', :input =&gt; 'css/scss', :output =&gt; 'css'

guard 'livereload' do
  watch(%r{app/views/.+\.(erb|haml|slim)$})
  watch(%r{app/helpers/.+\.rb})
  watch(%r{public/.+\.(css|js|html)})
  watch(%r{config/locales/.+\.yml})
  # Rails Assets Pipeline
  watch(%r{(app|vendor)(/assets/\w+/(.+\.(css|js|html))).*}) { |m| "/assets/#{m[3]}" }
end
</code></pre>
</section>
<section class="MainText">
<p>Je ne connais pas Ruby, mais il faut juste modifier les expressions régulières pour lui dire les extensions de fichiers à regarder. Donc quelque chose comme ceci sera plus utile dans notre cas :</p>
</section>
<section class="CodeContainer">
<pre class="language-bash"><code>guard 'livereload' do
  watch(%r{.+\.(html|css|js|)})
end
</code></pre>
</section>
<section class="MainText">
<p>A chaque fois qu’un fichier avec l’extension .html, .css, ou .js sera mis à jour, le navigateur rechargera la page. On peut donc voir les changements apparaître directement dans le navigateur quand le fichier CSS a été compilé. </p>

<p>La première installation peut prendre un peu de temps, particulièrement s’il faut que vous installiez <a class="Link" href="http://rubyinstaller.org/">Ruby</a> et <a class="Link" href="http://rubyinstaller.org/">Ruby Gems</a>, mais je pense que ça vaut vraiment le coup. Une fois que c’est installé, il est très facile de créer un nouveau <em>Guardfile</em> pour vos nouveaux projets. Par exemple si votre structure est la même pour tous vos projets, vous avez juste à copier votre <em>Guardfile</em> à la racine de votre nouveau projet, et lancer la commande <code class="Code">guard</code>, et BAM.</p>

<p>Guard peut donc se révéler un très bon outil pour gagner du temps, peut-être juste quelques minutes par jour, voire quelques heures par mois.
Si l’installation est douloureuse, <a class="Link" href="https://twitter.com/jeromesmadja">contactez moi</a>, je serais très content de vous aider.
Guard ne se limite pas à Sass et <em>live reload</em>, si vous êtes intéressé, voici la <a class="Link" href="https://github.com/guard/guard/wiki/List-of-available-Guards">liste des plugins disponibles</a>, ils n’y sont pas tous mais il y en a déjà un bon paquet, par exemple il y a en un pour LESS, ou encore pour Jekyll.</p>
</section>
